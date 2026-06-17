/**
 * 统一 API 请求封装 - 微信小程序 / H5 / App 通用
 * 基于 Promise 化的 uni.request
 */

const BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080'

export interface ApiResult<T = any> {
  code: number
  message: string
  data: T
}

export interface ApiOptions {
  url: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  data?: any
  header?: Record<string, string>
  showLoading?: boolean
  loadingText?: string
}

const TOKEN_KEY = 'wzz_token'

export const getToken = () => uni.getStorageSync(TOKEN_KEY) || ''
export const setToken = (t: string) => uni.setStorageSync(TOKEN_KEY, t)
export const clearToken = () => uni.removeStorageSync(TOKEN_KEY)

/**
 * 核心请求方法
 */
export function request<T = any>(options: ApiOptions): Promise<T> {
  const { url, method = 'GET', data, header = {}, showLoading = false, loadingText = '加载中' } = options

  if (showLoading) uni.showLoading({ title: loadingText, mask: true })

  const token = getToken()
  return new Promise<T>((resolve, reject) => {
    uni.request({
      url: url.startsWith('http') ? url : BASE_URL + url,
      method,
      data,
      header: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...header
      },
      success: (res: any) => {
        if (showLoading) uni.hideLoading()
        const body: ApiResult<T> = res.data || {}
        if (body.code === 200) {
          resolve(body.data)
        } else if (body.code === 401 || body.code === 10004) {
          // 登录态失效
          clearToken()
          uni.removeStorageSync('wzz_user_info')
          uni.showToast({ title: '请重新登录', icon: 'none' })
          setTimeout(() => uni.reLaunch({ url: '/pages/login/login' }), 800)
          reject(body)
        } else {
          uni.showToast({ title: body.message || '请求失败', icon: 'none' })
          reject(body)
        }
      },
      fail: (err) => {
        if (showLoading) uni.hideLoading()
        uni.showToast({ title: '网络异常', icon: 'none' })
        reject(err)
      }
    })
  })
}

/**
 * GET 请求便捷方法
 */
export const get = <T = any>(url: string, data?: any, opts: Partial<ApiOptions> = {}) =>
  request<T>({ url, method: 'GET', data, ...opts })

/**
 * POST 请求便捷方法
 */
export const post = <T = any>(url: string, data?: any, opts: Partial<ApiOptions> = {}) =>
  request<T>({ url, method: 'POST', data, ...opts })

/**
 * PUT 请求便捷方法
 */
export const put = <T = any>(url: string, data?: any, opts: Partial<ApiOptions> = {}) =>
  request<T>({ url, method: 'PUT', data, ...opts })

/**
 * DELETE 请求便捷方法
 */
export const del = <T = any>(url: string, data?: any, opts: Partial<ApiOptions> = {}) =>
  request<T>({ url, method: 'DELETE', data, ...opts })
