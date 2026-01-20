import React from 'react';

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Seller Resources</span>
          <h1 className="text-4xl font-bold text-[#0F172A] tracking-tight mt-4 mb-4">Insights for the Modern Reseller</h1>
          <p className="text-slate-500 text-lg">Coming soon: Expert guides and market data.</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
