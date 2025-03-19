import { prisma } from '@/lib/db/prisma';
import { AnalysisType } from '@/types/prisma';

/**
 * 创建分析记录
 * @param data 分析数据
 * @returns 创建的分析记录
 */
export async function createAnalysis({
  userId,
  type,
  question,
  result,
  recommendations,
  orderId,
  metadata
}: {
  userId: string;
  type: string;
  question: string;
  result: string;
  recommendations: string;
  orderId: string;
  metadata: any;
}) {
  try {
    const analysis = await prisma.analysis.create({
      data: {
        userId,
        type: type as AnalysisType,
        orderId,
        content: {
          question,
          result,
          recommendations,
          metadata
        },
      },
    });

    return analysis;
  } catch (error) {
    console.error('创建分析结果失败:', error);
    throw new Error('创建分析结果失败');
  }
}

/**
 * 获取用户分析记录列表
 * @param userId 用户ID
 * @param type 分析类型（可选）
 * @param page 页码
 * @param limit 每页数量
 * @returns 分析记录列表和总数
 */
export async function getUserAnalyses(userId: string, type?: string) {
  try {
    const where = {
      userId,
      ...(type ? { type: type as AnalysisType } : {}),
    };

    const analyses = await prisma.analysis.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        order: true,
      },
    });

    return { analyses };
  } catch (error) {
    console.error('获取用户分析历史失败:', error);
    throw new Error('获取用户分析历史失败');
  }
}

/**
 * 获取分析记录详情
 * @param analysisId 分析ID
 * @returns 分析记录详情
 */
export async function getAnalysisById(id: string) {
  try {
    const analysis = await prisma.analysis.findUnique({
      where: { id },
      include: {
        order: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    return analysis;
  } catch (error) {
    console.error('获取分析详情失败:', error);
    throw new Error('获取分析详情失败');
  }
}

/**
 * 更新分析记录
 * @param analysisId 分析ID
 * @param data 更新数据
 * @returns 更新后的分析记录
 */
export async function updateAnalysis(
  analysisId: string,
  data: {
    result?: string;
    recommendations?: string;
    metadata?: Record<string, any>;
  }
) {
  const analysis = await prisma.analysis.findUnique({
    where: { id: analysisId },
  });

  if (!analysis) {
    throw new Error('分析记录不存在');
  }

  const content = analysis.content as any;
  const updatedContent = {
    ...content,
    ...(data.result ? { result: data.result } : {}),
    ...(data.recommendations ? { recommendations: data.recommendations } : {}),
    ...(data.metadata ? { metadata: { ...content.metadata, ...data.metadata } } : {}),
  };

  return prisma.analysis.update({
    where: { id: analysisId },
    data: {
      content: updatedContent,
    },
  });
}

/**
 * 删除分析记录
 * @param analysisId 分析ID
 * @returns 删除结果
 */
export async function deleteAnalysis(id: string) {
  try {
    await prisma.analysis.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error('删除分析失败:', error);
    throw new Error('删除分析失败');
  }
}

/**
 * 获取最近的分析记录
 * @param userId 用户ID
 * @param limit 数量限制
 * @returns 最近的分析记录
 */
export async function getRecentAnalyses(limit: number = 5) {
  try {
    const analyses = await prisma.analysis.findMany({
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    return { analyses };
  } catch (error) {
    console.error('获取最近分析结果失败:', error);
    throw new Error('获取最近分析结果失败');
  }
}

/**
 * 获取分析统计数据
 * @returns 分析统计数据
 */
export async function getAnalyticsStats() {
  try {
    const totalAnalyses = await prisma.analysis.count();
    
    const analysesByType = await prisma.analysis.groupBy({
      by: ['type'],
      _count: {
        type: true,
      },
    });
    
    const recentTrend = await prisma.analysis.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 7,
    });

    return {
      totalAnalyses,
      analysesByType,
      recentTrend,
    };
  } catch (error) {
    console.error('获取分析统计数据失败:', error);
    throw new Error('获取分析统计数据失败');
  }
} 