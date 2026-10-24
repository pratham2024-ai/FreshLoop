import React from 'react';
import { SearchX, RotateCcw } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
  resetText?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Matching Dishes Found',
  description = 'Try adjusting your dietary filter or search terms to explore other chef creations.',
  onReset,
  resetText = 'Clear All Filters'
}) => {
  return (
    <div className="py-16 px-6 text-center bg-white rounded-3xl border border-forest-900/10 shadow-sm max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-full bg-ivory-100 text-citrus-500 mx-auto flex items-center justify-center mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="font-serif text-2xl font-bold text-forest-900 mb-2">{title}</h3>
      <p className="text-sm text-charcoal-600 mb-6 leading-relaxed max-w-sm mx-auto">
        {description}
      </p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 text-ivory-50 text-xs font-semibold hover:bg-forest-800 transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-citrus-400" />
          <span>{resetText}</span>
        </button>
      )}
    </div>
  );
};
