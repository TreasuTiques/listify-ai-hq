import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    // FIX: Main Background with '!' to force override
    <div className="!bg-white dark:!bg-slate-900 min-h-screen pb-32 transition-colors duration-300">
      {/* Header */}
      <section className="pt-24 pb-16 px-4 text-center max-w-4xl mx-auto border-b border-slate-100 dark:border-slate-800">
        <div className="inline-block px-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-4">
          Last Updated: May 2024
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          We hate legalese as much as you do. Here is a simple, honest breakdown of how we handle your data at  .
        </p>
      </section>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 mt-20 space-y-16">
        
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">The Short Version</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              is a tool built to help you clear your "death pile" and sell more on eBay. To do that, we need to handle some of your data. Our promise is simple: <strong>We treat your data the way we want our own data treated.</strong> We don't sell it, we don't spy on you, and we don't make fake claims.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Information We Collect</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Account Info</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Your name and email address so you can log in and save your work.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Listing Content</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">The product photos you upload and the item details you type in.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Usage Data</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Basic info about how you use the app so we can fix bugs and make things faster.</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">Support Messages</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Any questions or feedback you send our way via email or chat.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How We Use Your Info</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            We use your data to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-300">
            <li>Keep the generator running and your listings saved.</li>
            <li>Answer your support questions when you hit a snag.</li>
            <li>Prevent bad actors from abusing our AI credits.</li>
            <li>Continually improve the accuracy of our AI's "vision."</li>
          </ul>
        </section>

        {/* FIX: Dark mode background changed to black to stay distinct */}
        <section className="bg-[#0F172A] dark:bg-black p-10 rounded-[32px] text-white transition-colors">
          <h2 className="text-2xl font-bold mb-6">What We DO NOT Do</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
              <p className="text-slate-300"><strong>We do not sell your data.</strong> Not to advertisers, not to other resellers, not to anyone.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
              <p className="text-slate-300"><strong>We do not claim ownership of your images.</strong> They are yours. We just process them.</p>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">✕</div>
              <p className="text-slate-300"><strong>We do not spam you.</strong> We only send emails related to your account or huge feature updates you'll actually care about.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">AI Processing Disclosure</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            When you upload a photo, it is processed by advanced AI models (including Google Gemini) to identify the product and its condition. This data is only used to generate your listing copy. It is not used to "train" a general AI on your private life or personal space.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 text-left">Your Rights & Control</h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
            You are in the driver's seat. At any time, you can:
          </p>
          <ul className="space-y-4">
            <li className="flex gap-3 text-slate-600 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>Access:</strong> Request a copy of all the data we have on you.</span>
            </li>
            <li className="flex gap-3 text-slate-600 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>Correction:</strong> Fix any info that is wrong in your profile.</span>
            </li>
            <li className="flex gap-3 text-slate-600 dark:text-slate-300">
              <span className="text-blue-600 dark:text-blue-400 font-bold">→</span>
              <span><strong>Deletion:</strong> Ask us to delete your account and all associated data. We will comply within 30 days.</span>
            </li>
          </ul>
        </section>

        <section className="border-t border-slate-100 dark:border-slate-800 pt-16 text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Questions?</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            We are here to help. If you have any concerns about your privacy, just shoot us an email.
          </p>
          <a href="mailto:privacy@Sellistio.com" className="text-[#2563EB] dark:text-blue-400 font-bold text-lg hover:underline underline-offset-4">
            privacy@Sellistio.com
          </a>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPage;
