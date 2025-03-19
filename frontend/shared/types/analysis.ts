import { AnalysisType } from '@/types/prisma';

// 分析结果基础接口
export interface Analysis {
  id: string;
  userId: string;
  orderId: string;
  type: AnalysisType;
  content: AnalysisContent;
  createdAt: Date;
  updatedAt: Date;
}

// 分析内容基础接口
export interface AnalysisContent {
  question: string;
  result: string;
  recommendations: string;
  metadata: any;
}

// 八字分析内容
export interface BaziAnalysisContent extends AnalysisContent {
  metadata: {
    year: number;
    month: number;
    day: number;
    hour: number;
    gender: 'MALE' | 'FEMALE';
    baziChart: {
      year: {
        heavenlyStem: string;
        earthlyBranch: string;
        element: string;
      };
      month: {
        heavenlyStem: string;
        earthlyBranch: string;
        element: string;
      };
      day: {
        heavenlyStem: string;
        earthlyBranch: string;
        element: string;
      };
      hour: {
        heavenlyStem: string;
        earthlyBranch: string;
        element: string;
      };
    };
    fiveElements: {
      wood: number;
      fire: number;
      earth: number;
      metal: number;
      water: number;
    };
    luckyElements: string[];
    unluckyElements: string[];
  };
}

// 塔罗牌分析内容
export interface TarotAnalysisContent extends AnalysisContent {
  spread: string;
  cards: TarotCard[];
  interpretation: string;
  advice: string;
}

// 塔罗牌
export interface TarotCard {
  name: string;
  position: string;
  image: string;
  isReversed: boolean;
  meaning: string;
}

// 面相分析内容
export interface FaceAnalysisContent extends AnalysisContent {
  metadata: {
    imageUrl: string;
    faceFeatures: {
      forehead: string;
      eyes: string;
      nose: string;
      mouth: string;
      chin: string;
      ears: string;
    };
    analysis: {
      personality: string;
      career: string;
      relationships: string;
      health: string;
      wealth: string;
    };
  };
}

// 手相分析内容
export interface PalmAnalysisContent extends AnalysisContent {
  metadata: {
    imageUrl: string;
    palmFeatures: {
      lifeLineDescription: string;
      heartLineDescription: string;
      headLineDescription: string;
      fateLineDescription: string;
      sunLineDescription: string;
    };
    analysis: {
      lifeEnergy: string;
      emotionalLife: string;
      intellectualCapacity: string;
      careerPath: string;
      success: string;
    };
  };
}

// 解梦内容
export interface DreamAnalysisContent extends AnalysisContent {
  metadata: {
    dreamSymbols: string[];
    dreamThemes: string[];
    emotionalContext: string;
    interpretation: string;
    advice: string;
  };
}

// 姓名分析内容
export interface NameAnalysisContent extends AnalysisContent {
  metadata: {
    name: string;
    nameCharacters: {
      character: string;
      strokes: number;
      meaning: string;
    }[];
    totalStrokes: number;
    nameNumerology: {
      destinyNumber: number;
      destinyMeaning: string;
    };
    analysis: {
      personality: string;
      career: string;
      relationships: string;
      lifeJourney: string;
    };
  };
}

// 心理测试内容
export interface PsychologyAnalysisContent extends AnalysisContent {
  metadata: {
    testType: string;
    questions: {
      question: string;
      answer: string;
      score: number;
    }[];
    totalScore: number;
    result: {
      category: string;
      description: string;
      traits: string[];
      advice: string[];
    };
  };
}

export interface BaziAnalysisData {
  year: number;
  month: number;
  day: number;
  hour: number;
  gender: string;
  question: string;
}

export interface FaceAnalysisData {
  imageUrl: string;
  gender: string;
  age: number;
}

export interface AnalysisResponse {
  success: boolean;
  analysisId?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
} 