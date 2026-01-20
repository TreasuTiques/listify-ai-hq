import React from 'react';

const BlogPage: React.FC = () => {
  // Placeholder Data for the UI
  const posts = [
    {
      title: "The 2026 Guide to eBay SEO",
      excerpt: "How to beat the algorithm with structured data and AI-generated keywords.",
      category: "Selling Tips",
      date: "Coming Soon",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Cross-Listing: Is it Worth the Hype?",
      excerpt: "We analyzed 10,000 sellers to see if multi-platform selling actually increases profit.",
      category: "Data Analysis",
      date: "Coming Soon",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Vintage vs. Modern: Sourcing Strategy",
      excerpt: "Where to find the best inventory in Q1 2026 to maximize your ROI.",
      category: "Sourcing",
      date: "Coming Soon",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Seller Resources</span>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] tracking-tight mt-4 mb-4">Insights for the Modern Reseller</h1>
          <p className="text-slate-500 text-lg">
            Expert guides, market data, and tips to help you scale your e-commerce business.
          </p>
        </div>

        {/* 2. Featured Card (The "Hero" Post) */}
        <div className="bg-[#0F172A] rounded-[32px] p-8 md:p-16 text-white relative overflow-hidden mb-20 shadow-2xl group cursor-pointer animate-in zoom-in-95 duration-700">
          {/* Background Glow Effect */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] opacity-20 -mr-20 -mt-20 group-hover:opacity-30 transition-opacity duration-500"></div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 font-bold tracking-wider text-sm uppercase mb-4 block">Featured Series</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">The AI Reseller Revolution</h2>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                We are preparing a deep-dive series on how Artificial Intelligence is changing the landscape of second-hand selling forever. Learn how to stay ahead of the curve.
              </p>
              <button className="bg-white text-[#0F172A] px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">
                Get Notified on Launch
              </button>
            </div>
            
            {/* Visual Decoration for Hero */}
            <div className="relative hidden md:block">
               <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl"></div>
               <img 
                 src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop" 
                 alt="AI Technology" 
                 className="relative rounded-2xl shadow-2xl border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500"
               />
            </div>
          </div>
        </div>

        {/* 3. Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {posts.map((post, i) => (
            <div key={i} className="group cursor-pointer flex flex-col h-full">
              <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[4/3] shadow-md">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
              </div>
              
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">{post.category}</span>
                <span className="text-xs text-slate-400 font-medium">• {post.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-4 flex-grow">
                {post.excerpt}
              </p>

              <div className="text-blue-600 text-sm font-bold group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-1">
                Read Article <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Newsletter Section */}
        <div className="bg-white border border-slate-200 rounded-[24px] p-8 md:p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Don't miss the next big trend.</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Join 2,000+ resellers getting weekly sourcing tips and market updates delivered to their inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <button className="bg-[#0F172A] text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors shadow-lg">
              Subscribe
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
