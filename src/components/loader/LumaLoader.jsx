import React from 'react';

export const LumaSessionLoader = () => (
  <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center transition-colors duration-300">
    <div className="relative flex items-center justify-center mb-6">
      <div className="w-20 h-20 border-4 border-[var(--accent)]/20 border-t-[var(--accent)] rounded-full animate-spin"></div>
      <span className="absolute text-xl font-bold tracking-widest text-[var(--primary)] font-['Poppins']">
        LUMA
      </span>
    </div>
    <h3 className="text-lg font-semibold text-[var(--primary)] font-['Poppins'] mb-1">
      Loading LUMA Dashboard
    </h3>
    <p className="text-sm text-[var(--muted)]">Please wait a moment...</p>
  </div>
);