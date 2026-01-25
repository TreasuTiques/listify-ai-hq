import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const InventoryPage: React.FC<any> = ({ onNavigate }) => {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // 1. Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          onNavigate('/login');
          return;
        }
        setUser(user);

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

    fetchData();
  }, [onNavigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">My Inventory</h1>
            <p className="text-slate-500 mt-1">Manage your drafts and active listings.</p>
          </div>
          <button 
            onClick={() => onNavigate('/builder')}
            className="bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
          >
            <span>+</span> New Listing
          </button>
        </div>

        {/* INVENTORY TABLE */}
        <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden">
          {listings.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📦</div>
              <h3 className="text-lg font-bold text-[#0F172A]">Inventory Empty</h3>
              <p className="text-slate-500 mb-6">You haven't created any listings yet.</p>
              <button onClick={() => onNavigate('/builder')} className="text-blue-600 font-bold hover:underline">Create your first listing &rarr;</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <th className="px-6 py-4">Image</th> {/* 📸 NEW COLUMN */}
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Brand</th>
                    <th className="px-6 py-4">Platform</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {listings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors group">
                      
                      {/* 📸 IMAGE CELL */}
                      <td className="px-6 py-4 w-24">
                        <div className="w-16 h-16 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden relative">
                          {item.image_url ? (
                            <img 
                              src={item.image_url} 
                              alt="Item" 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300 text-xs font-bold">No IMG</div>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="font-bold text-[#0F172A] line-clamp-2 max-w-md">{item.title}</div>
                        <div className="text-xs text-slate-400 mt-1 font-medium">{new Date(item.created_at).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">{item.brand || '—'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                          item.platform === 'ebay' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                          item.platform === 'poshmark' ? 'bg-red-50 text-red-700 border-red-100' :
                          'bg-slate-50 text-slate-600 border-slate-200'
                        }`}>
                          {item.platform}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide bg-yellow-50 text-yellow-700 border border-yellow-100">
                           Draft
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 font-bold text-sm transition-colors">View</button>
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
