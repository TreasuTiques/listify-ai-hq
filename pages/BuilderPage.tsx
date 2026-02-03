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
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [material, setMaterial] = useState('');
  const [year, setYear] = useState('');
  const [madeIn, setMadeIn] = useState('');
  const [department, setDepartment] = useState('');
  const [model, setModel] = useState('');
  const [theme, setTheme] = useState('');
  const [features, setFeatures] = useState('');

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

  // 🔐 ROBUST AUTH LISTENER
  useEffect(() => {
    // 1. Check active session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // 2. Listen for any auth changes (sign in, token refresh, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
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
      
      // ✅ AUTO-POPULATE LOGIC
      if (result.item_specifics) {
        if (!brand && result.item_specifics.brand) setBrand(result.item_specifics.brand);
        if (!category && result.item_specifics.category) setCategory(result.item_specifics.category);
        if (!size && result.item_specifics.size) setSize(result.item_specifics.size);
        if (!color && result.item_specifics.color) setColor(result.item_specifics.color);
        if (!material && result.item_specifics.material) setMaterial(result.item_specifics.material);
        if (!year && result.item_specifics.year) setYear(result.item_specifics.year);
        if (!madeIn && result.item_specifics.made_in) setMadeIn(result.item_specifics.made_in);
        if (!department && result.item_specifics.department) setDepartment(result.item_specifics.department);
        if (!model && result.item_specifics.model) setModel(result.item_specifics.model);
        if (!theme && result.item_specifics.theme) setTheme(result.item_specifics.theme);
        if (!features && result.item_specifics.features) setFeatures(result.item_specifics.features);
      }

      setTitle(result.title || '');
      // Fallback for brand if it came in top-level
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
  };

  const removeImage = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  // 🔒 SECURE TOGGLE CHECK
  const handleProModeToggle = async () => {
    // 1. Double check session freshly from Supabase to avoid stale state bugs
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
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
    // Check state user or fetch fresh
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) { alert("Please log in to save listings!"); return; }
    
    if (!title) { alert("Please generate a listing first."); return; }

    setLoading(true);
    try {
      const listingData = { 
        title, brand, description, condition, estimated_price: price, tags: tags, platform: activePlatform,
        item_specifics: { size, color, material, year, madeIn, department, model, theme, features }
      };
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

  // 🎨 REUSABLE COMPONENT: Premium Input Field
  const PremiumInput = ({ label, value, onChange, placeholder, width = "full" }: any) => (
    <div className={`${width === "half" ? "col-span-1" : "col-span-2"}`}>
      <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
        {label}
      </label>
      <input 
        type="text" 
        value={value} 
        onChange={onChange} 
        className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 text-sm shadow-sm" 
        placeholder={placeholder} 
      />
    </div>
  );

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

      {/* HEADER SECTION */}
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
        
        {/* ================= LEFT COLUMN: MEDIA & DATA ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. MEDIA UPLOADER */}
          <div className="!bg-white dark:!bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Source Media</h3>
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded-md">Multi-Vision Ready</span>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" multiple />

            <div onClick={() => fileInputRef.current?.click()} onDragOver={onDragOver} onDrop={handleFileUpload} className={`border-2 border-dashed rounded-2xl h-[300px] flex flex-col transition-all cursor-pointer relative overflow-hidden ${analyzing ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 !bg-slate-50/50 dark:!bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-400'}`}>
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

          {/* 2. ITEM SPECIFICS & INSIGHTS (UNIFIED PREMIUM CARD) */}
          <div className="!bg-white dark:!bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-6 space-y-6">
             
             {/* SECTION: SELLER INSIGHTS */}
             <div>
               <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="text-lg">💡</span> Seller Insights (Hidden Details)
                  </h3>
               </div>
               <textarea 
                 value={sellerInsights}
                 onChange={e => setSellerInsights(e.target.value)}
                 placeholder="Examples: 'Smells slightly like vanilla', 'Zipper sticks a bit', 'Found at estate sale'. The AI will weave this into the description naturally."
                 className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 min-h-[80px] resize-none font-medium text-slate-900 dark:text-white"
               ></textarea>
             </div>

             <div className="border-t border-slate-100 dark:border-slate-700 my-4"></div>

             {/* SECTION: ITEM SPECIFICS GRID */}
             <div>
                <div className="flex items-center justify-between mb-4">
                   <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                     <span className="text-lg">🏷️</span> Key Specifics (Optional)
                   </h3>
                   <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">Auto-Fills on Generate</span>
                </div>
                
                {/* THE PREMIUM GRID - Matches Title/Price Inputs Perfectly */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                   <PremiumInput label="Brand / Maker" value={brand} onChange={(e: any) => setBrand(e.target.value)} placeholder="Nike, Sony..." width="half" />
                   <PremiumInput label="Category" value={category} onChange={(e: any) => setCategory(e.target.value)} placeholder="Shoes, Electronics..." width="half" />
                   
                   <PremiumInput label="Size / Dims" value={size} onChange={(e: any) => setSize(e.target.value)} placeholder="Large, 12x10..." width="half" />
                   <PremiumInput label="Color" value={color} onChange={(e: any) => setColor(e.target.value)} placeholder="Red, Black..." width="half" />
                   
                   <PremiumInput label="Material" value={material} onChange={(e: any) => setMaterial(e.target.value)} placeholder="Cotton, Metal..." width="half" />
                   <PremiumInput label="Year / Era" value={year} onChange={(e: any) => setYear(e.target.value)} placeholder="1990s, 2023..." width="half" />
                   
                   <PremiumInput label="Made In" value={madeIn} onChange={(e: any) => setMadeIn(e.target.value)} placeholder="USA, China..." width="half" />
                   <PremiumInput label="Department" value={department} onChange={(e: any) => setDepartment(e.target.value)} placeholder="Men, Women..." width="half" />
                   
                   <PremiumInput label="Model / Style" value={model} onChange={(e: any) => setModel(e.target.value)} placeholder="Air Max, 501..." width="half" />
                   <PremiumInput label="Theme" value={theme} onChange={(e: any) => setTheme(e.target.value)} placeholder="Vintage, Sports..." width="half" />
                   
                   {/* Full Width Feature */}
                   <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Key Features</label>
                      <input 
                        type="text" 
                        value={features} 
                        onChange={e => setFeatures(e.target.value)} 
                        className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 text-sm shadow-sm" 
                        placeholder="Waterproof, Pockets, Signed, Limited Edition..." 
                      />
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN: GENERATOR & PREVIEW ================= */}
        <div className="lg:col-span-7 space-y-6">
          <div className="!bg-white dark:!bg-slate-800 rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-8 sticky top-24">
            
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

            {/* TITLE (Full Width) */}
            <div className="mb-4">
               <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1 block">Title</label>
               <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 font-bold text-lg text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400 shadow-sm" placeholder="AI Generated Title..." />
            </div>

            {/* CONDITION & PRICE ROW (Compact) */}
            <div className="grid grid-cols-12 gap-4 mb-6">
               {/* Condition Selector (Larger) */}
               <div className="col-span-8">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1 block">Condition {showConditionError && <span className="text-red-500">*</span>}</label>
                  <div className="relative">
                    <select value={condition} onChange={e => {setCondition(e.target.value); setShowConditionError(false)}} className={`w-full !bg-slate-50 dark:!bg-slate-900 border rounded-xl px-4 py-3.5 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-4 transition-all appearance-none cursor-pointer shadow-sm ${showConditionError ? 'border-red-300 ring-red-500/10' : 'border-slate-200 dark:border-slate-700 focus:border-blue-500 focus:ring-blue-500/10'}`}>
                      <option value="" disabled>Select Condition...</option>
                      <option>New with Tags</option>
                      <option>New without Tags</option>
                      <option>Pre-owned (Excellent)</option>
                      <option>Pre-owned (Good)</option>
                      <option>For Parts / Not Working</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg></div>
                  </div>
               </div>

               {/* Price Input (Smaller) */}
               <div className="col-span-4">
                  <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-1.5 ml-1 block">Price ($)</label>
                  <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 rounded-xl px-4 py-3.5 font-bold focus:outline-none focus:border-emerald-500 transition-all placeholder:text-emerald-300 shadow-sm text-center" placeholder="0.00" />
               </div>
            </div>

            {/* MAGIC BUTTON */}
            <button 
               onClick={handleGenerateListing} 
               disabled={analyzing}
               className="w-full mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base uppercase tracking-wider rounded-xl shadow-xl shadow-blue-500/20 py-4 transition-all transform active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed border border-white/10"
            >
               {analyzing ? (
                 <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> AI is Writing...</>
               ) : (
                 <>✨ Generate Premium Listing</>
               )}
            </button>

            {/* DESCRIPTION EDITOR */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description Preview</label>
                 
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
                       className="w-full !bg-white dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 h-[500px] overflow-y-auto prose prose-sm max-w-none dark:prose-invert dark:invert dark:hue-rotate-180 shadow-inner" 
                       dangerouslySetInnerHTML={{ __html: description || '<div class="flex flex-col items-center justify-center h-full text-slate-400 space-y-4"><span class="text-4xl">✨</span><p>Ready to create magic.<br>Upload photos & click Generate.</p></div>' }}
                    ></div>
                 ) : isHtmlPlatform && editorTab === 'text' ? (
                    <textarea readOnly value={formatPlainText(description)} className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-6 py-6 focus:outline-none h-[500px] resize-none text-left font-sans text-[15px] leading-relaxed text-slate-800 dark:text-slate-200 shadow-inner"></textarea>
                 ) : (
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full !bg-slate-50 dark:!bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 h-[500px] resize-none shadow-inner" placeholder="AI will write this for you..."></textarea>
                 )}
              </div>
            </div>

            <button onClick={handleSaveToInventory} disabled={loading} className="w-full bg-[#0F172A] hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2">
              {loading ? "Saving..." : `Save to Inventory`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuilderPage;
