export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-fortune-red"></div>
        <h2 className="text-xl font-medium text-gray-700">加载中...</h2>
        <p className="text-sm text-gray-500">请稍候，我们正在为您准备内容</p>
      </div>
    </div>
  );
} 