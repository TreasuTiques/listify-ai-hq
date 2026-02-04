import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

interface ListingDetailModalProps {
  listing: any;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose, onDelete }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  
  // 💰 SALES MODE STATE
  const [isSoldMode, setIsSoldMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [soldPrice, setSoldPrice] = useState('');
  const [fees, setFees] = useState('');
  const [shipping, setShipping] = useState('');
  const [netProfit, setNetProfit] = useState<number | null>(null);

  if (!listing) return null;

  // 📋 Helper to Copy Text
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  // 🧮 Auto-Calculate Profit in Real-Time
  useEffect(() => {
    if (soldPrice) {
      const s = parseFloat(soldPrice) || 0;
      const f = parseFloat(fees) || 0;
      const sh = parseFloat(shipping) || 0;
      // We assume the user saved a 'cost_price' when creating the listing. 
      // If not, it defaults to 0.
      const c = parseFloat(listing.cost_price) || 0; 
      setNetProfit(s - f - sh - c);
    }
  }, [soldPrice, fees, shipping, listing.cost_price]);

  // 💾 SAVE TO SUPABASE
  const handleMarkAsSold = async () => {
    if (!soldPrice) return alert("Please enter the sold price.");
    setLoading(true);

    try {
      const { error } = await supabase
        .from('listings')
        .update({
          status: 'sold',
          sold_price: parseFloat(soldPrice),
          fees: parseFloat(fees) || 0,
          shipping_cost: parseFloat(shipping) || 0,
          sold_date: new Date().toISOString()
        })
        .eq('id', listing.id);

      if (error) throw error;
      
      // Close and Refresh
      onClose(); 
      window.location.reload(); 

    } catch (err: any) {
      alert("Error saving sale: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* LEFT: IMAGE */}
        <div className="w-full md:w-2/5 bg-slate-100 dark:bg-slate-700 relative min-h-[300px]">
          {listing.image_url ? (
            <img 
              src={listing.image_url} 
              alt={listing.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
             <div className="flex items-center justify-center h-full text-slate-400 font-bold">No Image</div>
          )}
          
          {/* Close Button (Mobile) */}
          <button onClick={onClose} className="md:hidden absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow-lg">
            ✕
          </button>
        </div>

        {/* RIGHT: DETAILS or SALES FORM */}
        <div className="w-full md:w-3/5 p-8 overflow-y-auto bg-white dark:bg-slate-800">
          
          {/* 1️⃣ VIEW MODE (Default) */}
          {!isSoldMode ? (
            <>
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${
                    listing.platform === 'ebay' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {listing.platform} Listing
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">{listing.title}</h2>
                </div>
                <button onClick={onClose} className="hidden md:block text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>

              {/* COPY TOOLBAR */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button 
                  onClick={() => handleCopy(listing.title, 'title')}
                  className={`p-4 rounded-xl border-2 font-bold text-sm flex flex-col items-center justify-center transition-all ${
                    copyStatus === 'title' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <span className="mb-1 text-xl">📝</span>
                  {copyStatus === 'title' ? 'Copied!' : 'Copy Title'}
                </button>

                <button 
                  onClick={() => handleCopy(listing.description, 'desc')}
                  className={`p-4 rounded-xl border-2 font-bold text-sm flex flex-col items-center justify-center transition-all ${
                    copyStatus === 'desc' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 text-slate-600 dark:text-slate-300'
                  }`}
                >
                   <span className="mb-1 text-xl">📄</span>
                  {copyStatus === 'desc' ? 'Copied!' : 'Copy Description'}
                </button>
              </div>

              {/* METADATA */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Brand</label>
                    <p className="font-bold text-slate-900 dark:text-white">{listing.brand || '—'}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Condition</label>
                    <p className="font-bold text-slate-900 dark:text-white">{listing.condition}</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Price</label>
                    <p className="font-bold text-emerald-600 text-lg">{listing.estimated_price || '—'}</p>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Description</label>
                  <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl text-sm text-slate-600 dark:text-slate-300 leading-relaxed h-32 overflow-y-auto border border-slate-100 dark:border-slate-700">
                    {listing.description}
                  </div>
                </div>
              </div>

              {/* FOOTER ACTIONS */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                <button onClick={() => onDelete(listing.id)} className="text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors">Delete</button>
                
                {/* 🚀 THE NEW BUTTON: MARK AS SOLD */}
                {listing.status !== 'sold' ? (
                  <button 
                    onClick={() => setIsSoldMode(true)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all flex items-center gap-2"
                  >
                    <span>💰</span> Mark as Sold
                  </button>
                ) : (
                  <span className="text-emerald-500 font-bold bg-emerald-100 px-4 py-2 rounded-lg">Item Sold!</span>
                )}
              </div>
            </>
          ) : (
            // 2️⃣ SOLD MODE (The Form)
            <div className="h-full flex flex-col animate-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Record Sale</h3>
                <button onClick={() => setIsSoldMode(false)} className="text-sm font-bold text-slate-400 hover:text-slate-600 dark:hover:text-white">Cancel</button>
              </div>

              <div className="flex-grow space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Final Sold Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">$</span>
                    <input type="number" value={soldPrice} onChange={e => setSoldPrice(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-4 font-bold text-xl text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-all" placeholder="0.00" autoFocus />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Platform Fees</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input type="number" value={fees} onChange={e => setFees(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-all" placeholder="0.00" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Shipping Cost</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                      <input type="number" value={shipping} onChange={e => setShipping(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl pl-8 pr-4 py-3 font-bold text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-all" placeholder="0.00" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-6 text-center mt-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Net Profit</div>
                  <div className={`text-4xl font-black ${netProfit && netProfit > 0 ? 'text-emerald-400' : 'text-white'}`}>
                    ${netProfit ? netProfit.toFixed(2) : '0.00'}
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    (Sold - Fees - Shipping - Original Cost)
                  </div>
                </div>
              </div>

              <button 
                onClick={handleMarkAsSold}
                disabled={loading}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-emerald-500/20 transition-all mt-6"
              >
                {loading ? 'Processing...' : 'Confirm Sale 🚀'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ListingDetailModal;
