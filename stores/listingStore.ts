// listingStore.tsx
import { create } from "zustand";
import { supabase } from "../supabaseClient.ts";

// ---- Types ----
export type ListingRow = Record<string, any> & {
  id: string;
  user_id: string;
  created_at?: string;

  // Either schema (keep both)
  image_path?: string | null;     // single image
  image_paths?: string[] | null;  // multiple images
};

export type ListingView = ListingRow & {
  // Derived only (never store in DB)
  image_url?: string | null;
  image_urls?: string[];
  _signedAt?: number;
};

type ListingStoreState = {
  // Data
  listings: ListingView[];
  loading: boolean;
  error: string | null;

  // Paging
  page: number;
  pageSize: number;
  hasNextPage: boolean;

  // Actions
  fetchListingsPage: (page?: number) => Promise<void>;
  nextPage: () => Promise<void>;
  prevPage: () => Promise<void>;

  refreshSignedUrls: (expiresInSeconds?: number) => Promise<void>;

  getById: (id: string) => ListingView | undefined;
  upsertListing: (listing: ListingView) => void;
  removeListing: (id: string) => void;
  clear: () => void;
};

// ---- Helpers ----
const BUCKET = "listing-images";
const DEFAULT_SIGN_EXPIRY = 60 * 60; // 1 hour
const DEFAULT_PAGE_SIZE = 10;

async function signPath(path: string, expiresInSeconds: number) {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresInSeconds);

  if (error) {
    console.error("createSignedUrl error:", error);
    return null;
  }
  return data.signedUrl;
}

async function hydrateListingImages(listing: ListingRow, expiresInSeconds: number): Promise<ListingView> {
  const paths = Array.isArray(listing.image_url) ? listing.image_url.filter(Boolean) : [];

  // Multi-image
  if (paths.length > 0) {
    const urls = await Promise.all(paths.map((p) => signPath(p, expiresInSeconds)));
    return {
      ...(listing as ListingView),
      image_urls: urls.filter(Boolean) as string[],
      _signedAt: Date.now(),
    };
  }

  // Single-image
  if (listing.image_url) {
    const url = await signPath(listing.image_url, expiresInSeconds);
    return { ...(listing as ListingView), image_url: url, _signedAt: Date.now() };
  }

  // No images
  return { ...(listing as ListingView), image_url: null, image_urls: [], _signedAt: Date.now() };
}

// ---- Store ----
export const useListingStore = create<ListingStoreState>((set, get) => ({
  listings: [],
  loading: false,
  error: null,

  page: 1,
  pageSize: DEFAULT_PAGE_SIZE,
  hasNextPage: false,

  fetchListingsPage: async (pageArg) => {
    const page = pageArg ?? get().page;
    const pageSize = get().pageSize;

    set({ loading: true, error: null });

    try {
      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) throw userErr;

      const user = userData?.user;
      if (!user) {
        set({ listings: [], loading: false, error: null, page: 1, hasNextPage: false });
        return;
      }

      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error } = await supabase
        .from("listings")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) throw error;

      const rows = (data ?? []) as ListingRow[];

      const hydrated = await Promise.all(
        rows.map((l) => hydrateListingImages(l, DEFAULT_SIGN_EXPIRY))
      );

      // Determine if there is a next page (peek 1 row after the current page)
      let hasNextPage = false;
      if (rows.length === pageSize) {
        const { data: peek, error: peekErr } = await supabase
          .from("listings")
          .select("id")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .range(to + 1, to + 1);

        if (!peekErr && (peek?.length ?? 0) > 0) hasNextPage = true;
      }

      set({ listings: hydrated, loading: false, page, hasNextPage });
    } catch (e: any) {
      console.error("fetchListingsPage error:", e);
      set({ loading: false, error: e?.message ?? "Failed to load listings" });
    }
  },

  nextPage: async () => {
    const { page, hasNextPage } = get();
    if (!hasNextPage) return;
    await get().fetchListingsPage(page + 1);
  },

  prevPage: async () => {
    const { page } = get();
    if (page <= 1) return;
    await get().fetchListingsPage(page - 1);
  },

  refreshSignedUrls: async (expiresInSeconds = DEFAULT_SIGN_EXPIRY) => {
    try {
      const current = get().listings;
      const refreshed = await Promise.all(
        current.map((l) => hydrateListingImages(l, expiresInSeconds))
      );
      set({ listings: refreshed });
    } catch (e) {
      console.error("refreshSignedUrls error:", e);
    }
  },

  getById: (id: string) => get().listings.find((l) => l.id === id),

  upsertListing: (listing: ListingView) => {
    const existing = get().listings;
    const idx = existing.findIndex((l) => l.id === listing.id);

    if (idx === -1) {
      set({ listings: [listing, ...existing] });
      return;
    }

    const next = existing.slice();
    next[idx] = { ...existing[idx], ...listing };
    set({ listings: next });
  },

  removeListing: (id: string) => {
    set({ listings: get().listings.filter((l) => l.id !== id) });
  },

  clear: () =>
    set({
      listings: [],
      loading: false,
      error: null,
      page: 1,
      hasNextPage: false,
    }),
}));