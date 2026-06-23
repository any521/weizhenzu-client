/**
 * 通用 API 类型定义
 */

/** 通用接口返回结构 */
export interface ApiResult<T = any> {
  code: number
  message: string
  data: T
}

/** 前端分页查询返回结构（list/pageNum/pageSize） */
export interface PageResult<T> {
  list: T[]
  total: number
  pageNum: number
  pageSize: number
  pages?: number
}

/** 后端原始分页结构（records/current/size） */
export interface PageResultBackend<T> {
  records: T[]
  total: number
  current: number
  size: number
  pages?: number
}

/** 登录成功返回（与后端 LoginVO 保持一致） */
export interface LoginVO {
  token: string
  refreshToken: string
  userId: number
  nickname: string
  avatar?: string
  userType?: number
}

/** 用户信息（前端展示用） */
export interface UserVO {
  id: number
  nickname: string
  phone?: string
  avatar?: string
  vip?: string
  level?: string
  stats?: Record<string, number>
}

/** 收货地址（前端展示用） */
export interface AddressVO {
  id: number
  name: string
  phone: string
  region: string
  address: string
  tag?: string
  default?: boolean
}

/** 收货地址请求 DTO（与后端 AddressDTO 保持一致） */
export interface AddressDTO {
  id?: number
  contactName: string
  contactPhone: string
  province: string
  city: string
  district: string
  detail: string
  longitude?: number
  latitude?: number
  tag?: string
  isDefault?: number
}

/** 商家分类 */
export interface MerchantCategoryVO {
  id: number
  name: string
  icon?: string
}

/** 商家促销标签 */
export interface PromoItem {
  type: number
  text: string
}

/** 商家信息（后端 MerchantVO 映射） */
export interface MerchantVO {
  id: number
  name: string
  logo?: string
  categoryId?: number
  categoryName?: string
  description?: string
  notice?: string
  province?: string
  city?: string
  district?: string
  address?: string
  longitude?: number
  latitude?: number
  deliveryRadius?: number
  minOrderAmount?: number
  deliveryFee?: number
  packingFee?: number
  openTime?: string
  isOpen?: number
  status?: number
  rating?: number
  monthSales?: number
  distance?: number
  expectedTime?: string
  deliveryTime?: string
  perCapita?: number
  promos?: PromoItem[]
  categories?: DishCategoryVO[]
}

/** 前端商家卡片展示用 */
export interface MerchantCardVO {
  id: number
  name: string
  logo: string
  bg: string
  rating: number
  monthlySales: number
  minOrder: number
  deliveryFee: number
  deliveryTime: string
  distance: string
  tags: { type: string; text: string }[]
  promo: string
  perCapita?: number
  top?: boolean
}

/** 菜品规格 */
export interface DishSpecVO {
  id: number
  dishId: number
  name: string
  priceDiff: number
  stock: number
  status?: number
}

/** 菜品信息 */
export interface DishVO {
  id: number
  merchantId: number
  name: string
  description?: string
  image?: string
  images?: string[]
  price: number
  originalPrice?: number
  stock?: number
  monthSales?: number
  totalSales?: number
  rating?: number
  tags?: string[]
  spicy?: number
  status?: number
  sort?: number
  specs?: DishSpecVO[]
}

/** 前端菜品卡片展示用 */
export interface DishCardVO {
  id: number
  merchantId: number
  name: string
  desc: string
  sales: number
  rating: number
  price: number
  originalPrice?: number
  tags: { type: string; text: string }[]
  bg: string
  qty: number
}

/** 菜品分类（含菜品列表） */
export interface DishCategoryVO {
  id: number
  merchantId?: number
  name: string
  sort?: number
  status?: number
  dishes?: DishVO[]
}

/** 购物车项 */
export interface CartItemVO {
  id: number
  merchantId: number
  dishId: number
  dishName: string
  dishImage?: string
  specId?: number
  specName?: string
  unitPrice: number
  quantity: number
  subtotal: number
}

/** 购物车 */
export interface CartVO {
  merchantId?: number
  merchantName?: string
  items: CartItemVO[]
  totalAmount: number
  deliveryFee?: number
  packingFee?: number
  payAmount?: number
  minOrderAmount?: number
  reachMinAmount?: boolean
}

/** 订单项 */
export interface OrderItemVO {
  id?: number
  dishId: number
  dishName?: string
  dishImage?: string
  specId?: number
  specName?: string
  price: number
  quantity: number
  subtotal?: number
}

/** 订单创建响应 */
export interface OrderCreateVO {
  id: number | string
  orderNo: string
  status: number
  statusDesc: string
  payAmount: number
  expireTime?: string
}

/** 订单详情 */
export interface OrderVO {
  id: number | string
  orderNo: string
  merchantId?: number
  merchantName?: string
  merchantLogo?: string
  status: number
  statusDesc: string
  items: OrderItemVO[]
  goodsAmount?: number
  deliveryFee?: number
  packingFee?: number
  discountAmount?: number
  payAmount: number
  remark?: string
  address?: AddressDTO
  createdAt?: string
  payTime?: string
  deliverTime?: string
  receiveTime?: string
  cancelTime?: string
  riderName?: string
  riderPhone?: string
  expectedTime?: string
}

/** 支付信息 */
export interface PaymentVO {
  paymentNo: string
  payType: number
  payUrl?: string
  expireTime?: string
  status?: string
}

/** 退款详情 */
export interface RefundVO {
  id: number | string
  refundNo: string
  orderId?: number | string
  status: number
  statusDesc: string
  amount: number
  reason: string
  applyTime?: string
  images?: string[]
  reply?: string
  replyTime?: string
  cancelable?: boolean
  timeline?: { text: string; time?: string; done?: boolean }[]
}

/** 配送轨迹 */
export interface DeliveryStepVO {
  name: string
  time?: string
  done: boolean
}

/** 配送跟踪 */
export interface DeliveryVO {
  orderId: number | string
  status: number
  statusDesc: string
  steps: DeliveryStepVO[]
  rider?: {
    id?: number
    name?: string
    avatar?: string
    phone?: string
    rating?: number
  }
  merchant?: {
    name?: string
    address?: string
    phone?: string
  }
  address?: AddressDTO
  expectedTime?: string
}

/** 优惠券 */
export interface CouponVO {
  id: number | string
  name: string
  type: number
  typeDesc?: string
  amount?: number
  threshold?: number
  discount?: number
  maxDiscount?: number
  totalCount?: number
  receivedCount?: number
  usedCount?: number
  perLimit?: number
  validType?: number
  validStart?: string
  validEnd?: string
  validDays?: number
  scope?: number
  status?: number
  canReceive?: boolean
}

/** 评价 */
export interface ReviewVO {
  id: number
  userId?: number
  nickname?: string
  avatar?: string
  orderId?: number
  merchantId?: number
  dishId?: number
  rating: number
  tasteScore?: number
  packingScore?: number
  deliveryScore?: number
  content?: string
  images?: string[]
  tags?: string[]
  anonymous?: number
  reply?: string
  createdAt?: string
}

/** 通用业务错误码 */
export enum ErrorCode {
  SUCCESS = 200,

  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,

  PARAM_ERROR = 10001,
  SMS_CODE_ERROR = 10002,
  ACCOUNT_NOT_FOUND = 10003,
  TOKEN_EXPIRED = 10004,
  ACCOUNT_DISABLED = 10005,
}
