import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="!bg-white dark:!bg-slate-900 min-h-screen pb-32 transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto border-b border-slate-100 dark:border-slate-800">
        <div className="inline-block px-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          Last Updated: February 2026
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Built by veteran resellers for the next generation of power sellers. We protect your business intelligence like it's our own.
        </p>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 mt-20 space-y-16">
        
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">The Reseller's Promise</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Sellistio was founded by a veteran high-volume collectibles seller who understands that sourcing secrets are the backbone of your business. Our promise is absolute: <strong>Your sourcing data and photos are used to build your listings, never to compete with your store or harvest your secrets.</strong>
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">The Competitive Edge: Secured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Cassini Intelligence</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">We extract Item Specifics specifically to boost your search ranking, keeping your SEO data private.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Category Authority</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Our AI is optimized for high-value collectibles and antiques, ensuring professional-grade accuracy.</p>
            </div>
          </div>
        </section>

        {/* Strategic Audit Trust Section */}
        <section className="bg-[#0F172A] dark:bg-black p-10 rounded-[32px] text-white transition-colors">
          <h2 className="text-2xl font-bold mb-6">Reseller Data Protection</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">✓</div>
              <p className="text-slate-300"><strong>No Data Harvesting.</strong> We never sell your sourcing habits, item locations, or profit margins to third parties.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">✓</div>
              <p className="text-slate-300"><strong>100% Ownership.</strong> You retain full rights to all images and generated descriptions. We are your tool, not your partner.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">✓</div>
              <p className="text-slate-300"><strong>Secure AI Processing.</strong> We utilize the Gemini API for professional-grade vision processing. Your data is not used to train public models.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">Your Rights</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Professional sellers demand control over their digital footprint. At any time, you may:
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3 text-slate-600 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>Instant Deletion:</strong> Request full removal of your account and listing history.</span>
            </li>
            <li className="flex gap-3 text-slate-600 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>Data Export:</strong> Download your listing history for use across any e-commerce platform.</span>
            </li>
          </ul>
        </section>

        <section className="border-t border-slate-100 dark:border-slate-800 pt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Questions?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Sellistio is built by the reselling community for the reselling community. For all privacy inquiries, reach out to our team.
          </p>
          <a href="mailto:support@sellistio.com" className="text-[#2563EB] dark:text-blue-400 font-bold text-lg hover:underline underline-offset-4">
            support@sellistio.com
          </a>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPage;
