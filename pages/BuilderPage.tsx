import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { generateListingFromImages } from '../services/ai';
import { saveListingToInventory } from '../services/inventory'; 

const BuilderPage: React.FC = () => {
  // 1. STATE MANAGEMENT
  const [activePlatform, setActivePlatform] = useState('ebay');
  const [isProMode, setIsProMode] = useState(false);
  
  // eBay Editor State
  const [editorTab, setEditorTab] = useState<'visual' | 'html'>('visual');
  const [copySuccess, setCopySuccess] = useState(''); 

  // Form Fields
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState(''); 
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  // 📸 Multi-Image Memory
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); 
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  
  // UI States
  const [loading, setLoading] = useState(false); 
  const [analyzing, setAnalyzing] = useState(false); 
  const [user, setUser] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConditionError, setShowConditionError] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const platforms = [
    { id: 'ebay', label: 'eBay', color: 'bg-blue-600' },
    { id: 'poshmark', label: 'Poshmark', color: 'bg-red-700' },
    { id: 'mercari', label: 'Mercari', color: 'bg-purple-600' },
    { id: 'depop', label: 'Depop', color: 'bg-black' },
    { id: 'etsy', label: 'Etsy', color: 'bg-orange-500' },
    { id: 'shopify', label: 'Shopify', color: 'bg-emerald-500' },
    { id: 'facebook', label: 'Facebook', color: 'bg-blue-800' },
  ];

  // 🧠 HELPER: The Brain Function
  const runAIAnalysis = async (files: File[], platform: string, proMode: boolean, cond: string) => {
    if (files.length === 0) return;
    if (!cond) return; 

    setAnalyzing(true);
    try {
      const result = await generateListingFromImages(files, platform, proMode, cond);
      setTitle(result.title || '');
      setBrand(result.brand || '');
      setDescription(result.description || '');
      setPrice(result.estimated_price || '');
      setTags(result.tags || []);
      setEditorTab('visual');
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI could not analyze images. Try again!");
    } finally {
      setAnalyzing(false);
    }
  };

  // 2. AI MAGIC: Handle Image Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let newFiles: File[] = [];
    if ((e as React.DragEvent).dataTransfer) {
      e.preventDefault();
      newFiles = Array.from((e as React.DragEvent).dataTransfer.files);
    } else if ((e as React.ChangeEvent<HTMLInputElement>).target.files) {
      newFiles = Array.from((e as React.ChangeEvent<HTMLInputElement>).target.files!);
    }
    if (newFiles.length === 0) return;

    const updatedFiles = [...selectedFiles, ...newFiles].slice(0, 8);
    setSelectedFiles(updatedFiles);

    const newPreviews = await Promise.all(updatedFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });
    }));
    setImagePreviews(newPreviews);

    if (condition) {
       await runAIAnalysis(updatedFiles, activePlatform, isProMode, condition);
    }
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handlePlatformChange = async (newPlatform: string) => {
    setActivePlatform(newPlatform);
    if (selectedFiles.length > 0 && condition) {
      await runAIAnalysis(selectedFiles, newPlatform, isProMode, condition);
    }
  };

  const handleProModeToggle = async () => {
    if (!user) {
      alert("🔒 PRO FEATURE: Sign up for a free account to unlock AI Storytelling Mode!");
      return;
    }
    const newMode = !isProMode;
    setIsProMode(newMode);
    if (selectedFiles.length > 0 && condition) {
      await runAIAnalysis(selectedFiles, activePlatform, newMode, condition);
    }
  };

  const handleConditionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCondition = e.target.value;
    setCondition(newCondition);
    setShowConditionError(false);
    
    if (selectedFiles.length > 0) {
      await runAIAnalysis(selectedFiles, activePlatform, isProMode, newCondition);
    }
  };

  const copyToClipboard = (text: string, type: 'title' | 'desc') => {
    navigator.clipboard.writeText(text);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(''), 2000);
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  
  const handleGenerateAndSave = async () => {
    if (!user) { alert("Please log in to save listings!"); return; }
    if (!title) { alert("Please enter a title first."); return; }
    if (!condition) { setShowConditionError(true); alert("⚠️ PLEASE SELECT A CONDITION."); return; }

    setLoading(true);
    try {
      const listingData = { title, brand, description, condition, estimated_price: price, tags: tags, platform: activePlatform };
      await saveListingToInventory(listingData, selectedFiles[0]);
      setShowSuccess(true);
      setTimeout(() => { window.location.hash = '/inventory'; }, 1500);
    } catch (error: any) {
      console.error('Error saving listing:', error);
      alert('Error saving: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    // ✅ ADDED: dark:bg-slate-900 transition-colors
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900 transition-colors duration-300 pb-24 pt-20 px-4 sm:px-6 lg:px-8 relative">
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl shadow-2xl shadow-blue-900/20 flex items-center gap-4 border border-slate-700">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-[#0F172A] shadow-lg shadow-green-500/20"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg></div>
            <div><h4 className="font-bold text-lg">Listing Saved!</h4><p className="text-slate-400 text-xs font-medium">Redirecting to Inventory...</p></div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* ✅ ADDED: dark:text-white */}
          <h1 className="text-3xl font-bold text-[#0F172A] dark:text-white tracking-tight flex items-center gap-3"><span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>Listing Command Center</h1>
          {/* ✅ ADDED: dark:text-slate-400 */}
          <p className="text-slate-500 dark:text-slate-400 mt-1">Upload up to 8 photos for maximum accuracy.</p>
        </div>
        <div className="flex items-center gap-4">
           {activePlatform === 'ebay' && (
             // ✅ ADDED: Dark mode styles for Pro Button
             <button onClick={handleProModeToggle} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${isProMode ? 'bg-[#0F172A] dark:bg-blue-600 text-white border-[#0F172A] dark:border-blue-600 shadow-lg' : user ? 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300' : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70'}`}>
               {!user && <span className="text-xs">🔒</span>}<span className={`w-2 h-2 rounded-full ${isProMode ? 'bg-green-400 animate-pulse' : 'bg-slate-300'}`}></span>Pro Mode: {isProMode ? 'ON' : 'OFF'}
             </button>
           )}
           {/* ✅ ADDED: Dark mode styles for Counter */}
           <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">{imagePreviews.length} / 8 Photos • Target: <span className={`font-bold ml-1 ${activePlatform === 'ebay' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>{activePlatform.toUpperCase()}</span></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: DROP ZONE (MULTI-IMAGE) */}
        <div className="lg:col-span-5 space-y-6">
          {/* ✅ ADDED: dark:bg-slate-800 dark:border-slate-700 */}
          <div className="bg-white dark:bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-6 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Source Media</h3>
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md">Multi-Vision Ready</span>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden" 
              accept="image/*"
              multiple 
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDrop={handleFileUpload}
              className={`border-2 border-dashed rounded-2xl h-[400px] flex flex-col transition-all cursor-pointer relative overflow-hidden ${
                analyzing 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-400'
              }`}
            >
              {imagePreviews.length > 0 ? (
                <div className="h-full flex flex-col">
                  {/* Main Preview (First Image) */}
                  <div className="h-2/3 w-full relative">
                    <img src={imagePreviews[0]} alt="Main" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md">Main Photo</div>
                  </div>
                  {/* Thumbnails Grid */}
                  <div className="h-1/3 w-full bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-2 grid grid-cols-4 gap-2 overflow-y-auto">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative group/thumb aspect-square rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700">
                        <img src={src} className="w-full h-full object-cover" />
                        <button 
                           onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                           className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center font-bold text-xs transition-opacity"
                        >✕</button>
                      </div>
                    ))}
                    {imagePreviews.length < 8 && (
                      <div className="flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">
                        + Add
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Drop up to 8 Photos</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Front, Back, Tags, Flaws</p>
                </div>
              )}

              {analyzing && (
                <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-bold text-blue-700 dark:text-blue-400 animate-pulse">Analyzing {imagePreviews.length} Photos...</p>
                  <p className="text-xs text-blue-500 dark:text-blue-300">Reading Condition: {condition}...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-8">
            
            {/* PLATFORMS */}
            <div className="mb-8">
               <label className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Target Marketplace</label>
               <div className="flex flex-wrap gap-2">
                 {platforms.map((platform) => (
                   <button
                     key={platform.id}
                     onClick={() => handlePlatformChange(platform.id)}
                     className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border ${
                       activePlatform === platform.id
                         ? 'bg-[#0F172A] dark:bg-blue-600 text-white border-[#0F172A] dark:border-blue-600 shadow-md transform scale-105'
                         : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-600'
                     }`}
                   >
                     <span className={`w-2 h-2 rounded-full ${activePlatform === platform.id ? 'bg-white' : platform.color}`}></span>
                     {platform.label}
                   </button>
                 ))}
               </div>
            </div>

            {/* TITLE */}
            <div className="mb-6 relative">
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Listing Title</label>
                <span className={`text-xs font-bold ${title.length > (activePlatform === 'poshmark' ? 50 : 80) ? 'text-red-500' : 'text-slate-400'}`}>
                   {title.length} / {activePlatform === 'poshmark' ? '50' : '80'}
                </span>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 pr-16 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                  placeholder="AI will generate this..."
                />
                <button 
                  onClick={() => copyToClipboard(title, 'title')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 p-2 rounded-lg transition-colors border border-blue-100 dark:border-blue-800"
                  title="Copy Title"
                >
                  {copySuccess === 'title' ? (
                     <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  ) : (
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Brand</label>
                <input 
                  type="text" 
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400"
                  placeholder="Nike, Sony..."
                />
              </div>
              
              {/* CONDITION */}
              <div className="relative">
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${showConditionError ? 'text-red-500 animate-pulse' : 'text-slate-500 dark:text-slate-400'}`}>
                   Condition {showConditionError && "(Required!)"}
                </label>
                <div className="relative">
                  <select 
                    value={condition}
                    onChange={handleConditionChange}
                    className={`w-full bg-white dark:bg-slate-900 border rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer ${
                       showConditionError 
                       ? 'border-red-300 ring-red-500/10' 
                       : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/10'
                    }`}
                  >
                    <option value="" disabled>Select Condition...</option>
                    <option>New with Tags</option>
                    <option>New without Tags</option>
                    <option>Pre-owned (Excellent)</option>
                    <option>Pre-owned (Good)</option>
                    <option>For Parts / Not Working</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* PRICE ESTIMATE */}
            <div className="mb-6">
               <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">AI Estimated Price</label>
               <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500 transition-all placeholder:text-emerald-300"
                  placeholder="$0.00"
                />
            </div>

            {/* DESCRIPTION */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description / Notes</label>
                 
                 {activePlatform === 'ebay' ? (
                    <div className="flex gap-2">
                       <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                          <button onClick={() => setEditorTab('visual')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${editorTab === 'visual' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>Visual Preview</button>
                          <button onClick={() => setEditorTab('html')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${editorTab === 'html' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>HTML Source</button>
                       </div>
                       <button onClick={() => copyToClipboard(description, 'desc')} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 transition-all shadow-md shadow-blue-500/20">
                          {copySuccess === 'desc' ? <span>✓ Copied</span> : <><span>📋</span> Copy Code</>}
                       </button>
                    </div>
                 ) : (
                    <button onClick={() => copyToClipboard(description, 'desc')} className="bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-800 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 transition-all border border-blue-100 dark:border-blue-800">
                        {copySuccess === 'desc' ? <span>✓ Copied</span> : <><span>📋</span> Copy Text</>}
                    </button>
                 )}
              </div>

              {activePlatform === 'ebay' ? (
                // EBAY SMART EDITOR (HTML Support)
                <div className="relative">
                   {editorTab === 'visual' ? (
                      <div 
                         className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 h-[600px] overflow-y-auto prose prose-sm max-w-none dark:prose-invert"
                         dangerouslySetInnerHTML={{ __html: description || '<p class="text-slate-400 italic">Select condition to generate listing...</p>' }}
                      ></div>
                   ) : (
                      <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-900 text-green-400 font-mono text-sm border border-slate-700 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 h-[600px] resize-none"
                        placeholder="<html>...</html>"
                      ></textarea>
                   )}
                </div>
              ) : (
                // STANDARD EDITOR
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 h-[600px] resize-none"
                  placeholder="AI will write this for you..."
                ></textarea>
              )}
            </div>

            {/* ACTION BUTTON */}
            <button 
              onClick={handleGenerateAndSave}
              disabled={loading || analyzing}
              className="w-full bg-[#2563EB] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-600 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Uploading & Saving..." : analyzing ? `Optimizing with ${condition}...` : `Save ${platforms.find(p => p.id === activePlatform)?.label} Listing`}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
