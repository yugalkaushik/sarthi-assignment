'use client';

import { useState } from 'react';

interface EmotionFormProps {
  onSubmit: (text: string) => Promise<void>;
  isLoading: boolean;
}

export default function EmotionForm({ onSubmit, isLoading }: EmotionFormProps) {
  const [reflection, setReflection] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reflection.trim()) {
      await onSubmit(reflection);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <label htmlFor="reflection" className="block text-base font-medium text-white mb-2">
          I'm feeling...
        </label>
        <textarea
          id="reflection"
          rows={5}
          className="w-full px-4 py-3 text-white border-2 bg-black border-zinc-800 rounded-lg 
                    focus:outline-none focus:border-white
                    transition-all duration-300 placeholder-gray-500 text-base"
          placeholder="Share your thoughts or feelings here..."
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-3 font-medium rounded-md
                   transition-all duration-300
                   ${isLoading ? 
                     'bg-zinc-800 text-white cursor-not-allowed' : 
                     'bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                   }`}
      >
        <span className="flex items-center justify-center">
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Reflect on my emotion'
          )}
        </span>
      </button>
    </form>
  );
}
