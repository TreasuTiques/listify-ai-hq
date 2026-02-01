import React from 'react';

const TermsPage: React.FC = () => {
  return (
    // FIX: Main Background with '!' to force override
    <div className="!bg-white dark:!bg-slate-900 min-h-screen pb-32 font-sans transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto border-b border-slate-100 dark:border-slate-800">
        <div className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-full text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          Effective: May 2024
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          Terms of Use
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Welcome to  . These rules keep our platform safe and helpful for every reseller in our community.
        </p>
      </section>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 mt-20 space-y-20">
        
        {/* 1. Intro */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Agreement</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            By using  , you’re agreeing to these terms. If you don’t agree, that’s okay—but you won't be able to use the tool. We’ve written this in plain English because we believe you should actually understand the rules of the road.
          </p>
        </section>

        {/* 2. Eligibility */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">Who Can Use </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            You must be at least 18 years old (or the age of majority in your area) and legally allowed to enter into contracts to use our service. Basically, if you can legally have an eBay store, you can use .
          </p>
        </section>

        {/* 3. Acceptable Use */}
        <section className="bg-slate-50 dark:bg-slate-800 p-10 rounded-[32px] border border-slate-100 dark:border-slate-700 transition-colors">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Play Fair</h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6">To keep the HQ running smoothly, you agree not to:</p>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">1</div>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Don't lie.</strong> Don't use our AI to create intentionally misleading listings or hide defects.</p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">2</div>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Don't break the tech.</strong> No scraping, hacking, or trying to overload our servers.</p>
            </li>
            <li className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold text-xs">3</div>
              <p className="text-sm text-slate-600 dark:text-slate-300"><strong>Don't steal.</strong> Only upload photos you own or have permission to use.</p>
            </li>
          </ul>
        </section>

        {/* 4. AI Disclaimer */}
        <section className="border-l-4 border-amber-400 pl-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The "Robot Assistant" Disclaimer</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Our AI is very smart, but it’s still a robot. Occasionally, it might get a brand name wrong or miss a detail in a photo. 
          </p>
          <p className="text-slate-900 dark:text-white font-bold">
            CRITICAL: You are the human in charge. You must review and verify every listing before you post it to eBay or any other marketplace.  is not responsible for any marketplace strikes or buyer disputes resulting from unedited AI output.
          </p>
        </section>

        {/* 5. Affiliation */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">We Aren't eBay</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              is an independent tool. We are not affiliated with, endorsed by, or partnered with eBay, Etsy, Poshmark, or any other marketplace. We’re just fans of their platforms who wanted to make them easier to use.
          </p>
        </section>

        {/* 6. Payments & Plans */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Subscriptions & Payments</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            Our paid plans are subscription-based. You can cancel anytime. If you cancel, you'll still have access until the end of your current billing cycle. 
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Because we offer a generous Free plan to test the service, we generally do not offer refunds once a paid billing cycle has started.
          </p>
        </section>

        {/* 7. Intellectual Property */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">What’s Yours & What’s Ours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div className="p-6 border border-slate-100 dark:border-slate-700 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Yours</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">You keep 100% ownership of your photos and your finished listing descriptions.</p>
            </div>
            <div className="p-6 border border-slate-100 dark:border-slate-700 rounded-2xl">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Ours</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">We own the software, the logo, the code, and the specific AI workflows we built.</p>
            </div>
          </div>
        </section>

        {/* 8. Limitation of Liability */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">The Legal Safety Net</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
            To the maximum extent permitted by law,   is provided "as-is" without any warranties. We aren't liable for lost profits, missed sales, or any indirect damages that might happen while using our tool. We do our best to stay online 24/7, but we don't guarantee perfect uptime.
          </p>
        </section>

        {/* 9. Contact */}
        <section className="pt-16 border-t border-slate-100 dark:border-slate-800 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Still have questions?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            If something in here isn't clear, please reach out. We're happy to chat.
          </p>
          <a href="mailto:support@ Sellistio.com" className="bg-[#2563EB] dark:bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 dark:hover:bg-blue-500 transition-all inline-block shadow-lg">
            support@ Sellistio.com
          </a>
        </section>

      </div>
    </div>
  );
};

export default TermsPage;
