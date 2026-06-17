/**
 * 统一 API 接口 - C 端用户
 */
import { get, post, put, del } from '@/utils/request'

// ==================== 认证 ====================
export const sendSmsCode = (phone: string, scene: string = 'LOGIN') =>
  post('/api/user/auth/sms-code', { phone, scene })

export const smsLogin = (phone: string, code: string) =>
  post('/api/user/auth/login/sms', { phone, code })

export const passwordLogin = (phone: string, password: string) =>
  post('/api/user/auth/login/password', { phone, password })

export const refreshToken = (refreshToken: string) =>
  post('/api/user/auth/refresh', { refreshToken })

export const logout = () => post('/api/user/auth/logout')

// ==================== 用户 ====================
export const getUserProfile = () => get('/api/user/profile')

export const updateUserProfile = (data: any) => put('/api/user/profile', data)

export const updatePassword = (data: any) => put('/api/user/auth/password', data)

// ==================== 收货地址 ====================
export const getAddressList = () => get('/api/user/addresses')

export const getDefaultAddress = () => get('/api/user/addresses/default')

export const addAddress = (data: any) => post('/api/user/addresses', data)

export const updateAddress = (id: number, data: any) => put(`/api/user/addresses/${id}`, data)

export const deleteAddress = (id: number) => del(`/api/user/addresses/${id}`)

export const setDefaultAddress = (id: number) => put(`/api/user/addresses/${id}/default`)

// ==================== 商家 ====================
export const getMerchantCategories = () => get('/api/user/merchants/categories')

export const getMerchantPage = (params: any) => get('/api/user/merchants', params)

export const getMerchantDetail = (id: number) => get(`/api/user/merchants/${id}`)

export const getMerchantMenu = (id: number) => get(`/api/user/merchants/${id}/menu`)

// ==================== 菜品 ====================
export const getDishDetail = (id: number) => get(`/api/user/dishes/${id}`)

// ==================== 购物车 ====================
export const getCart = () => get('/api/user/cart')

export const addToCart = (data: any) => post('/api/user/cart', data)

export const updateCartItem = (id: number, data: any) => put(`/api/user/cart/${id}`, data)

export const removeCartItem = (id: number) => del(`/api/user/cart/${id}`)

export const clearCart = () => del('/api/user/cart')

// ==================== 订单 ====================
export const createOrder = (data: any) => post('/api/user/orders', data, { showLoading: true, loadingText: '提交中' })

export const getOrderPage = (params: any) => get('/api/user/orders', params)

export const getOrderDetail = (id: number | string) => get(`/api/user/orders/${id}`)

export const cancelOrder = (id: number | string, reason: string) =>
  put(`/api/user/orders/${id}/cancel`, { reason })

export const confirmReceive = (id: number | string) => put(`/api/user/orders/${id}/confirm`)

export const getOrderTracking = (id: number | string) => get(`/api/user/orders/${id}/tracking`)

// ==================== 支付 ====================
export const createPayment = (data: any) => post('/api/user/payments', data, { showLoading: true })

export const getPaymentStatus = (id: number | string) => get(`/api/user/payments/${id}`)

// ==================== 退款 ====================
export const applyRefund = (data: any) => post('/api/user/refunds', data)

export const getRefundDetail = (id: number | string) => get(`/api/user/refunds/${id}`)

// ==================== 评价 ====================
export const createReview = (data: any) => post('/api/user/reviews', data)

export const getDishReviews = (dishId: number, params: any) => get(`/api/user/dishes/${dishId}/reviews`, params)

export const getMerchantReviews = (merchantId: number, params: any) => get(`/api/user/merchants/${merchantId}/reviews`, params)

// ==================== 优惠券 ====================
export const getAvailableCoupons = (params: any) => get('/api/user/coupons/available', params)

export const getMyCoupons = (status?: number) => get('/api/user/coupons', status !== undefined ? { status } : {})

export const receiveCoupon = (id: number) => post(`/api/user/coupons/${id}/receive`)

// ==================== 消息 ====================
export const getMessageList = (params: any) => get('/api/user/messages', params)

export const markMessageRead = (id: number) => put(`/api/user/messages/${id}/read`)

export const markAllMessagesRead = () => put('/api/user/messages/read-all')
