import React, { useState } from 'react';

interface InventoryPageProps {
  onNavigate: (path: string) => void;
}

const InventoryPage: React.FC<InventoryPageProps> = ({ onNavigate }) => {
  // 1. New State for the Interaction
  const [isNotified, setIsNotified] = useState(false);

  // Mock Data illustrating the FUTURE state
  const demoItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop",
      title: "Nike Air Max 90 - Size 10",
      sku: "NK-AM90-001",
      price: "$125.00",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=100&auto=format&fit=crop",
      title: "Vintage Carhartt Detroit Jacket",
      sku: "CH-VINT-99",
      price: "$245.00",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&auto=format&fit=crop",
      title: "Apple Watch Series 7 45mm",
      sku: "AP-WA7-45",
      price: "$210.00",
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-100/40 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header with "Coming Soon" Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Inventory Sync</h1>
              <span className="bg-blue-100 text-blue-700 border border-blue-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Coming Soon
              </span>
            </div>
            <p className="text-slate-500 max-w-2xl">
              We are building the ultimate command center. Soon, you will be able to sync inventory, 
              delist sold items, and manage prices across all platforms automatically.
            </p>
          </div>
          <div className="flex gap-3">
             <button className="px-4 py-2 bg-white border border-slate-200 text-slate-400 font-bold rounded-xl text-sm cursor-not-allowed">
               Filter
             </button>
             <button onClick={() => onNavigate('/builder')} className="px-6 py-2 bg-[#0F172A] text-white font-bold rounded-xl text-sm shadow-lg hover:bg-slate-800">
               + Create New Listing
             </button>
          </div>
        </div>

        {/* The "Teaser" Matrix */}
        <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden relative">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider w-[35%]">Product</th>
                  <th className="px-4 py-4 font-bold text-slate-400 uppercase tracking-wider text-center opacity-70">eBay</th>
                  <th className="px-4 py-4 font-bold text-slate-400 uppercase tracking-wider text-center opacity-70">Shopify</th>
                  <th className="px-4 py-4 font-bold text-slate-400 uppercase tracking-wider text-center opacity-70">Etsy</th>
                  <th className="px-4 py-4 font-bold text-slate-400 uppercase tracking-wider text-center opacity-70">Poshmark</th>
                  <th className="px-4 py-4 font-bold text-slate-400 uppercase tracking-wider text-center opacity-70">Mercari</th>
                  <th className="px-6 py-4 font-bold text-slate-400 uppercase tracking-wider text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {demoItems.map((item) => (
                  <tr key={item.id} className="group">
                    {/* Product Info */}
                    <td className="px-6 py-4 opacity-60 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm" />
                        <div>
                          <div className="font-bold text-[#0F172A]">{item.title}</div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5">SKU: {item.sku}</div>
                        </div>
                      </div>
                    </td>

                    {/* All Columns "Locked" */}
                    {['eBay', 'Shopify', 'Etsy', 'Posh', 'Mercari'].map((p) => (
                      <td key={p} className="px-4 py-4 text-center">
                         <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400 uppercase">
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                           Soon
                         </span>
                      </td>
                    ))}

                    <td className="px-6 py-4 text-right font-bold text-slate-400">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Call to Action Overlay with INTERACTIVITY */}
          <div className="bg-slate-50 border-t border-slate-200 p-8 text-center transition-all duration-500">
            <h3 className="text-lg font-bold text-[#0F172A] mb-2">Want early access to Sync?</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-lg mx-auto">
              We are rolling out automatic cross-listing and inventory management in Q1. 
              Active subscribers get priority access.
            </p>
            
            <button 
              onClick={() => setIsNotified(true)}
              disabled={isNotified}
              className={`px-8 py-3 rounded-full font-bold text-sm shadow-sm transition-all duration-300 transform active:scale-95 ${
                isNotified 
                  ? 'bg-green-100 border border-green-200 text-green-700 cursor-default scale-105'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-blue-400 hover:text-blue-600'
              }`}
            >
              {isNotified ? (
                <span className="flex items-center gap-2">
                  You're on the list! ✅
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Notify Me When Live 🔔
                </span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InventoryPage;
