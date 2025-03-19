/**
 * 爻星阁API客户端
 * 用于前端与后端通信
 */

// API基础URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// 请求选项接口
interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

// 请求函数
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body,
    token,
  } = options;

  // 设置请求头
  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // 如果提供了token，添加到请求头
  if (token) {
    requestHeaders['Authorization'] = `Bearer ${token}`;
  }

  // 构建请求参数
  const config: RequestInit = {
    method,
    headers: requestHeaders,
  };

  // 添加请求体（如果有）
  if (body) {
    config.body = JSON.stringify(body);
  }

  // 发起请求
  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // 检查响应状态
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `请求失败: ${response.status} ${response.statusText}`
    );
  }

  // 解析响应内容
  return await response.json();
}

// API客户端
const apiClient = {
  // GET请求
  get: <T>(endpoint: string, options: Omit<RequestOptions, 'method' | 'body'> = {}) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  // POST请求
  post: <T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}) =>
    request<T>(endpoint, { ...options, method: 'POST', body }),

  // PUT请求
  put: <T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}) =>
    request<T>(endpoint, { ...options, method: 'PUT', body }),

  // PATCH请求
  patch: <T>(endpoint: string, body: any, options: Omit<RequestOptions, 'method'> = {}) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body }),

  // DELETE请求
  delete: <T>(endpoint: string, options: Omit<RequestOptions, 'method'> = {}) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default apiClient; 