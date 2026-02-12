import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full py-10 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-6">
        
        <div className="text-center">
          <h2 className="text-2xl font-[Anton] tracking-wider mb-1">ARNAV MURDANDE</h2>
          <p className="text-gray-400 text-sm font-light">
            AI & Software Engineer
          </p>
        </div>

        {/* Contacts - Horizontal */}
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-gray-300">
          <a href="mailto:arnavmurdande@gmail.com" className="hover:text-teal-400 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            arnavmurdande@gmail.com
          </a>
          <span className="text-white/20 hidden md:inline">|</span>
          <a href="tel:+919702790802" className="hover:text-teal-400 transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            +91-9702790802
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
