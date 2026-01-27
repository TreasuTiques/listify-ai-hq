import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import { generateListingFromImage } from '../services/ai';
import { saveListingToInventory } from '../services/inventory'; 

const BuilderPage: React.FC = () => {
  // 1. STATE MANAGEMENT
  const [activePlatform, setActivePlatform] = useState('ebay');
  const [isProMode, setIsProMode] = useState(false);
  
  // eBay Editor State
  const [editorTab, setEditorTab] = useState<'visual' | 'html'>('visual');
  const [copySuccess, setCopySuccess] = useState(false);

  // Form Fields
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [condition, setCondition] = useState('New with Tags');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  // 📸 File Memory
  const [selectedFile, setSelectedFile] = useState<File | null>(null); 
  
  // UI States
  const [loading, setLoading] = useState(false); 
  const [analyzing, setAnalyzing] = useState(false); 
  const [user, setUser] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for User on Load
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
  const runAIAnalysis = async (file: File, platform: string, proMode: boolean) => {
    setAnalyzing(true);
    try {
      const result = await generateListingFromImage(file, platform, proMode);
      
      setTitle(result.title || '');
      setBrand(result.brand || '');
      setDescription(result.description || '');
      setCondition(result.condition || 'New with Tags');
      setPrice(result.estimated_price || '');
      setTags(result.tags || []);
      
      // Auto-switch to visual tab on new generation
      setEditorTab('visual');
      
    } catch (error) {
      console.error("AI Error:", error);
      alert("AI could not analyze image. Try another one!");
    } finally {
      setAnalyzing(false);
    }
  };

  // 2. AI MAGIC: Handle Image Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    let file: File | null = null;

    if ((e as React.DragEvent).dataTransfer) {
      e.preventDefault();
      file = (e as React.DragEvent).dataTransfer.files[0];
    } else if ((e as React.ChangeEvent<HTMLInputElement>).target.files) {
      file = (e as React.ChangeEvent<HTMLInputElement>).target.files![0];
    }

    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setImagePreview(e.target?.result as string);
    reader.readAsDataURL(file);

    await runAIAnalysis(file, activePlatform, isProMode);
  };

  // 🔄 Handle Platform Change
  const handlePlatformChange = async (newPlatform: string) => {
    setActivePlatform(newPlatform);
    if (selectedFile) {
      await runAIAnalysis(selectedFile, newPlatform, isProMode);
    }
  };

  // 🔄 Handle Pro Mode Toggle (With "Teaser" Logic)
  const handleProModeToggle = async () => {
    if (!user) {
      alert("🔒 PRO FEATURE: Sign up for a free account to unlock AI Storytelling Mode!");
      return;
    }
    // Future: Add check here for 'starter' tier to upsell to 'pro'
    
    const newMode = !isProMode;
    setIsProMode(newMode);
    if (selectedFile) {
      await runAIAnalysis(selectedFile, activePlatform, newMode);
    }
  };

  // 📋 Copy Code Function
  const handleCopyCode = () => {
    navigator.clipboard.writeText(description);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  
  // 3. SAVE FUNCTION
  const handleGenerateAndSave = async () => {
    if (!user) {
      alert("Please log in to save listings!");
      return;
    }
    if (!title) {
      alert("Please enter a title first.");
      return;
    }

    setLoading(true);

    try {
      const listingData = {
        title,
        brand,
        description,
        condition,
        estimated_price: price,
        tags: tags,
        platform: activePlatform
      };

      await saveListingToInventory(listingData, selectedFile);

      setShowSuccess(true);
      setTimeout(() => {
        window.location.hash = '/inventory';
      }, 1500);

    } catch (error: any) {
      console.error('Error saving listing:', error);
      alert('Error saving: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 pt-20 px-4 sm:px-6 lg:px-8 relative">
      
      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl shadow-2xl shadow-blue-900/20 flex items-center gap-4 border border-slate-700">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-[#0F172A] shadow-lg shadow-green-500/20">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <div>
              <h4 className="font-bold text-lg">Listing Saved!</h4>
              <p className="text-slate-400 text-xs font-medium">Redirecting to Inventory...</p>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span>
            Listing Command Center
          </h1>
          <p className="text-slate-500 mt-1">Upload photos to generate optimized listings instantly.</p>
        </div>
        <div className="flex items-center gap-4">
           {/* PRO MODE TOGGLE (Teaser Mode) */}
           {activePlatform === 'ebay' && (
             <button 
               onClick={handleProModeToggle}
               className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border ${
                 isProMode 
                   ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg' 
                   : user 
                     ? 'bg-white text-slate-500 border-slate-200 hover:border-slate-300' // Logged in but OFF
                     : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-70' // Visitor (Locked)
               }`}
             >
               {!user && <span className="text-xs">🔒</span>}
               <span className={`w-2 h-2 rounded-full ${isProMode ? 'bg-green-400 animate-pulse' : 'bg-slate-300'}`}></span>
               Pro Mode: {isProMode ? 'ON' : 'OFF'}
             </button>
           )}
           <div className="text-xs font-bold text-slate-400 uppercase tracking-wider bg-white px-4 py-2 rounded-lg border border-slate-100 shadow-sm">
             {imagePreview ? '1' : '0'} Photos • Target: <span className={`font-bold ml-1 ${
               activePlatform === 'ebay' ? 'text-blue-600' : 'text-slate-900'
             }`}>{activePlatform.toUpperCase()}</span>
           </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: DROP ZONE */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-6 relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Source Media</h3>
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-md">AI Vision Ready</span>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden" 
              accept="image/*"
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={onDragOver}
              onDrop={handleFileUpload}
              className={`border-2 border-dashed rounded-2xl h-[400px] flex flex-col items-center justify-center transition-all cursor-pointer relative overflow-hidden ${
                analyzing ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-400'
              }`}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <>
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  </div>
                  <p className="text-sm font-bold text-slate-700">Drop Photos Here</p>
                  <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, HEIC</p>
                </>
              )}

              {analyzing && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="font-bold text-blue-700 animate-pulse">Refining for {activePlatform.toUpperCase()}...</p>
                  <p className="text-xs text-blue-500">Optimizing SEO & Tone...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8">
            
            {/* PLATFORMS */}
            <div className="mb-8">
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Target Marketplace</label>
               <div className="flex flex-wrap gap-2">
                 {platforms.map((platform) => (
                   <button
                     key={platform.id}
                     onClick={() => handlePlatformChange(platform.id)}
                     className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all border ${
                       activePlatform === platform.id
                         ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md transform scale-105'
                         : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                     }`}
                   >
                     <span className={`w-2 h-2 rounded-full ${activePlatform === platform.id ? 'bg-white' : platform.color}`}></span>
                     {platform.label}
                   </button>
                 ))}
               </div>
            </div>

            {/* TITLE */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Listing Title</label>
                <span className={`text-xs font-bold ${title.length > (activePlatform === 'poshmark' ? 50 : 80) ? 'text-red-500' : 'text-slate-400'}`}>
                   {title.length} / {activePlatform === 'poshmark' ? '50' : '80'}
                </span>
              </div>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 font-medium text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
                placeholder="Upload a photo to generate title..."
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

            {/* PRICE ESTIMATE */}
            <div className="mb-6">
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">AI Estimated Price</label>
               <input 
                  type="text" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 font-bold focus:outline-none focus:border-emerald-500 transition-all placeholder:text-emerald-300"
                  placeholder="$0.00"
                />
            </div>

            {/* DESCRIPTION - SMART EDITOR FOR EBAY */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Description / Notes</label>
                 
                 {/* EBAY ONLY: Tabbed Interface */}
                 {activePlatform === 'ebay' && (
                    <div className="flex gap-2">
                       <div className="flex bg-slate-100 rounded-lg p-1">
                          <button onClick={() => setEditorTab('visual')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${editorTab === 'visual' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>Visual Preview</button>
                          <button onClick={() => setEditorTab('html')} className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase ${editorTab === 'html' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>HTML Source</button>
                       </div>
                       <button onClick={handleCopyCode} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 transition-all">
                          {copySuccess ? <span>✓ Copied</span> : <><span>📋</span> Copy Code</>}
                       </button>
                    </div>
                 )}
              </div>

              {activePlatform === 'ebay' ? (
                // EBAY SMART EDITOR
                <div className="relative">
                   {editorTab === 'visual' ? (
                      <div 
                         className="w-full bg-white border border-slate-200 rounded-xl px-4 py-4 h-64 overflow-y-auto prose prose-sm max-w-none"
                         dangerouslySetInnerHTML={{ __html: description || '<p class="text-slate-400 italic">Generated listing will appear here...</p>' }}
                      ></div>
                   ) : (
                      <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-slate-900 text-green-400 font-mono text-sm border border-slate-700 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 h-64 resize-none"
                        placeholder="<html>...</html>"
                      ></textarea>
                   )}
                </div>
              ) : (
                // STANDARD EDITOR (Poshmark, Mercari, etc)
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-medium text-slate-900 focus:outline-none focus:border-blue-500 transition-all placeholder:text-slate-400 h-32 resize-none"
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
              {loading ? "Uploading & Saving..." : analyzing ? `Optimizing for ${activePlatform.toUpperCase()}...` : `Save ${platforms.find(p => p.id === activePlatform)?.label} Listing`}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderPage;
