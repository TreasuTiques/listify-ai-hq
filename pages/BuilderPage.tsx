import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { generateListingFromImages } from '../services/ai';
import { saveListingToInventory } from '../services/inventory'; 

const BuilderPage: React.FC = () => {
  // 1. STATE MANAGEMENT
  const [activePlatform, setActivePlatform] = useState('ebay');
  const [isProMode, setIsProMode] = useState(false);
  
  // 🛠️ Editor Modes
  const [editorTab, setEditorTab] = useState<'visual' | 'html' | 'text'>('visual');
  const [copySuccess, setCopySuccess] = useState(''); 
  
  // 📝 CORE FIELDS
  const [title, setTitle] = useState('');
  const [condition, setCondition] = useState(''); 
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  // 🔍 THE PERFECT 10 ITEM SPECIFICS
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState(''); // New
  const [size, setSize] = useState(''); // New
  const [color, setColor] = useState(''); // New
  const [material, setMaterial] = useState(''); // New
  const [year, setYear] = useState(''); // New
  const [madeIn, setMadeIn] = useState(''); // New
  const [department, setDepartment] = useState(''); // New
  const [model, setModel] = useState(''); // New
  const [theme, setTheme] = useState(''); // New
  const [features, setFeatures] = useState(''); // New

  // 🧠 SELLER INSIGHTS (The INAD Shield)
  const [sellerInsights, setSellerInsights] = useState('');

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

  // 🛡️ Helper to check if platform supports HTML
  const isHtmlPlatform = activePlatform === 'ebay' || activePlatform === 'shopify';

  // 🧹 SMART TEXT FORMATTER
  const formatPlainText = (html: string) => {
    if (!html) return "";
    let text = html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/div>/gi, '\n')
      .replace(/<li[^>]*>/gi, '• ')
      .replace(/<\/li>/gi, '\n')
      .replace(/<\/ul>/gi, '\n')
      .replace(/<h[1-6][^>]*>/gi, '\n\n')
      .replace(/<\/h[1-6]>/gi, ':\n');
    const tmp = document.createElement("DIV");
    tmp.innerHTML = text;
    const cleanText = tmp.textContent || tmp.innerText || "";
    return cleanText.replace(/\n\s*\n\s*\n/g, '\n\n').trim();
  };

  // 🚀 MAIN AI TRIGGER
  const handleGenerateListing = async () => {
    if (selectedFiles.length === 0) { alert("Please upload at least one photo."); return; }
    if (!condition) { setShowConditionError(true); alert("Please select a condition first."); return; }

    setAnalyzing(true);
    
    try {
      // 📦 PACKAGING THE CONTEXT
      // We bundle all the user inputs into a single "Context String" to send to the AI
      // This allows the AI to use your specific inputs without changing the API signature yet.
      const richContext = `
        CONDITION: ${condition}.
        USER_INSIGHTS: ${sellerInsights}.
        SPECS_PROVIDED: 
        - Brand: ${brand}
        - Category: ${category}
        - Size: ${size}
        - Color: ${color}
        - Material: ${material}
        - Year/Era: ${year}
        - Origin: ${madeIn}
        - Department: ${department}
        - Model: ${model}
        - Theme: ${theme}
        - Features: ${features}
      `;

      const result = await generateListingFromImages(selectedFiles, activePlatform, isProMode, richContext);
      
      setTitle(result.title || '');
      // Only overwrite brand if AI found something better and user left it blank
      if (!brand && result.brand) setBrand(result.brand); 
      
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
    // 🛑 STOPPED AUTO-ANALYSIS here to save credits
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const handleProModeToggle = async () => {
    if (!user) {
      alert("🔒 PRO FEATURE: Sign up for a free account to unlock AI Storytelling Mode!");
      return;
    }
    setIsProMode(!isProMode);
  };

  const copyToClipboard = (text: string, type: 'title' | 'desc') => {
    const textToCopy = (type === 'desc' && editorTab === 'text' && isHtmlPlatform) 
      ? formatPlainText(text) 
      : text;
    navigator.clipboard.writeText(textToCopy);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(''), 2000);
  };
  
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  
  const handleSaveToInventory = async () => {
    if (!user) { alert("Please log in to save listings!"); return; }
    if (!title) { alert("Please generate a listing first."); return; }

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
    <div className="min-h-screen !bg-slate-50 dark:!bg-slate-900 transition-colors duration-300 pb-24 pt-20 px-4 sm:px-6 lg:px-8 relative">
      
      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border border-slate-700">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-[#0F172A]"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg></div>
            <div><h4 className="font-bold text-lg">Listing Saved!</h4><p className="text-slate-400 text-xs font-medium">Redirecting to Inventory...</p></div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            Listing Command Center
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Upload photos, fill details, and let AI work its magic.</p>
        </div>
        
        <div className="flex items-center gap-4">
           {activePlatform === 'ebay' && (
             <button onClick={handleProModeToggle} className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${isProMode ? 'bg-[#0F172A] dark:bg-blue-600 text-white border-[#0F172A] dark:border-blue-600 shadow-lg' : user ? 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-300' : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70'}`}>
               {!user && <span className="text-xs">🔒</span>}<span className={`w-2 h-2 rounded-full ${isProMode ? 'bg-green-400 animate-pulse' : 'bg-slate-300'}`}></span>Pro Mode: {isProMode ? 'ON' : 'OFF'}
             </button>
           )}
           <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-white dark:bg-slate-800 px-4 py-2 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">{imagePreviews.length} / 8 Photos • Target: <span className={`font-bold ml-1 ${activePlatform === 'ebay' ? 'text-blue-600 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>{activePlatform.toUpperCase()}</span></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: PHOTOS & INPUTS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="!bg-white dark:!bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Source Media</h3>
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md">Multi-Vision Ready</span>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" multiple />

            <div onClick={() => fileInputRef.current?.click()} onDragOver={onDragOver} onDrop={handleFileUpload} className={`border-2 border-dashed rounded-2xl h-[320px] flex flex-col transition-all cursor-pointer relative overflow-hidden ${analyzing ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 !bg-slate-50/50 dark:!bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-400'}`}>
              {imagePreviews.length > 0 ? (
                <div className="h-full flex flex-col">
                  <div className="h-2/3 w-full relative">
                    <img src={imagePreviews[0]} alt="Main" className="w-full h-full object-cover" />
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md">Main Photo</div>
                  </div>
                  <div className="h-1/3 w-full bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 p-2 grid grid-cols-4 gap-2 overflow-y-auto">
                    {imagePreviews.map((src, idx) => (
                      <div key={idx} className="relative group/thumb aspect-square rounded-lg overflow-hidden border border-slate-100 dark:border-slate-700">
                        <img src={src} className="w-full h-full object-cover" />
                        <button onClick={(e) => { e.stopPropagation(); removeImage(idx); }} className="absolute inset-0 bg-red-500/80 text-white opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center font-bold text-xs transition-opacity">✕</button>
                      </div>
                    ))}
                    {imagePreviews.length < 8 && <div className="flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg text-slate-400 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700">+ Add</div>}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"><svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></div>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Drop up to 8 Photos</p><p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Front, Back, Tags, Flaws</p>
                </div>
              )}
            </div>
          </div>

          {/* 📝 ITEM SPECIFICS GRID */}
          <div className="!bg-white dark:!bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-6">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Key Specifics (Optional)</h3>
                <span className="text-[10px] text-slate-400">Helps AI & eBay SEO</span>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Brand / Maker" value={brand} onChange={e => setBrand(e.target.value)} className="input-field" />
                <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="input-field" />
                
                <input type="text" placeholder="Size / Dims" value={size} onChange={e => setSize(e.target.value)} className="input-field" />
                <input type="text" placeholder="Color" value={color} onChange={e => setColor(e.target.value)} className="input-field" />
                
                <input type="text" placeholder="Material" value={material} onChange={e => setMaterial(e.target.value)} className="input-field" />
                <input type="text" placeholder="Year / Era" value={year} onChange={e => setYear(e.target.value)} className="input-field" />
                
                <input type="text" placeholder="Made In (Country)" value={madeIn} onChange={e => setMadeIn(e.target.value)} className="input-field" />
                <input type="text" placeholder="Dept (Men/Wms/Kids)" value={department} onChange={e => setDepartment(e.target.value)} className="input-field" />
                
                <input type="text" placeholder="Model / Style" value={model} onChange={e => setModel(e.target.value)} className="input-field" />
                <input type="text" placeholder="Theme (Star Wars, etc)" value={theme} onChange={e => setTheme(e.target.value)} className="input-field" />
             </div>
             <input type="text" placeholder="Features (Pockets, Waterproof, etc)" value={features} onChange={e => setFeatures(e.target.value)} className="input-field mt-4 w-full" />
          </div>

          {/* 🧠 SELLER INSIGHTS */}
          <div className="!bg-white dark:!bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-6">
             <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Seller Insights (Hidden Details)</h3>
             </div>
             <textarea 
               value={sellerInsights}
               onChange={e => setSellerInsights(e.target.value)}
               placeholder="Example: 'Small scratch on back', 'Smells slightly like vanilla', 'Zipper sticks a bit'. The AI will weave this into the description naturally."
               className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 min-h-[80px] resize-none"
             ></textarea>
          </div>
        </div>

        {/* RIGHT COLUMN: GENERATOR & PREVIEW */}
        <div className="lg:col-span-7 space-y-6">
          <div className="!bg-white dark:!bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-8">
            
            {/* PLATFORM SELECTOR */}
            <div className="mb-6">
               <div className="flex flex-wrap gap-2">
                 {platforms.map((platform) => (
                   <button key={platform.id} onClick={() => setActivePlatform(platform.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border ${activePlatform === platform.id ? 'bg-[#0F172A] dark:bg-blue-600 text-white border-[#0F172A] dark:border-blue-600 shadow-md' : 'bg-white dark:bg-slate-700 text-slate-500 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-slate-300'}`}>
                     <span className={`w-2 h-2 rounded-full ${activePlatform === platform.id ? 'bg-white' : platform.color}`}></span>{platform.label}
                   </button>
                 ))}
               </div>
            </div>

            {/* GENERATE BUTTON (Replaces Auto-Run) */}
            <div className="grid grid-cols-2 gap-4 mb-6">
               {/* Condition Selector */}
               <div className="relative">
                  <select value={condition} onChange={e => {setCondition(e.target.value); setShowConditionError(false)}} className={`w-full bg-slate-50 dark:bg-slate-900 border rounded-xl px-4 py-3.5 font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer ${showConditionError ? 'border-red-300 ring-red-500/10' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/10'}`}>
                    <option value="" disabled>Select Condition (Required)</option>
                    <option>New with Tags</option>
                    <option>New without Tags</option>
                    <option>Pre-owned (Excellent)</option>
                    <option>Pre-owned (Good)</option>
                    <option>For Parts / Not Working</option>
                  </select>
               </div>

               {/* MAGIC BUTTON */}
               <button 
                 onClick={handleGenerateListing} 
                 disabled={analyzing}
                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
               >
                 {analyzing ? (
                   <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Writing...</>
                 ) : (
                   <>✨ Generate Premium Listing</>
                 )}
               </button>
            </div>

            {/* TITLE & PRICE */}
            <div className="flex gap-4 mb-6">
               <div className="flex-1">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400" placeholder="Generated Title..." />
               </div>
               <div className="w-32">
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 block">Price</label>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500 transition-all placeholder:text-emerald-300" placeholder="$0.00" />
               </div>
            </div>

            {/* DESCRIPTION EDITOR */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</label>
                 
                 {isHtmlPlatform ? (
                    <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                          <button onClick={() => setEditorTab('visual')} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${editorTab === 'visual' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>Visual</button>
                          <button onClick={() => setEditorTab('html')} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${editorTab === 'html' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>HTML</button>
                          <button onClick={() => setEditorTab('text')} className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${editorTab === 'text' ? 'bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}>Text</button>
                    </div>
                 ) : null}
                 
                 <button onClick={() => copyToClipboard(description, 'desc')} className="text-blue-600 dark:text-blue-400 text-xs font-bold hover:underline">
                    {copySuccess === 'desc' ? 'Copied!' : 'Copy to Clipboard'}
                 </button>
              </div>

              <div className="relative">
                 {isHtmlPlatform && editorTab === 'visual' ? (
                    <div 
                       className="w-full !bg-white dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 h-[500px] overflow-y-auto prose prose-sm max-w-none dark:prose-invert dark:invert dark:hue-rotate-180" 
                       dangerouslySetInnerHTML={{ __html: description || '<p class="text-slate-400 italic text-center mt-20">1. Upload Photos<br>2. Fill Specs<br>3. Select Condition<br>4. Click Generate!</p>' }}
                    ></div>
                 ) : isHtmlPlatform && editorTab === 'text' ? (
                    <textarea readOnly value={formatPlainText(description)} className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-6 py-6 focus:outline-none h-[500px] resize-none text-left font-sans text-[15px] leading-relaxed text-slate-800 dark:text-slate-200"></textarea>
                 ) : (
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 h-[500px] resize-none" placeholder="AI will write this for you..."></textarea>
                 )}
              </div>
            </div>

            <button onClick={handleSaveToInventory} disabled={loading} className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
              {loading ? "Saving..." : `Save to Inventory`}
            </button>
          </div>
        </div>
      </div>
      
      {/* GLOBAL STYLES FOR INPUTS */}
      <style>{`
        .input-field {
          @apply w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400;
        }
      `}</style>
    </div>
  );
};
export default BuilderPage;
