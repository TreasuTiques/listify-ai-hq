import React, { useState } from 'react';

const BuilderPage: React.FC = () => {
  // 1. STATE MANAGEMENT
  const [activePlatform, setActivePlatform] = useState('ebay'); // 'ebay' | 'poshmark' | 'mercari' | 'depop'
  const [isStorytelling, setIsStorytelling] = useState(false);
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('New with Tags');

  // Platforms Config
  const platforms = [
    { id: 'ebay', label: 'eBay', color: 'bg-blue-600' },
    { id: 'poshmark', label: 'Poshmark', color: 'bg-red-700' },
    { id: 'mercari', label: 'Mercari', color: 'bg-purple-600' },
    { id: 'depop', label: 'Depop', color: 'bg-black' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-20 px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="max-w-7xl mx-auto mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            Listing Command Center
          </h1>
          <p className="text-slate-500 mt-1">Upload photos to generate optimized listings instantly.</p>
        </div>
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          0 Photos Uploaded • Target: <span className="text-blue-600">{activePlatform.toUpperCase()}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Media Upload */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Source Media</h3>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md">AI Vision Ready</span>
            </div>
            
            {/* Dropzone */}
            <div className="border-2 border-dashed border-slate-200 rounded-2xl h-[400px] flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer group-hover:shadow-inner">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <p className="text-sm font-bold text-slate-700">Drop Photos Here</p>
              <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, HEIC</p>
            </div>
          </div>

          {/* AI Status Card */}
          <div className="bg-[#0F172A] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>
            <h3 className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-2">AI Analysis</h3>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-slate-500"></div>
              <span className="text-sm text-slate-400 italic">Waiting for media...</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Listing Details */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Platform Tabs (NEW) */}
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8">
            
            {/* 1. THE NEW PLATFORM SWITCHER */}
            <div className="mb-8">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Target Marketplace</label>
               <div className="flex flex-wrap gap-2">
                 {platforms.map((platform) => (
                   <button
                     key={platform.id}
                     onClick={() => setActivePlatform(platform.id)}
                     className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all border ${
                       activePlatform === platform.id
                         ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md transform scale-105'
                         : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                     }`}
                   >
                     {/* Platform Indicator Dot */}
                     <span className={`w-2 h-2 rounded-full ${activePlatform === platform.id ? 'bg-white' : platform.color}`}></span>
                     {platform.label}
                   </button>
                 ))}
               </div>
            </div>

            {/* Title Input */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Listing Title</label>
                <span className={`text-xs font-bold ${title.length > 70 ? 'text-red-500' : 'text-slate-400'}`}>{title.length} / 80</span>
              </div>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                placeholder="AI will generate this..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Brand</label>
                <input 
                  type="text" 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                  placeholder="Nike, Sony..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Condition</label>
                <select 
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-all appearance-none cursor-pointer"
                >
                  <option>New with Tags</option>
                  <option>New without Tags</option>
                  <option>Pre-owned (Excellent)</option>
                  <option>Pre-owned (Good)</option>
                  <option>For Parts / Not Working</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Condition Notes</label>
              <textarea 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 h-24 resize-none"
                placeholder="e.g. Small scratch on lens, box has shelf wear..."
              ></textarea>
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Specific Details (Optional)</label>
              <input 
                type="text" 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                placeholder="e.g. Includes original remote, power cord..."
              />
            </div>

            {/* Storytelling Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 mb-8">
              <div>
                <div className="text-sm font-bold text-slate-900">Enable Premium Storytelling?</div>
                <div className="text-xs text-slate-500">Uses GPT-4o for richer descriptions.</div>
              </div>
              <button 
                onClick={() => setIsStorytelling(!isStorytelling)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isStorytelling ? 'bg-blue-600' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isStorytelling ? 'left-7' : 'left-1'}`}></div>
              </button>
            </div>

            {/* Dynamic Action Button */}
            <button className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:-translate-y-1 active:scale-95 transition-all">
              Generate {platforms.find(p => p.id === activePlatform)?.label} Listing
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
