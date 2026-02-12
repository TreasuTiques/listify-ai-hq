type TitleParts = {
  brand?: string | null;
  model?: string | null;
  primary?: string | null;    // what it IS (Fingerboard, Action Figure, Camera, etc.)
  secondary?: string | null;  // Toy, Set, Deck, Cartridge, Console, etc.
  year?: string | null;       // "1993" or "1990s"
  attributes?: string[] | null; // ["New Sealed", "With Tags", "Tested Working"]
  size?: string | null;       // "Size L", "10in", "32GB"
  count?: string | null;      // "Lot of 3", "Set of 5"
};

type BuildTitleOptions = {
  maxLen?: number; // default 80
};

/** Title-case but keeps common acronyms uppercase */
function toTitleCaseSmart(input: string): string {
  const keepUpper = new Set(["USA", "NES", "SNES", "N64", "PS1", "PS2", "PS3", "PS4", "PS5", "DVD", "VHS", "CD", "PC", "IBM"]);
  return input
    .trim()
    .split(/\s+/)
    .map((w) => {
      const cleaned = w.replace(/[^\w']/g, "");
      if (keepUpper.has(cleaned.toUpperCase())) return cleaned.toUpperCase();
      // preserve words like "TOMI-E"
      if (cleaned.includes("-") && cleaned === cleaned.toUpperCase()) return cleaned;
      return cleaned.length ? cleaned[0].toUpperCase() + cleaned.slice(1).toLowerCase() : "";
    })
    .filter(Boolean)
    .join(" ");
}

/** Remove duplicate words while preserving order (case-insensitive) */
function dedupeWords(phrase: string): string {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const word of phrase.split(/\s+/)) {
    const key = word.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(word);
    }
  }
  return out.join(" ");
}

/** Sanitize a chunk: remove emoji, excessive punctuation, trim */
function sanitizeChunk(chunk: string): string {
  return chunk
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, "") // emoji range
    .replace(/[•|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Remove low-value marketing fluff words */
function removeFluff(chunk: string): string {
  const fluff = [
    "Amazing", "Awesome", "Great", "Nice", "Rare Find", "Must Have", "Hot", "Cool",
    "Vintage" // only remove if it’s used as fluff; keep if it’s actually needed later manually
  ];
  let out = chunk;
  for (const f of fluff) {
    out = out.replace(new RegExp(`\\b${f}\\b`, "gi"), "").replace(/\s+/g, " ").trim();
  }
  return out;
}

/** Build the final eBay title deterministically */
export function buildEbayTitle(parts: TitleParts, opts: BuildTitleOptions = {}): string {
  const maxLen = opts.maxLen ?? 80;

  // Priority buckets (highest → lowest)
  const bucket1: string[] = [];
  const bucket2: string[] = [];
  const bucket3: string[] = [];
  const bucket4: string[] = [];

  // 1) Brand / Model / Primary / Secondary
  if (parts.brand) bucket1.push(parts.brand);
  if (parts.model) bucket1.push(parts.model);
  if (parts.primary) bucket1.push(parts.primary);
  if (parts.secondary) bucket1.push(parts.secondary);

  // 2) Year/Era
  if (parts.year) bucket2.push(parts.year);

  // 3) Attributes (we’ll keep only the best ones if we need to trim)
  if (parts.attributes?.length) bucket3.push(...parts.attributes);

  // 4) Size + Count (lowest priority)
  if (parts.size) bucket4.push(parts.size);
  if (parts.count) bucket4.push(parts.count);

  // Assemble in order
  const assemble = (b1: string[], b2: string[], b3: string[], b4: string[]) => {
    const all = [...b1, ...b2, ...b3, ...b4]
      .map(sanitizeChunk)
      .map(removeFluff)
      .filter(Boolean)
      .map(toTitleCaseSmart);

    return dedupeWords(all.join(" ").replace(/\s+/g, " ").trim());
  };

  let title = assemble(bucket1, bucket2, bucket3, bucket4);

  // Trim logic: drop lowest priority pieces until within maxLen
  // First: drop size/count, then attributes, then year, then secondary, then model (brand + primary are sacred)
  const tryTrim = () => {
    // drop bucket4 first
    while (title.length > maxLen && bucket4.length) {
      bucket4.pop();
      title = assemble(bucket1, bucket2, bucket3, bucket4);
    }
    // drop attributes next
    while (title.length > maxLen && bucket3.length) {
      bucket3.pop();
      title = assemble(bucket1, bucket2, bucket3, bucket4);
    }
    // drop year
    while (title.length > maxLen && bucket2.length) {
      bucket2.pop();
      title = assemble(bucket1, bucket2, bucket3, bucket4);
    }
    // drop secondary
    if (title.length > maxLen && parts.secondary) {
      const idx = bucket1.findIndex(x => x.toLowerCase() === parts.secondary!.toLowerCase());
      if (idx >= 0) bucket1.splice(idx, 1);
      title = assemble(bucket1, bucket2, bucket3, bucket4);
    }
    // drop model (last resort)
    if (title.length > maxLen && parts.model) {
      const idx = bucket1.findIndex(x => x.toLowerCase() === parts.model!.toLowerCase());
      if (idx >= 0) bucket1.splice(idx, 1);
      title = assemble(bucket1, bucket2, bucket3, bucket4);
    }

    // hard cut if still too long (should be rare)
    if (title.length > maxLen) title = title.slice(0, maxLen).trim();
  };

  tryTrim();

  return title;
}
