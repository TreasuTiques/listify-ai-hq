import React, { useState, useRef, useCallback, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Listing {
  id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  platforms: string[];
  status: 'draft' | 'published';
}

interface ListingFormProps {
  initialListing?: Listing;
  onSave: (listing: Listing) => void;
  onCancel: () => void;
}

interface ValidationErrors {
  title?: string;
  description?: string;
  price?: string;
  category?: string;
  platforms?: string;
}

export default function ListingForm({ initialListing, onSave, onCancel }: ListingFormProps) {
  const [listing, setListing] = useState<Listing>(
    initialListing || {
      title: '',
      description: '',
      price: 0,
      category: '',
      images: [],
      platforms: [],
      status: 'draft',
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [imageUploading, setImageUploading] = useState(false);
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Keyboard shortcut for save (Cmd/Ctrl + S)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    if (!listing.title) return;
    const interval = setInterval(() => {
      localStorage.setItem('listing_draft', JSON.stringify(listing));
    }, 30000);
    return () => clearInterval(interval);
  }, [listing]);

  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};
    
    if (!listing.title || listing.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    
    if (!listing.description || listing.description.trim().length < 10) {
      errors.description = 'Description must be at least 10 characters';
    }
    
    if (listing.price <= 0) {
      errors.price = 'Price must be greater than 0';
    }
    
    if (!listing.category) {
      errors.category = 'Please select a category';
    }
    
    if (listing.platforms.length === 0) {
      errors.platforms = 'Please select at least one platform';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [listing]);

  const handleImageUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setImageUploading(true);
    setError('');
    const uploadedUrls: string[] = [];
    const totalFiles = files.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(`File ${file.name} is too large. Maximum size is 5MB.`);
        continue;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError(`File ${file.name} is not a valid image.`);
        continue;
      }

      const fileName = `${Date.now()}_${file.name}`;
      setUploadProgress(((i + 1) / totalFiles) * 100);
      
      const { data, error } = await supabase.storage
        .from('listings')
        .upload(fileName, file);

      if (error) {
        setError(`Failed to upload ${file.name}`);
        continue;
      }

      const { data: urlData } = supabase.storage
        .from('listings')
        .getPublicUrl(fileName);

      uploadedUrls.push(urlData.publicUrl);
    }

    setListing({ ...listing, images: [...listing.images, ...uploadedUrls] });
    setImageUploading(false);
    setUploadProgress(0);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageUpload(e.dataTransfer.files);
  }, [listing]);

  const removeImage = (index: number) => {
    const newImages = listing.images.filter((_, idx) => idx !== index);
    setListing({ ...listing, images: newImages });
  };

  const handlePlatformToggle = (platform: string) => {
    const platforms = listing.platforms.includes(platform)
      ? listing.platforms.filter(p => p !== platform)
      : [...listing.platforms, platform];
    
    setListing({ ...listing, platforms });
    if (validationErrors.platforms) {
      setValidationErrors({ ...validationErrors, platforms: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fix the validation errors before saving');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('listings')
        .upsert(listing)
        .select()
        .single();

      if (error) throw error;

      // Show success animation
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onSave(data);
      }, 1500);

      // Clear draft
      localStorage.removeItem('listing_draft');
    } catch (err) {
      setError('Failed to save listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickFill = () => {
    // AI-powered quick fill would go here
    setListing({
      ...listing,
      description: listing.description || 'This is a premium quality item in excellent condition.',
    });
  };

  const platforms = [
    { name: 'eBay', icon: '🛒', color: 'from-yellow-400 to-yellow-600' },
    { name: 'Amazon', icon: '📦', color: 'from-orange-400 to-orange-600' },
    { name: 'Etsy', icon: '🎨', color: 'from-pink-400 to-pink-600' },
    { name: 'Facebook Marketplace', icon: '👥', color: 'from-blue-400 to-blue-600' },
  ];

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Toys', 'Sports'];

  const completionPercentage = Math.round(
    ((listing.title ? 1 : 0) +
    (listing.description ? 1 : 0) +
    (listing.price > 0 ? 1 : 0) +
    (listing.category ? 1 : 0) +
    (listing.images.length > 0 ? 1 : 0) +
    (listing.platforms.length > 0 ? 1 : 0)) / 6 * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Success Animation Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center space-y-4 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Listing Saved!</h3>
            <p className="text-gray-600">Your listing has been successfully saved.</p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {initialListing ? 'Edit Listing' : 'Create New Listing'}
              </h1>
              <p className="text-gray-600 mt-2">Fill in the details to create your listing across multiple platforms</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-gray-500">Completion</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {completionPercentage}%
                </div>
              </div>
              <div className="relative w-16 h-16">
                <svg className="transform -rotate-90 w-16 h-16">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    className="text-gray-200"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - completionPercentage / 100)}`}
                    className="text-indigo-600 transition-all duration-500"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcut Hint */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-indigo-100 text-sm text-gray-600">
            <span>💡 Pro tip:</span>
            <kbd className="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">⌘ S</kbd>
            <span>to save quickly</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('edit')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'edit'
                ? 'bg-white shadow-lg shadow-indigo-100 text-indigo-600 scale-105'
                : 'bg-white/40 backdrop-blur-sm text-gray-600 hover:bg-white/60'
            }`}
          >
            ✏️ Edit Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
              activeTab === 'preview'
                ? 'bg-white shadow-lg shadow-indigo-100 text-indigo-600 scale-105'
                : 'bg-white/40 backdrop-blur-sm text-gray-600 hover:bg-white/60'
            }`}
          >
            👁️ Preview
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-xl p-4 backdrop-blur-sm animate-in slide-in-from-top duration-300">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError('')}
                className="ml-auto text-red-500 hover:text-red-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'edit' ? (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Main Content Card */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 space-y-6">
              {/* Title Field */}
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Listing Title <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-500">{listing.title.length}/100</span>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    value={listing.title}
                    onChange={(e) => {
                      setListing({ ...listing, title: e.target.value.slice(0, 100) });
                      if (validationErrors.title) {
                        setValidationErrors({ ...validationErrors, title: undefined });
                      }
                    }}
                    className={`w-full px-4 py-3.5 bg-white/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white ${
                      validationErrors.title ? 'border-red-300' : 'border-gray-200'
                    } hover:border-gray-300`}
                    placeholder="Enter a compelling title for your listing..."
                  />
                  {listing.title && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                {validationErrors.title && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center animate-in slide-in-from-top duration-200">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.title}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div className="group">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={handleQuickFill}
                      onMouseEnter={() => setShowTooltip('ai-assist')}
                      onMouseLeave={() => setShowTooltip(null)}
                      className="relative px-3 py-1 text-xs font-medium text-purple-600 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-300 hover:scale-105"
                    >
                      ✨ AI Assist
                      {showTooltip === 'ai-assist' && (
                        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap animate-in fade-in duration-200">
                          Generate description with AI
                          <div className="absolute top-full right-4 -mt-1 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </button>
                    <span className="text-xs text-gray-500">{listing.description.length}/2000</span>
                  </div>
                </div>
                <textarea
                  value={listing.description}
                  onChange={(e) => {
                    setListing({ ...listing, description: e.target.value.slice(0, 2000) });
                    if (validationErrors.description) {
                      setValidationErrors({ ...validationErrors, description: undefined });
                    }
                  }}
                  className={`w-full px-4 py-3.5 bg-white/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white resize-none ${
                    validationErrors.description ? 'border-red-300' : 'border-gray-200'
                  } hover:border-gray-300`}
                  rows={6}
                  placeholder="Describe your item in detail. Include condition, features, specifications, and why buyers should choose this listing..."
                />
                {validationErrors.description && (
                  <p className="mt-1.5 text-xs text-red-600 flex items-center animate-in slide-in-from-top duration-200">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.description}
                  </p>
                )}
              </div>

              {/* Price and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</div>
                    <input
                      type="number"
                      value={listing.price || ''}
                      onChange={(e) => {
                        setListing({ ...listing, price: parseFloat(e.target.value) || 0 });
                        if (validationErrors.price) {
                          setValidationErrors({ ...validationErrors, price: undefined });
                        }
                      }}
                      className={`w-full pl-10 pr-4 py-3.5 bg-white/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white ${
                        validationErrors.price ? 'border-red-300' : 'border-gray-200'
                      } hover:border-gray-300`}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                    />
                  </div>
                  {validationErrors.price && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center animate-in slide-in-from-top duration-200">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {validationErrors.price}
                    </p>
                  )}
                </div>

                {/* Category Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={listing.category}
                    onChange={(e) => {
                      setListing({ ...listing, category: e.target.value });
                      if (validationErrors.category) {
                        setValidationErrors({ ...validationErrors, category: undefined });
                      }
                    }}
                    className={`w-full px-4 py-3.5 bg-white/50 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 focus:bg-white ${
                      validationErrors.category ? 'border-red-300' : 'border-gray-200'
                    } hover:border-gray-300 cursor-pointer`}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {validationErrors.category && (
                    <p className="mt-1.5 text-xs text-red-600 flex items-center animate-in slide-in-from-top duration-200">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {validationErrors.category}
                    </p>
                  )}
                </div>
              </div>

              {/* Image Upload Section */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Product Images
                  <span className="ml-2 text-xs font-normal text-gray-500">(Max 5MB per image)</span>
                </label>
                
                {/* Drag & Drop Zone */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
                    isDragging
                      ? 'border-indigo-500 bg-indigo-50 scale-105'
                      : 'border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:border-indigo-400 hover:bg-indigo-50/50'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="hidden"
                  />
                  
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mb-4 transform transition-transform duration-300 hover:scale-110">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-base font-medium text-gray-700 mb-1">
                      {isDragging ? 'Drop images here' : 'Click to upload or drag and drop'}
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </div>

                  {imageUploading && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-xs text-center text-gray-600 mt-2">Uploading... {Math.round(uploadProgress)}%</p>
                    </div>
                  )}
                </div>

                {/* Image Preview Grid */}
                {listing.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {listing.images.map((img, idx) => (
                      <div
                        key={idx}
                        onMouseEnter={() => setHoveredImage(idx)}
                        onMouseLeave={() => setHoveredImage(null)}
                        className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <img
                          src={img}
                          alt={`Upload ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {hoveredImage === idx && (
                          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(idx);
                              }}
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-200 hover:scale-110"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        )}
                        {idx === 0 && (
                          <div className="absolute top-2 left-2 px-2 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg">
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Publish to Platforms <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {platforms.map(platform => {
                    const isSelected = listing.platforms.includes(platform.name);
                    return (
                      <button
                        key={platform.name}
                        type="button"
                        onClick={() => handlePlatformToggle(platform.name)}
                        className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-transparent bg-gradient-to-br ' + platform.color + ' text-white shadow-lg shadow-indigo-200 scale-105'
                            : 'border-gray-200 bg-white/50 text-gray-700 hover:border-gray-300 hover:bg-white hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`text-2xl ${isSelected ? 'scale-110' : ''} transition-transform duration-300`}>
                            {platform.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="font-semibold">{platform.name}</div>
                            <div className={`text-xs ${isSelected ? 'text-white/90' : 'text-gray-500'}`}>
                              {isSelected ? 'Selected' : 'Click to select'}
                            </div>
                          </div>
                          {isSelected && (
                            <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {validationErrors.platforms && (
                  <p className="mt-2 text-xs text-red-600 flex items-center animate-in slide-in-from-top duration-200">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.platforms}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 relative overflow-hidden group px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Save Listing</span>
                    </>
                  )}
                </div>
              </button>
              
              <button
                type="button"
                onClick={onCancel}
                className="px-8 py-4 bg-white/70 backdrop-blur-sm text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:bg-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          /* Preview Tab */
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Listing Preview</h2>
            
            <div className="space-y-6">
              {/* Preview Card */}
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-lg">
                {listing.images.length > 0 && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-gray-100">
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {listing.title || 'Your listing title will appear here'}
                </h3>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    ${listing.price.toFixed(2)}
                  </div>
                  {listing.category && (
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      {listing.category}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-700 whitespace-pre-wrap mb-6">
                  {listing.description || 'Your detailed description will appear here'}
                </p>
                
                {listing.platforms.length > 0 && (
                  <div>
                    <div className="text-sm font-semibold text-gray-700 mb-2">Available on:</div>
                    <div className="flex flex-wrap gap-2">
                      {listing.platforms.map(platform => (
                        <span key={platform} className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 rounded-lg text-sm font-medium border border-indigo-100">
                          {platform}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Info */}
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-xl p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      This is a preview of how your listing will appear. Switch to the Edit tab to make changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
