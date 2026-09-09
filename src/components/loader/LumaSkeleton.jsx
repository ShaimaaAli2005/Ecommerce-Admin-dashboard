import React from 'react';

export const LumaDashboardSkeleton = () => (
  <div className="p-6 bg-[var(--background)] min-h-screen animate-pulse">
    <div className="mb-6">
      <div className="h-4 w-28 bg-[var(--border)] rounded mb-2"></div>
      <div className="h-8 w-60 bg-[var(--border)] rounded"></div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-28 bg-[var(--white)] rounded-[16px] border border-[var(--border)]"></div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-72 bg-[var(--white)] rounded-[16px] border border-[var(--border)]"></div>
      <div className="h-72 bg-[var(--white)] rounded-[16px] border border-[var(--border)]"></div>
    </div>
  </div>
);