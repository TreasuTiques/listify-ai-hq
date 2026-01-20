import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Contact Support</h1>
          <p className="text-slate-500 mt-2">
            Have a question about your subscription or a technical issue? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-[#0F172A]">Email Us</h3>
              <p className="text-sm text-slate-500 mt-1">support@listifyaihq.com</p>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            {submitted ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-bold text-[#0F172A]">Message Sent!</h3>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-bold text-blue-600">Send another</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message</label>
                  <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm h-32" placeholder="How can we help?"></textarea>
                </div>
                <button className="w-full bg-[#0F172A] text-white py-3 rounded-xl font-bold">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
