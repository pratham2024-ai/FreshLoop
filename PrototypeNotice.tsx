import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';

export const PrototypeNotice: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-forest-900 text-ivory-100 text-xs py-2 px-4 border-b border-forest-800 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-citrus-500/20 text-citrus-400 flex-shrink-0">
            <Sparkles className="w-3 h-3" />
          </span>
          <p className="truncate">
            <strong className="font-semibold text-ivory-50">Interactive Prototype:</strong> All catalogue prices, menu filters, and quiz rules are fully functional. No real charges will be made.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-forest-800 text-sage-200 border border-forest-700 font-mono text-[10px]">
            Supabase & Razorpay Ready
          </span>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss prototype notice"
            className="text-sage-400 hover:text-ivory-50 transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
