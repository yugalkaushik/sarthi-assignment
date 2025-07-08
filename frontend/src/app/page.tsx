'use client';

import { useState } from 'react';
import EmotionForm from '@/components/EmotionForm';
import ResultCard from '@/components/ResultCard';
import ErrorMessage from '@/components/ErrorMessage';

interface EmotionResponse {
  emotion: string;
  description: string;
  confidence: number;
  color: string;
  matched?: boolean;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<EmotionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeEmotion = async (text: string) => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze emotion');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Error analyzing emotion:', err);
      setError('Failed to analyze your reflection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-6 bg-black text-white">
      <div className="z-10 w-full max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
          Say what you feel.
        </h1>
        
        <p className="text-center text-lg mb-10 text-gray-300 max-w-xl mx-auto">
          Discover your emotions and express them with clarity and confidence.
        </p>
        
        <div className="bg-zinc-900 rounded-xl shadow-2xl p-8 w-full border border-zinc-800">
          <h2 className="text-xl font-semibold mb-6 text-white">Reflect on your emotions</h2>
          
          <EmotionForm onSubmit={handleAnalyzeEmotion} isLoading={isLoading} />

          {error && <ErrorMessage message={error} />}
          {result && <ResultCard result={result} />}
        </div>

        <p className="mt-12 text-center text-sm text-gray-400">
          Using AI to help you understand your emotions better.
        </p>
      </div>
    </main>
  );
}
