import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ListingDetailModal from '../components/ListingDetailModal';

const InventoryPage: React.FC<any> = ({ onNavigate }) => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 🔍 MODAL STATE
  const [selectedListing, setSelectedListing] = useState<any>(null);

  // 1. Fetch Data
  const fetchData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        onNavigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);

    } catch (error) {
      console.error('Error loading inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [onNavigate]);

  // 🗑️ DELETE FUNCTION
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const { error } = await supabase
        .from('listings')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Close modal and refresh list
      setSelectedListing(null);
      fetchData(); 

    } catch (error: any) {
      alert("Error deleting: " + error.message);
    }
  };

  if (loading) {
    return (
      // FIX: Loading background
      <div className="min-h-screen flex items-center justify-center !bg-slate-50 dark:!bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    // FIX: Main Background with '!' to force override
    <div className="min-h-screen !bg-slate-50 dark:!bg-slate-900 pb-20 pt-24 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* ✅ RENDER THE MODAL IF OPEN */}
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
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your drafts and active listings.</p>
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
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {listings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-700/50 transition-colors group">
                      
                      {/* IMAGE CELL */}
                      <td className="px-6 py-4 w-24">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 overflow-hidden relative">
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt="Item" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-500 text-xs font-bold">No IMG</div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 dark:text-white line-clamp-2 max-w-md">{item.title}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-1 font-medium">{new Date(item.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-300">{item.brand || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                          item.platform === 'ebay' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800' :
                          item.platform === 'poshmark' ? 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-100 dark:border-red-800' :
                          'bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600'
                        }`}>
                          {item.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-100 dark:border-yellow-800">
                           Draft
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* ✅ OPEN MODAL ON CLICK */}
                        <button 
                          onClick={() => setSelectedListing(item)}
                          className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-sm transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default InventoryPage;
