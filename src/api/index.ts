/**
 * 统一 API 接口 - C 端用户
 */
import { get, post, put, del } from '@/utils/request'
import type {
  LoginVO,
  UserVO,
  AddressVO,
  AddressDTO,
  PageResult,
  PageResultBackend,
  MerchantVO,
  MerchantCardVO,
  MerchantCategoryVO,
  DishVO,
  DishCategoryVO,
  CartVO,
  CartItemVO,
  OrderVO,
  OrderCreateVO,
  PaymentVO,
  RefundVO,
  DeliveryVO,
  ReviewVO,
  CouponVO,
} from '@/types/api'
import {
  addressDtoToVo,
  addressListDtoToVo,
  addressVoToDto,
  pageBackendToFrontend,
  merchantListVoToCard,
} from '@/utils/dataTransform'

// ==================== 认证 ====================
export const sendSmsCode = (phone: string, scene: string = 'LOGIN') =>
  post('/api/user/auth/sms-code', { phone, scene })

export const smsLogin = (phone: string, code: string): Promise<LoginVO> =>
  post('/api/user/auth/login/sms', { phone, code })

export const passwordLogin = (phone: string, password: string): Promise<LoginVO> =>
  post('/api/user/auth/login/password', { phone, password })

export const refreshToken = (refreshToken: string) =>
  post('/api/user/auth/refresh', { refreshToken })

export const logout = () => post('/api/user/auth/logout')

// ==================== 用户 ====================
export const getUserProfile = (): Promise<UserVO> => get('/api/user/profile')

export const updateUserProfile = (data: Partial<UserVO>) => put('/api/user/profile', data)

export const updatePassword = (data: { oldPassword: string; newPassword: string }) =>
  put('/api/user/profile/password', data)

// ==================== 收货地址 ====================
export const getAddressList = async (): Promise<AddressVO[]> => {
  const list = await get<AddressDTO[]>('/api/user/addresses')
  return addressListDtoToVo(list)
}

export const getAddressDetail = async (id: number): Promise<AddressVO> => {
  const dto = await get<AddressDTO>(`/api/user/addresses/${id}`)
  return addressDtoToVo(dto)
}

export const getDefaultAddress = () => get<AddressDTO>('/api/user/addresses/default')

export const addAddress = (data: Partial<AddressVO>) =>
  post('/api/user/addresses', addressVoToDto(data))

export const updateAddress = (id: number, data: Partial<AddressVO>) =>
  put(`/api/user/addresses/${id}`, addressVoToDto(data))

export const deleteAddress = (id: number) => del(`/api/user/addresses/${id}`)

export const setDefaultAddress = (id: number) => put(`/api/user/addresses/${id}/default`)

// ==================== 商家 ====================
export const getMerchantCategories = () => get<MerchantCategoryVO[]>('/api/user/merchants/categories')

export interface MerchantPageParams {
  current?: number
  size?: number
  categoryId?: number
  keyword?: string
}

export const getMerchantPage = async (params: MerchantPageParams): Promise<PageResult<MerchantCardVO>> => {
  const backend = await get<PageResultBackend<MerchantVO>>('/api/user/merchants', params)
  const page = pageBackendToFrontend(backend)
  return { ...page, list: merchantListVoToCard(page.list) }
}

export const getMerchantDetail = (id: number) => get<MerchantVO>(`/api/user/merchants/${id}`)

export const getMerchantMenu = (id: number) => get<DishCategoryVO[]>(`/api/user/merchants/${id}/menu`)

export const getMerchantReviews = (merchantId: number, params?: { current?: number; size?: number }) =>
  get<PageResult<ReviewVO>>(`/api/user/merchants/${merchantId}/reviews`, params)

// ==================== 菜品 ====================
export const getDishDetail = (id: number) => get<DishVO>(`/api/user/dishes/${id}`)

export const getDishReviews = (dishId: number, params?: { current?: number; size?: number }) =>
  get<PageResult<ReviewVO>>(`/api/user/dishes/${dishId}/reviews`, params)

// ==================== 购物车 ====================
export const getCart = () => get<CartVO>('/api/user/cart')

export interface CartAddPayload {
  merchantId: number
  dishId: number
  specId?: number
  quantity: number
}

export const addToCart = (data: CartAddPayload) => post('/api/user/cart', data)

export interface CartUpdatePayload {
  quantity: number
}

