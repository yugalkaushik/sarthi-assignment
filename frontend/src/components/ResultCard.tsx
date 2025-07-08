'use client';

interface EmotionResponse {
  emotion: string;
  description: string;
  confidence: number;
  color: string;
  matched?: boolean;
}

interface ResultCardProps {
  result: EmotionResponse;
}

export default function ResultCard({ result }: ResultCardProps) {

  return (
    <div className="mt-8 animate-fadeIn">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-white">
            You're feeling {result.emotion}
          </h3>
          <span className="text-xs px-3 py-1 rounded-full bg-zinc-800 text-white border border-zinc-700">
            {Math.round(result.confidence * 100)}% match
          </span>
        </div>
        
        <p className="text-gray-300 text-base mb-6 leading-relaxed">
          {result.description}
        </p>
        
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5 mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Emotional insights</h4>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: result.color }}></div>
            <p className="text-white">Primary emotion: <span className="font-medium">{result.emotion}</span></p>
          </div>
          <p className="text-gray-400 text-sm mt-2">
            Understanding your emotions is the first step toward emotional intelligence.
          </p>
        </div>
      </div>
    </div>
  );
}
