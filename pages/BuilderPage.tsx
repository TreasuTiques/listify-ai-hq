
import React, { useState, useRef } from 'react';
import { ListingFormValues, ListingStyle, GeneratedListing } from '../types';
import { generateStandardListing, generatePremiumListing } from '../services/mockGenerator';

const BuilderPage: React.FC = () => {
  const [images, setImages] = useState<File[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [output, setOutput] = useState<GeneratedListing | null>(null);
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
    
    setTimeout(() => {
      const result = form.listingStyle === ListingStyle.STANDARD 
        ? generateStandardListing(form) 
        : generatePremiumListing(form);
      
      setOutput(result);
      setIsGenerating(false);
      
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-4xl font-semibold text-[#0F172A] tracking-tight">Create your Listing</h1>
          <p className="text-slate-500 mt-3 text-lg">Detailed input leads to higher conversion. Let's get started.</p>
        </header>

        <form onSubmit={handleGenerate} className="space-y-12">
          {/* Step 1: Photos */}
          <section className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-sm font-bold">1</span>
              <h2 className="text-xl font-semibold text-[#0F172A]">Upload Product Photos</h2>
            </div>
            
            <div className="flex flex-col md:flex-row gap-10">
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragEnter={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`flex-shrink-0 w-full md:w-60 h-60 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative group overflow-hidden ${
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
                
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${isDragging ? 'bg-[#2563EB] text-white' : 'bg-white text-slate-400 group-hover:text-[#2563EB] shadow-sm'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
                  </svg>
                </div>
                <div className="text-center">
                  <span className="block text-[13px] font-bold text-[#0F172A] uppercase tracking-widest mb-1">Upload Images</span>
                  <span className="block text-xs text-slate-400">or drag and drop here</span>
                </div>
              </div>
              
              <div className="flex-1">
                {images.length > 0 ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                      {images.map((img, i) => (
                        <div key={i} className="relative group aspect-square bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                           <div className="absolute inset-0 flex items-center justify-center text-[10px] text-slate-300 font-bold uppercase truncate px-2">
                             {img.name}
                           </div>
                           <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setImages(prev => prev.filter((_, index) => index !== i));
                            }}
                            className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#2563EB] bg-blue-50 px-4 py-2 rounded-xl inline-flex">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                      <span className="font-semibold">AI Detection Active</span>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-center py-4">
                    <p className="text-slate-400 font-medium">Ready for your photos...</p>
                    <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">Better photos lead to more accurate AI generation. Include labels, serial numbers, and any wear.</p>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Step 2: Form */}
          <section className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-200/60">
            <div className="flex items-center gap-3 mb-10">
              <span className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center text-sm font-bold">2</span>
              <h2 className="text-xl font-semibold text-[#0F172A]">Listing Details</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-full">
                <label className="block text-[13px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Item Title / Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Vintage Hot Wheels Redline Lot"
                  className="w-full px-5 py-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium"
                  value={form.title}
                  onChange={e => setForm({...form, title: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Brand / Model</label>
                <input 
                  type="text"
                  required
                  placeholder="Sony, Nike, LEGO, etc."
                  className="w-full px-5 py-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium"
                  value={form.brand}
                  onChange={e => setForm({...form, brand: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-[13px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Condition</label>
                <select 
                  className="w-full px-5 py-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium appearance-none cursor-pointer"
                  value={form.condition}
                  onChange={e => setForm({...form, condition: e.target.value})}
                >
                  <option>New</option>
                  <option>Like New</option>
                  <option>Very Good</option>
                  <option>Good</option>
                  <option>Acceptable</option>
                  <option>For Parts / Not Working</option>
                </select>
              </div>

              <div className="col-span-full">
                <label className="block text-[13px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Condition Notes</label>
                <textarea 
                  rows={4}
                  placeholder="Mention wear, missing parts, or any specific quirks..."
                  className="w-full px-5 py-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium resize-none"
                  value={form.conditionNotes}
                  onChange={e => setForm({...form, conditionNotes: e.target.value})}
                />
              </div>

              <div className="col-span-full">
                <label className="block text-[13px] font-bold text-slate-500 mb-2 uppercase tracking-widest">Special Features</label>
                <textarea 
                  rows={2}
                  placeholder="Limited edition, rare variants, provenance..."
                  className="w-full px-5 py-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all font-medium resize-none"
                  value={form.specialFeatures}
                  onChange={e => setForm({...form, specialFeatures: e.target.value})}
                />
              </div>
            </div>
          </section>

          {/* Listing Style Toggle */}
          <div className="bg-white p-2 rounded-full shadow-sm border border-slate-200/60 max-w-xl mx-auto flex">
            <button
              type="button"
              onClick={() => setForm({...form, listingStyle: ListingStyle.STANDARD})}
              className={`flex-1 px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 ${form.listingStyle === ListingStyle.STANDARD ? 'bg-[#0F172A] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Standard Listing
            </button>
            <button
              type="button"
              onClick={() => setForm({...form, listingStyle: ListingStyle.PREMIUM})}
              className={`flex-1 px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 ${form.listingStyle === ListingStyle.PREMIUM ? 'bg-[#2563EB] text-white shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {form.listingStyle === ListingStyle.PREMIUM && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
              Premium Collector
            </button>
          </div>

          <div className="text-center">
            <button 
              type="submit"
              disabled={isGenerating}
              className={`bg-[#2563EB] text-white px-16 py-5 rounded-full text-lg font-bold shadow-xl hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Writing your listing...
                </div>
              ) : 'Generate Optimized Listing'}
            </button>
          </div>
        </form>

        {/* Output Panel */}
        {output && (
          <div className="mt-20 space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-700 fill-mode-forwards">
            <div className="bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.15)] border border-slate-200 overflow-hidden">
              <div className="bg-[#0F172A] px-10 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <h2 className="text-2xl font-semibold text-white">Listing Output</h2>
                  <p className="text-slate-400 mt-1">Ready for copy & paste.</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setOutput(null)} className="px-5 py-2.5 rounded-full bg-slate-800 text-slate-300 text-sm font-bold hover:bg-slate-700 transition-colors">Start Over</button>
                  <button className="px-5 py-2.5 rounded-full bg-[#2563EB] text-white text-sm font-bold hover:bg-blue-700 transition-colors">Export to eBay</button>
                </div>
              </div>
              
              <div className="p-10 space-y-12">
                {/* Titles */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Title Variants</h3>
                    <span className="text-[10px] bg-slate-100 px-2 py-1 rounded text-slate-500">OPTIMIZED FOR SEO</span>
                  </div>
                  <div className="space-y-4">
                    {output.titles.map((t, i) => (
                      <div key={i} className="flex group items-center justify-between bg-[#F8FAFC] border border-slate-200/60 p-5 rounded-2xl hover:border-[#2563EB] transition-all">
                        <span className="font-semibold text-[#0F172A] pr-4">{t}</span>
                        <button 
                          onClick={() => { copyToClipboard(t); alert('Title copied!'); }}
                          className="flex-shrink-0 text-[#2563EB] font-bold text-xs uppercase opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">Visual Preview</h3>
                  <div className="p-8 border border-slate-200 rounded-3xl bg-white shadow-inner max-h-[600px] overflow-y-auto">
                    <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: output.htmlDescription }} />
                  </div>
                </div>

                {/* Code Block */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">HTML Code</h3>
                    <button 
                      onClick={() => { copyToClipboard(output.htmlDescription); alert('HTML copied!'); }}
                      className="text-[#2563EB] text-xs font-bold flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                      Copy Snippet
                    </button>
                  </div>
                  <div className="bg-[#0F172A] rounded-2xl p-6 font-mono text-[12px] text-slate-300 overflow-x-auto border border-slate-800 leading-relaxed">
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
