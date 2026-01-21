import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

interface InventoryPageProps {
  onNavigate: (path: string) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ onNavigate }) => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Real Data when page loads
  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get their listings from Supabase
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A]">My Inventory</h1>
            <p className="text-slate-500 mt-1">Manage your drafts and active listings.</p>
          </div>
          <button 
            onClick={() => onNavigate('/builder')}
            className="bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <span>+</span> New Listing
          </button>
        </div>

        {/* 2. Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-slate-400">Loading your items...</p>
          </div>
        ) : listings.length === 0 ? (
          /* 3. Empty State (If you had 0 items) */
          <div className="text-center py-20 bg-white rounded-[24px] border border-slate-200">
            <div className="text-4xl mb-4">📦</div>
            <h3 className="text-lg font-bold text-[#0F172A]">Your inventory is empty</h3>
            <p className="text-slate-500 mb-6">Create your first listing to see it here.</p>
            <button 
              onClick={() => onNavigate('/builder')}
              className="text-blue-600 font-bold hover:underline"
            >
              Start Listing &rarr;
            </button>
          </div>
        ) : (
          /* 4. REAL DATA TABLE */
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Brand</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Platform</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-6 py-4 font-medium text-[#0F172A]">{item.title}</td>
                      <td className="px-6 py-4 text-slate-600 font-medium">{item.brand || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${
                          item.platform === 'ebay' ? 'bg-blue-100 text-blue-700' :
                          item.platform === 'poshmark' ? 'bg-red-100 text-red-700' :
                          item.platform === 'shopify' ? 'bg-emerald-100 text-emerald-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {item.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase border border-amber-200">
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryPage;