export const updateCartItem = (id: number, data: CartUpdatePayload) => put(`/api/user/cart/${id}`, data)

export const removeCartItem = (id: number) => del(`/api/user/cart/${id}`)

export const clearCart = () => del('/api/user/cart')

// ==================== 订单 ====================
export interface OrderCreatePayload {
  merchantId: number
  addressId: number
  items: { dishId: number; specId?: number; quantity: number }[]
  userCouponId?: number
  remark?: string
  clientToken: string
}

export const createOrder = (data: OrderCreatePayload) =>
  post<OrderCreateVO>('/api/user/orders', data, { showLoading: true, loadingText: '提交中' })

export const getOrderPage = (params?: { status?: number; current?: number; size?: number }) =>
  get<PageResult<OrderVO>>('/api/user/orders', params)

export const getOrderDetail = (id: number | string) => get<OrderVO>(`/api/user/orders/${id}`)

export const cancelOrder = (id: number | string, reason: string) =>
  post(`/api/user/orders/${id}/cancel`, { reason })

export const confirmReceive = (id: number | string) => post(`/api/user/orders/${id}/confirm`)

export const applyOrderRefund = (id: number | string, data: { reason: string; amount: number; images?: string[] }) =>
  createRefund({ orderId: id, ...data })

export const getOrderDelivery = (id: number | string) => get<DeliveryVO>(`/api/user/orders/${id}/delivery`)

// ==================== 支付 ====================
export const createPayment = (orderId: number | string, payType: number) =>
  post<PaymentVO>(`/api/user/payments/orders/${orderId}`, { payType }, { showLoading: true })

export const getPaymentStatus = (paymentNo: string) => get<PaymentVO>(`/api/user/payments/${paymentNo}`)

export const cancelPayment = (paymentNo: string) => post(`/api/user/payments/${paymentNo}/cancel`)

// ==================== 退款 ====================
export interface RefundCreatePayload {
  orderId: number | string
  reason: string
  amount: number
  images?: string[]
}

export const createRefund = (data: RefundCreatePayload) =>
  post<RefundVO>('/api/user/refunds', data)

export const getRefundList = (params?: { current?: number; size?: number }) =>
  get<PageResult<RefundVO>>('/api/user/refunds', params)

export const getRefundDetail = (id: number | string) => get<RefundVO>(`/api/user/refunds/${id}`)

export const cancelRefund = (id: number | string) => post(`/api/user/refunds/${id}/cancel`)

// ==================== 评价 ====================
export interface ReviewCreatePayload {
  orderId: number | string
  rating: number
  tasteScore?: number
  packingScore?: number
  deliveryScore?: number
  content?: string
  images?: string[]
  tags?: string[]
  anonymous?: number
}

export const createReview = (data: ReviewCreatePayload) => post('/api/user/reviews', data)

export const getMyReviews = (params?: { current?: number; size?: number }) =>
  get<PageResult<ReviewVO>>('/api/user/reviews', params)

// ==================== 优惠券 ====================
export const getAvailableCoupons = (): Promise<CouponVO[]> => get<CouponVO[]>('/api/user/coupons/available')

export const getMyCoupons = (status?: number) => get('/api/user/coupons', status !== undefined ? { status } : {})

export const receiveCoupon = (id: number) => post(`/api/user/coupons/${id}/receive`)

// ==================== 收藏 ====================
export const getFavorites = async (params?: { current?: number; size?: number }): Promise<PageResult<MerchantCardVO>> => {
  const backend = await get<PageResultBackend<MerchantVO>>('/api/user/favorites', params)
  const page = pageBackendToFrontend(backend)
  return { ...page, list: merchantListVoToCard(page.list) }
}

export const addFavorite = (merchantId: number) => post(`/api/user/favorites/${merchantId}`)

export const removeFavorite = (merchantId: number) => del(`/api/user/favorites/${merchantId}`)

export const isFavorite = (merchantId: number) => get<boolean>(`/api/user/favorites/${merchantId}/status`)

// ==================== 消息 ====================
export const getMessageList = (params: any) => get('/api/user/messages', params)

export const markMessageRead = (id: number) => put(`/api/user/messages/${id}/read`)

export const markAllMessagesRead = () => put('/api/user/messages/read-all')

// ==================== 导出类型别名（兼容旧代码） ====================
export type { CartItemVO }
