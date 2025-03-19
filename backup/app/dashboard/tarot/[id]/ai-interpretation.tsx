'use client';

import TarotAIInterpretation from '@/components/tarot/TarotAIInterpretation';
import { TarotAnalysisContent } from '@/types/analysis';

interface TarotAIInterpretationWrapperProps {
  result: TarotAnalysisContent;
  userId: string;
}

export default function TarotAIInterpretationWrapper({ 
  result, 
  userId 
}: TarotAIInterpretationWrapperProps) {
  return (
    <TarotAIInterpretation 
      result={result} 
      userId={userId} 
    />
  );
} 