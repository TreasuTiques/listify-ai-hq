import React, { useState, useRef } from 'react';
import { ListingFormValues, ListingStyle, GeneratedListing } from '../types';
import { generateStandardListing, generatePremiumListing } from '../services/mockGenerator';

// Platform types for the switcher
type Platform = 'ebay' | 'poshmark' | 'mercari' | 'depop' | 'shopify' | 'etsy';

const BuilderPage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [output, setOutput] = useState<GeneratedListing | null>(null);
  
  // NEW: Platform State
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('ebay');

  const [form, setForm] = useState<ListingFormValues>({
    title: '',
    brand: '',
    condition: 'Very Good',
    conditionNotes: '',
    specialFeatures: '',
    targetBuyer: 'Collector',
    price: '',
    category: '',
    listingStyle: ListingStyle.STANDARD
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setImages(prev => [...prev, ...newFiles]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setImages(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate AI Processing
    setTimeout(() => {
      const result = form.listingStyle === ListingStyle.STANDARD 
        ? generateStandardListing(form) 
        : generatePremiumListing(form);
      
      setOutput(result);
      setIsGenerating(false);
      
      // Scroll to bottom to see result
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      
      {/* HEADER BAR */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Listing Command Center
          </h1>
          <div className="text-sm text-slate-500 font-medium">
            {images.length} Photos Uploaded • Target: <span className="text-[#2563EB] capitalize">{selectedPlatform}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: MEDIA (Sticky) */}
          <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-6">
            
            {/* Photo Uploader Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <h2 className="font-bold text-[#0F172A] text-sm uppercase tracking-wide">Source Media</h2>
                <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-2 py-1 rounded">AI Vision Ready</span>
              </div>
              
              <div className="p-6">
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`aspect-[4/3] border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative group overflow-hidden ${
                    isDragging 
                      ? 'border-[#2563EB] bg-blue-50/50' 
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-[#2563EB]'
                  }`}
                >
                  <input 
                    type="file" 
                    multiple 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                  
                  {images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2 w-full h-full p-2 overflow-y-auto">
                      {images.map((img, i) => (
                        <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                          <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                             <span className="text-xs text-white font-bold">{img.name.slice(0, 3)}..</span>
                          </div>
                        </div>
                      ))}
                      {/* Add Button */}
                      <div className="border border-dashed border-slate-300 rounded-lg flex items-center justify-center hover:bg-slate-50">
                         <span className="text-2xl text-slate-400">+</span>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${isDragging ? 'bg-[#2563EB] text-white' : 'bg-white text-slate-400 shadow-sm'}`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      </div>
                      <p className="text-sm font-bold text-slate-600">Drop Photos Here</p>
                      <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, HEIC</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* AI Analysis Status (Mock) */}
            <div className="bg-[#1E293B] rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
               <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">AI Analysis</h3>
               <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${images.length > 0 ? 'bg-green-400 animate-pulse' : 'bg-slate-600'}`}></div>
                  <span className="text-sm font-medium">{images.length > 0 ? 'Scanning visual features...' : 'Waiting for media...'}</span>
               </div>
            </div>
          </div>


          {/* RIGHT COLUMN: CONTROLS (Form) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* PLATFORM SELECTOR TABS */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap gap-1">
               {['ebay', 'poshmark', 'mercari', 'depop', 'shopify', 'etsy'].map((p) => (
                 <button
                   key={p}
                   type="button"
                   onClick={() => setSelectedPlatform(p as Platform)}
                   className={`flex-1 min-w-[80px] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                     selectedPlatform === p 
                       ? 'bg-[#0F172A] text-white shadow-md transform scale-105' 
                       : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                   }`}
                 >
                   {p}
                 </button>
               ))}
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-200/60 relative">
               {/* Watermark for active platform */}
               <div className="absolute top-8 right-8 text-6xl font-black text-slate-100 uppercase pointer-events-none select-none opacity-50">
                  {selectedPlatform}
               </div>

               <div className="space-y-6 relative z-10">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Listing Title</label>
                    <div className="relative">
                      <input 
                        type="text"
                        placeholder="AI will generate this..."
                        className="w-full pl-5 pr-20 py-4 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] font-medium text-[#0F172A]"
                        value={form.title}
                        onChange={e => setForm({...form, title: e.target.value})}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                        {form.title.length} / 80
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Brand</label>
                      <input 
                        type="text"
                        placeholder="Nike, Sony..."
                        className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                        value={form.brand}
                        onChange={e => setForm({...form, brand: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Condition</label>
                      <select 
                        className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] appearance-none"
                        value={form.condition}
                        onChange={e => setForm({...form, condition: e.target.value})}
                      >
                        <option>New with Tags</option>
                        <option>Pre-Owned (Excellent)</option>
                        <option>Pre-Owned (Good)</option>
                        <option>For Parts</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-widest">Condition Notes</label>
                    <textarea 
                      rows={3}
                      placeholder="e.g. Small scratch on lens, box has shelf wear..."
                      className="w-full px-5 py-3.5 bg-[#F8FAFC] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-none"
                      value={form.conditionNotes}
                      onChange={e => setForm({...form, conditionNotes: e.target.value})}
                    />
                  </div>

                  {/* Toggle: Standard vs Premium */}
                  <div className="pt-4 border-t border-slate-100">
                    <label className="flex items-center justify-between cursor-pointer group">
                       <div>
                          <div className="text-sm font-bold text-[#0F172A]">Enable Premium Storytelling?</div>
                          <div className="text-xs text-slate-500">Uses GPT-4o for richer descriptions.</div>
                       </div>
                       <div 
                         onClick={() => setForm({...form, listingStyle: form.listingStyle === ListingStyle.STANDARD ? ListingStyle.PREMIUM : ListingStyle.STANDARD})}
                         className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 ${form.listingStyle === ListingStyle.PREMIUM ? 'bg-[#2563EB]' : 'bg-slate-200'}`}
                       >
                          <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${form.listingStyle === ListingStyle.PREMIUM ? 'translate-x-6' : 'translate-x-0'}`}></div>
                       </div>
                    </label>
                  </div>
               </div>
            </div>

            {/* GENERATE BUTTON */}
            <button 
              type="submit"
              disabled={isGenerating}
              className="w-full bg-[#2563EB] text-white py-5 rounded-2xl text-lg font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:shadow-2xl transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-wait"
            >
              {isGenerating ? 'Analyzing visual data...' : `Generate ${selectedPlatform === 'ebay' ? 'eBay' : selectedPlatform === 'shopify' ? 'Shopify' : 'Marketplace'} Listing`}
            </button>
          </div>
        </form>

        {/* OUTPUT SECTION */}
        {output && (
          <div className="mt-16 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="flex items-center gap-4 mb-6">
               <div className="h-px bg-slate-200 flex-1"></div>
               <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Results Ready</span>
               <div className="h-px bg-slate-200 flex-1"></div>
            </div>

            <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden">
               {/* Output Header */}
               <div className="bg-[#0F172A] p-6 sm:p-8 flex justify-between items-center">
                  <div>
                     <h3 className="text-xl font-bold text-white">Ready to Publish</h3>
                     <p className="text-slate-400 text-sm">Optimized for <span className="text-blue-400 capitalize font-bold">{selectedPlatform}</span></p>
                  </div>
                  <div className="flex gap-3">
                     <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/20 transition">Copy All</button>
                     <button className="bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 transition shadow-lg">Push Live</button>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left: Preview */}
                  <div className="p-8 border-r border-slate-100">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Description Preview</h4>
                     <div className="prose prose-sm prose-slate max-w-none h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        <div dangerouslySetInnerHTML={{ __html: output.htmlDescription }} />
                     </div>
                  </div>

                  {/* Right: Raw Data */}
                  <div className="bg-slate-50 p-8">
                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">SEO Titles</h4>
                     <div className="space-y-3 mb-8">
                        {output.titles.map((t, i) => (
                           <div key={i} className="bg-white p-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-400 cursor-pointer transition group flex justify-between gap-2" onClick={() => copyToClipboard(t)}>
                              <span className="truncate">{t}</span>
                              <span className="text-blue-500 opacity-0 group-hover:opacity-100 text-xs font-bold">COPY</span>
                           </div>
                        ))}
                     </div>

                     <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">HTML Source</h4>
                     <div className="bg-[#1E293B] rounded-xl p-4 font-mono text-xs text-blue-300 h-[200px] overflow-y-auto">
                        {output.htmlDescription}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BuilderPage;
