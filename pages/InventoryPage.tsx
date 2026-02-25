import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient.ts';
import ListingDetailModal from '../components/ListingDetailModal.tsx';
import { useListingStore } from '../stores/listingStore.ts'; // <-- adjust path if needed

const InventoryPage: React.FC<any> = ({ onNavigate }) => {
  const {
    listings,
    loading,
    error,
    page,
    hasNextPage,
    fetchListingsPage,
    nextPage,
    prevPage,
    upsertListing,
    removeListing,
  } = useListingStore();

  // 🔍 MODAL STATE
  const [selectedListing, setSelectedListing] = useState<any>(null);

  // ⚡ QUICK-FLIP STATE (Track which row is being edited)
  const [quickSoldId, setQuickSoldId] = useState<string | null>(null);
  const [quickData, setQuickData] = useState({ soldPrice: '', fees: '', shipping: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        onNavigate('/login');
        return;
      }
      await fetchListingsPage(1);
    })();
  }, [onNavigate, fetchListingsPage]);

  // ⚡ ACTIVATE QUICK SOLD MODE
  const startQuickSold = (item: any) => {
    setQuickSoldId(item.id);
    setQuickData({ soldPrice: '', fees: '', shipping: '' });
  };

  // 💾 SAVE QUICK SOLD
  const saveQuickSold = async (id: string) => {
    if (!quickData.soldPrice) return alert("Enter sold price!");
    setSaving(true);

    try {
      const sold_price = parseFloat(quickData.soldPrice);
      const fees = parseFloat(quickData.fees) || 0;
      const shipping_cost = parseFloat(quickData.shipping) || 0;
      const sold_date = new Date().toISOString();

      const { error } = await supabase
        .from('listings')
        .update({
          status: 'sold',
          sold_price,
          fees,
          shipping_cost,
          sold_date
        })
        .eq('id', id);

      if (error) throw error;

      // ✅ Update store listing (same effect as your local setListings map)
      const existing = listings.find(l => l.id === id);
      upsertListing({
        ...(existing as any),
        status: 'sold',
        sold_price,
        fees,
        shipping_cost,
        sold_date,
      });

      setQuickSoldId(null);

    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  // 🗑️ DELETE FUNCTION
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    try {
      const { error } = await supabase.from('listings').delete().eq('id', id);
      if (error) throw error;

      setSelectedListing(null);

      // ✅ Remove locally + refresh current page so paging stays correct
      removeListing(id);
      await fetchListingsPage(page);

    } catch (error: any) {
      alert("Error deleting: " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center !bg-slate-50 dark:!bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // No UI changes requested, but logging error can help without changing layout
  if (error) console.error("InventoryPage store error:", error);

  return (
    <div className="min-h-screen !bg-slate-50 dark:!bg-slate-900 pb-20 pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">

      {/* RENDER MODAL (Only when View is clicked) */}
      {selectedListing && (
        <ListingDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
          onDelete={handleDelete}
        />
      )}

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">My Inventory</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage, track, and flip your inventory faster.</p>
          </div>
          <button
            onClick={() => onNavigate('/builder')}
            className="bg-[#0F172A] dark:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 dark:hover:bg-blue-500 transition-all flex items-center gap-2"
          >
            <span>+</span> New Listing
          </button>
        </div>

        {/* INVENTORY TABLE */}
        <div className="!bg-white dark:!bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
          {listings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📦</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inventory Empty</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">You haven't created any listings yet.</p>
              <button onClick={() => onNavigate('/builder')} className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Create your first listing &rarr;</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold">
                    <th className="px-6 py-4">Image</th>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4 w-[400px]">Status / Quick Action</th>
                    <th className="px-6 py-4 text-right">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {listings.map((item) => (
                    <tr key={item.id} className={`transition-colors group ${quickSoldId === item.id ? 'bg-blue-50/50 dark:bg-blue-900/10' : 'hover:bg-slate-50/80 dark:hover:bg-slate-700/50'}`}>

                      {/* IMAGE */}
                      <td className="px-6 py-4 w-24">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden relative">
                          {item.image_url ? <img src={item.image_url} alt="Item" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs font-bold">No IMG</div>}
                        </div>
                      </td>

                      {/* TITLE */}
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-2 max-w-md">{item.title}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">{new Date(item.created_at).toLocaleDateString()}</div>
                      </td>

                      {/* PLATFORM */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                          item.platform === 'ebay' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800' :
                          item.platform === 'poshmark' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800' :
                          'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                        }`}>
                          {item.platform}
                        </span>
                      </td>

                      {/* ⚡ THE QUICK-FLIP ZONE */}
                      <td className="px-6 py-4">
                        {item.status === 'sold' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800">
                            Sold ${item.sold_price}
                          </span>
                        ) : quickSoldId === item.id ? (
                          <div className="flex items-center gap-2 animate-in fade-in zoom-in-95 duration-200">
                            <div className="flex flex-col gap-1 w-24">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Price</span>
                              <input
                                autoFocus
                                type="number"
                                placeholder="0.00"
                                className="w-full px-2 py-1.5 rounded-lg border border-blue-200 dark:border-blue-700 bg-white dark:bg-slate-900 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                value={quickData.soldPrice}
                                onChange={e => setQuickData({ ...quickData, soldPrice: e.target.value })}
                                onKeyDown={e => e.key === 'Enter' && saveQuickSold(item.id)}
                              />
                            </div>
                            <div className="flex flex-col gap-1 w-20">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Fees</span>
                              <input
                                type="number"
                                placeholder="0.00"
                                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                value={quickData.fees}
                                onChange={e => setQuickData({ ...quickData, fees: e.target.value })}
                                onKeyDown={e => e.key === 'Enter' && saveQuickSold(item.id)}
                              />
                            </div>
                            <div className="flex flex-col gap-1 w-20">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Ship</span>
                              <input
                                type="number"
                                placeholder="0.00"
                                className="w-full px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                                value={quickData.shipping}
                                onChange={e => setQuickData({ ...quickData, shipping: e.target.value })}
                                onKeyDown={e => e.key === 'Enter' && saveQuickSold(item.id)}
                              />
                            </div>
                            <div className="flex flex-col gap-1 h-full justify-end pb-0.5">
                              <button onClick={() => saveQuickSold(item.id)} disabled={saving} className="bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-lg shadow-md transition-colors mb-1" title="Save Sale">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                              </button>
                              <button onClick={() => setQuickSoldId(null)} className="text-slate-400 hover:text-red-500 p-1" title="Cancel">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-800">
                              Active
                            </span>
                            <button
                              onClick={(e) => { e.stopPropagation(); startQuickSold(item); }}
                              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 px-3 py-1.5 rounded-lg transition-colors border border-blue-100 dark:border-blue-800/50 flex items-center gap-1"
                            >
                              <span>💰</span> Mark Sold
                            </button>
                          </div>
                        )}
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => setSelectedListing(item)}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold text-sm transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ✅ ONLY UI ADDITION: Back / Next arrows */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={prevPage}
                  disabled={page <= 1 || loading}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  ← Back
                </button>

                <div className="text-xs font-bold text-slate-400 dark:text-slate-500">
                  Page {page}
                </div>

                <button
                  onClick={nextPage}
                  disabled={!hasNextPage || loading}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white font-bold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  Next →
                </button>
              </div>
              {/* ✅ end paging */}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InventoryPage;