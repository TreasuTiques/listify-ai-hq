import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="!bg-white dark:!bg-slate-900 min-h-screen pb-32 font-sans transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto border-b border-slate-100 dark:border-slate-800">
        <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          Effective: February 2026
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          Community Standards
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Built by veteran resellers for the power-seller community. These standards ensure a professional and efficient environment for all our users.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 mt-20 space-y-20">
        
        {/* 1. Intro - SOFTENED TONE */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How We Work Together</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            By using Sellistio, you’re joining a community of professional sellers who agree to a high standard of quality and fairness. We’ve drafted these guidelines in plain language because, as fellow business owners, we believe in transparency and mutual respect.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">Professional Eligibility</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Sellistio is designed for professional e-commerce use. If you are operating a marketplace store, you are responsible for ensuring your use of our tool complies with those platforms' specific rules.
          </p>
        </section>

        {/* 3. Acceptable Use */}
        <section className="bg-slate-50 dark:bg-slate-800 p-10 rounded-[32px] border border-slate-100 dark:border-slate-700 transition-colors">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">The Professional Standard</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">To maintain the integrity of our listing engine, you agree to the following:</p>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">1</div>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Accuracy Matters.</strong> Do not use our tool to generate intentionally misleading descriptions or to hide significant product defects.</p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">2</div>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>System Integrity.</strong> Any attempt to scrape, reverse-engineer, or overload our AI processing infrastructure is strictly prohibited.</p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">3</div>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Content Rights.</strong> Only upload product photography that you own or have the explicit legal right to use for commercial listings.</p>
            </li>
          </ul>
        </section>

        {/* 4. AI Disclaimer - SECRET SAUCE PROTECTED */}
        <section className="border-l-4 border-blue-600 pl-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The "Human-in-the-Loop" Rule</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Sellistio utilizes a proprietary multi-model AI vision engine to analyze your products. While our technology is optimized for Cassini-ready SEO and technical accuracy, AI can occasionally miss a nuance or specific defect.
          </p>
          <p className="text-slate-900 dark:text-white font-bold">
            YOUR ROLE: You are the pro. You are required to verify all item specifics and descriptions before publishing. Sellistio provides the speed and optimization, but you provide the final quality control to avoid marketplace disputes.
          </p>
        </section>

        {/* 5. Affiliation - UPDATED VALUE WORDING */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Independent Power Tool</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Sellistio is an independent platform built by resellers. We are not affiliated with marketplace giants; we simply built the tool we always wanted—one that makes listing items faster, more efficient, and mathematically optimized for search algorithms.
          </p>
        </section>

        {/* 6. Payments & Plans */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Billing & Subscriptions</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Our paid tiers are billed on a subscription basis and can be managed via your dashboard. Access continues until the end of the current billing cycle.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Because our Free tier allows for extensive testing of our proprietary vision engine, we do not typically offer refunds once a paid cycle has commenced.
          </p>
        </section>

        {/* 7. Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">Ownership and Assets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="p-6 border border-slate-100 dark:border-slate-700 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Reseller Assets</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">You maintain 100% ownership of your inventory photos and the descriptions generated by our tool.</p>
            </div>
            <div className="p-6 border border-slate-100 dark:border-slate-700 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Sellistio Assets</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">We retain ownership of all code, custom AI workflows, proprietary branding, and software architecture.</p>
            </div>
          </div>
        </section>

        {/* 8. Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">The Legal Safety Net</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            To the maximum extent permitted by law, Sellistio is provided "as-is." While we strive for 100% uptime and professional-grade accuracy, we do not guarantee uninterrupted service. We are not liable for lost profits or indirect business damages.
          </p>
        </section>

        {/* 9. Contact */}
        <section className="pt-16 border-t border-slate-100 dark:border-slate-800 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Need Clarification?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Sellistio is built for the reselling community. If you have questions about these standards, our support team is ready to help.
          </p>
          <a href="mailto:support@sellistio.com" className="bg-[#2563EB] dark:bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 dark:hover:bg-blue-500 transition-all inline-block shadow-lg">
            support@sellistio.com
          </a>
        </section>

      </div>
    </div>
  );
};

export default TermsPage;
