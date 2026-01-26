import React, { useState } from 'react';

interface ListingDetailModalProps {
  listing: any;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const ListingDetailModal: React.FC<ListingDetailModalProps> = ({ listing, onClose, onDelete }) => {
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  if (!listing) return null;

  // 📋 Helper to Copy Text
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(type);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* LEFT: IMAGE */}
        <div className="w-full md:w-2/5 bg-slate-100 relative min-h-[300px]">
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

        {/* RIGHT: DETAILS */}
        <div className="w-full md:w-3/5 p-8 overflow-y-auto bg-white">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${
                listing.platform === 'ebay' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'
              }`}>
                {listing.platform} Listing
              </span>
              <h2 className="text-2xl font-bold text-slate-900 leading-tight">{listing.title}</h2>
            </div>
            <button onClick={onClose} className="hidden md:block text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          {/* COPY TOOLBAR */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => handleCopy(listing.title, 'title')}
              className={`p-4 rounded-xl border-2 font-bold text-sm flex flex-col items-center justify-center transition-all ${
                copyStatus === 'title' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 hover:border-blue-500 hover:bg-blue-50 text-slate-600'
              }`}
            >
              <span className="mb-1 text-xl">📝</span>
              {copyStatus === 'title' ? 'Copied!' : 'Copy Title'}
            </button>

            <button 
              onClick={() => handleCopy(listing.description, 'desc')}
              className={`p-4 rounded-xl border-2 font-bold text-sm flex flex-col items-center justify-center transition-all ${
                copyStatus === 'desc' ? 'border-green-500 bg-green-50 text-green-700' : 'border-slate-100 hover:border-blue-500 hover:bg-blue-50 text-slate-600'
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
                <p className="font-bold text-slate-900">{listing.brand || '—'}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Condition</label>
                <p className="font-bold text-slate-900">{listing.condition}</p>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Estimated Price</label>
                <p className="font-bold text-emerald-600 text-lg">{listing.price || '—'}</p>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Generated Description</label>
              <div className="mt-2 p-4 bg-slate-50 rounded-xl text-sm text-slate-600 leading-relaxed h-48 overflow-y-auto border border-slate-100">
                {listing.description}
              </div>
            </div>
            
            {/* TAGS */}
            {listing.tags && (
               <div className="flex flex-wrap gap-2 mt-4">
                 {listing.tags.map((tag: string, i: number) => (
                   <span key={i} className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded-md">#{tag}</span>
                 ))}
               </div>
            )}
          </div>

          {/* FOOTER ACTIONS */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            <button 
              onClick={() => onDelete(listing.id)}
              className="text-red-500 font-bold text-sm hover:bg-red-50 px-4 py-2 rounded-lg transition-colors"
            >
              Delete Listing
            </button>
            <button 
              onClick={onClose}
              className="bg-[#0F172A] text-white font-bold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ListingDetailModal;
