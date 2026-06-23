<template>
  <view class="checkout">
    <!-- 收货地址 -->
    <view class="address-card" @tap="goAddress">
      <text class="addr-icon">📍</text>
      <view class="addr-info" v-if="address">
        <view class="addr-line1">
          <text class="addr-name">{{ address.name }}</text>
          <text class="addr-phone">{{ address.phone }}</text>
        </view>
        <text class="addr-detail">{{ address.tag }} · {{ address.address }}</text>
      </view>
      <view v-else class="addr-empty">请选择收货地址 ▸</view>
    </view>

    <!-- 商家 -->
    <view class="merchant-row">
      <text class="m-icon">🏪</text>
      <text class="m-name">{{ cartStore.merchantName }}</text>
    </view>

    <!-- 商品列表 -->
    <view class="dish-list">
      <view v-for="it in cartStore.items" :key="it.id" class="dish-item">
        <view class="d-img" :style="{ background: itemBg(it) }"></view>
        <view class="d-info">
          <text class="d-name">{{ it.dishName }}</text>
          <text class="d-spec">{{ it.specName || '默认' }}</text>
        </view>
        <view class="d-price">¥{{ it.unitPrice.toFixed(2) }} × {{ it.quantity }}</view>
      </view>
    </view>

    <!-- 优惠券 -->
    <view class="coupon-row" @tap="openCouponPopup">
      <text class="lbl">优惠券</text>
      <text class="coupon-text" :class="{ 'coupon-active': selectedCoupon }">
        {{ selectedCoupon ? selectedCoupon.name : '选择优惠券' }}
      </text>
      <text class="arrow">›</text>
    </view>

    <!-- 备注 -->
    <view class="remark-row" @tap="openRemarkPopup">
      <text class="lbl">备注</text>
      <text class="remark-text" :class="{ placeholder: !remark }">{{ remark || '选填，可填写口味、忌口等' }}</text>
      <text class="arrow">›</text>
    </view>

    <!-- 费用明细 -->
    <view class="price-list">
      <view class="p-row"><text>商品金额</text><text>¥{{ cartStore.totalAmount.toFixed(2) }}</text></view>
      <view class="p-row"><text>配送费</text><text>¥{{ cartStore.deliveryFee.toFixed(2) }}</text></view>
      <view class="p-row"><text>优惠</text><text style="color: $success;">-¥{{ 0 }}</text></view>
      <view v-if="selectedCoupon" class="p-row"><text>券抵扣</text><text style="color: $success;">-¥{{ couponDiscount.toFixed(2) }}</text></view>
      <view class="p-row total">
        <text>实付</text>
        <text class="p-total-price">¥{{ payable.toFixed(2) }}</text>
      </view>
    </view>

    <!-- 底部 -->
    <view class="footer">
      <view class="footer-total">合计：<text class="price">¥{{ payable.toFixed(2) }}</text></view>
      <view class="submit-btn" :class="{ 'submit-disabled': submitting }" @tap="onSubmit">提交订单</view>
    </view>

    <!-- 优惠券弹窗 -->
    <view v-if="showCouponPopup" class="popup-mask" @tap="closeCouponPopup">
      <view class="popup-content coupon-popup" @tap.stop>
        <view class="popup-header">
          <text class="popup-title">选择优惠券</text>
          <text class="popup-close" @tap="closeCouponPopup">×</text>
        </view>
        <scroll-view scroll-y class="coupon-scroll">
          <view class="popup-coupon-list">
            <view class="popup-coupon-item no-coupon" :class="{ active: !selectedCoupon }" @tap="selectCoupon(null)">
              <text>不使用优惠券</text>
              <view v-if="!selectedCoupon" class="popup-check"><CategoryIcon name="check" :size="14" /></view>
            </view>
            <view
              v-for="c in usableCoupons"
              :key="c.id"
              class="popup-coupon-item"
              :class="{ active: selectedCoupon?.id === c.id }"
              @tap="selectCoupon(c)"
            >
              <view class="popup-coupon-left" :style="{ background: c.bg }">
                <text class="popup-coupon-value">{{ c.type === 'amount' ? `¥${c.value}` : `${c.value}折` }}</text>
                <text class="popup-coupon-condition">{{ c.condition }}</text>
              </view>
              <view class="popup-coupon-body">
                <text class="popup-coupon-name">{{ c.name }}</text>
                <text class="popup-coupon-desc">{{ c.desc }}</text>
                <text class="popup-coupon-expire">{{ c.expire }} 到期</text>
              </view>
              <view v-if="selectedCoupon?.id === c.id" class="popup-check"><CategoryIcon name="check" :size="14" /></view>
            </view>
          </view>
        </scroll-view>
        <view class="popup-footer">
          <view class="popup-btn" @tap="closeCouponPopup">确定</view>
        </view>
      </view>
    </view>

    <!-- 备注弹窗 -->
    <view v-if="showRemarkPopup" class="popup-mask" @tap="closeRemarkPopup">
      <view class="popup-content remark-popup" @tap.stop>
        <view class="popup-header">
          <text class="popup-title">填写备注</text>
          <text class="popup-close" @tap="closeRemarkPopup">×</text>
        </view>
        <textarea
          v-model="remarkInput"
          class="remark-textarea"
          placeholder="选填，可填写口味、忌口等"
          maxlength="50"
        />
        <text class="remark-count">{{ remarkInput.length }}/50</text>
        <view class="popup-footer">
          <view class="popup-btn" @tap="confirmRemark">确定</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { useCartStore } from '@/store/cart'
import { getDefaultAddress, createOrder, getAvailableCoupons } from '@/api'
import type { AddressVO } from '@/types/api'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'

const cartStore = useCartStore()
const remark = ref('')
const remarkInput = ref('')
const address = ref<AddressVO | null>(null)
const selectedCoupon = ref<any>(null)
const showCouponPopup = ref(false)
const showRemarkPopup = ref(false)
const submitting = ref(false)
const usableCoupons = ref<any[]>([])

onShow(() => {
  cartStore.fetchCart()
  loadDefaultAddress()
})

onLoad((q: any) => {
  if (q?.addressId) {
    // 从地址列表返回时可通过参数回显，这里简化直接刷新默认地址
  }
})

onMounted(() => {
  loadUsableCoupons()
})

async function loadDefaultAddress() {
  try {
    const dto = await getDefaultAddress()
    if (dto) address.value = dto as any
  } catch (e) {
    console.error('获取默认地址失败', e)
  }
}

async function loadUsableCoupons() {
  try {
    const list = await getAvailableCoupons()
    usableCoupons.value = (list || []).map((c: any) => ({
      id: c.id,
      type: c.type === 2 ? 'discount' : 'amount',
      value: c.type === 2 ? (c.discount ? c.discount * 10 : 0) : (c.amount || 0),
      condition: c.threshold && c.threshold > 0 ? `满 ${c.threshold} 元可用` : '无门槛',
      name: c.name || '优惠券',
      desc: c.typeDesc || '',
      expire: c.validEnd || '',
      bg: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)'
    }))
  } catch (e) {
    console.error('加载可用优惠券失败', e)
    usableCoupons.value = []
  }
}

const couponDiscount = computed(() => {
  if (!selectedCoupon.value) return 0
  if (selectedCoupon.value.type === 'amount') return selectedCoupon.value.value
  return Number((cartStore.totalAmount * (1 - selectedCoupon.value.value / 10)).toFixed(2))
})

const payable = computed(() => {
  const base = cartStore.payAmount
  return Math.max(0, Number((base - couponDiscount.value).toFixed(2)))
})

function itemBg(it: any) {
  if (it.dishImage) return `url(${it.dishImage})`
  return 'linear-gradient(135deg, #FF6B35, #FFC107)'
}

function goAddress() {
  uni.navigateTo({ url: '/pages/address/list?from=checkout' })
}

function openCouponPopup() {
  showCouponPopup.value = true
}

function closeCouponPopup() {
  showCouponPopup.value = false
}

function selectCoupon(c: any) {
  selectedCoupon.value = c
}

function openRemarkPopup() {
  remarkInput.value = remark.value
  showRemarkPopup.value = true
}

function closeRemarkPopup() {
  showRemarkPopup.value = false
}

function confirmRemark() {
  remark.value = remarkInput.value.slice(0, 50)
  closeRemarkPopup()
}

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

async function onSubmit() {
  if (!address.value) {
    return uni.showToast({ title: '请先选择地址', icon: 'none' })
  }
  if (!cartStore.items.length) {
    return uni.showToast({ title: '购物车为空', icon: 'none' })
  }
  if (submitting.value) return

  const lastToken = uni.getStorageSync('wzz_client_token')
  const lastTime = uni.getStorageSync('wzz_client_token_time')
  if (lastToken && lastTime && Date.now() - Number(lastTime) < 5000) {
    return uni.showToast({ title: '请勿重复提交', icon: 'none' })
  }

  submitting.value = true
  const clientToken = generateUUID()
  uni.setStorageSync('wzz_client_token', clientToken)
  uni.setStorageSync('wzz_client_token_time', Date.now())

  try {
    const res = await createOrder({
      merchantId: cartStore.merchantId!,
      addressId: address.value.id,
      items: cartStore.items.map(i => ({ dishId: i.dishId, specId: i.specId, quantity: i.quantity })),
      remark: remark.value,
      clientToken,
    })
    uni.redirectTo({ url: `/pages/order/payment?id=${res.id}&amount=${res.payAmount}&paymentNo=${res.orderNo}` })
  } catch (e) {
    uni.showToast({ title: '下单失败，请重试', icon: 'none' })
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.checkout {
  min-height: 100vh;
  background: $bg;
  padding-bottom: 70px;
}

.address-card {
  background: #fff;
  margin: 12px 16px;
  border-radius: $radius-md;
  padding: 16px;
  display: flex;
  align-items: center;
  box-shadow: $shadow;
}

.addr-icon {
  font-size: 22px;
  color: $primary;
  margin-right: 12px;
}

.addr-info {
  flex: 1;
}

.addr-line1 {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 600;
}

.addr-phone {
  color: $text-light;
  font-weight: 400;
}

.addr-detail {
  color: $text-light;
  font-size: 13px;
  margin-top: 4px;
}

.addr-empty {
  color: $text-muted;
  font-size: 14px;
  flex: 1;
}

.merchant-row {
  background: #fff;
  margin: 0 16px 12px;
  padding: 12px 16px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
}

.m-icon {
  font-size: 16px;
  margin-right: 8px;
}

.m-name {
  font-size: 14px;
  font-weight: 600;
}

.dish-list {
  background: #fff;
  margin: 0 16px 12px;
  border-radius: $radius-md;
  padding: 12px 16px;
}

.dish-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  font-size: 14px;
}

.d-img {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  margin-right: 10px;
  flex-shrink: 0;
}

.d-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.d-name {
  color: $text;
}

.d-spec {
  font-size: 11px;
  color: $text-muted;
}

.d-price {
  font-weight: 600;
  color: $text-light;
}

.coupon-row,
.remark-row {
  background: #fff;
  margin: 0 16px 12px;
  border-radius: $radius-md;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  box-shadow: $shadow;
}

.lbl {
  color: $text-light;
  font-size: 14px;
  margin-right: 12px;
}

.coupon-text,
.remark-text {
  flex: 1;
  font-size: 14px;
  color: $text;
}

.coupon-text.coupon-active {
  color: $primary;
  font-weight: 600;
}

.remark-text.placeholder {
  color: $text-muted;
}

.arrow {
  font-size: 16px;
  color: $text-muted;
  margin-left: 8px;
}

.price-list {
  background: #fff;
  margin: 0 16px;
  border-radius: $radius-md;
  padding: 14px 16px;
}

.p-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 13px;
  color: $text-light;
}

.p-row.total {
  font-size: 16px;
  color: $text;
  padding-top: 10px;
  border-top: 1px solid $border;
}

.p-total-price {
  color: $primary;
  font-weight: 700;
  font-size: 18px;
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 56px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  border-top: 1px solid $border;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
}

.footer-total {
  flex: 1;
  font-size: 13px;
  color: $text-light;
}

.footer-total .price {
  color: $primary;
  font-size: 20px;
  font-weight: 700;
}

.submit-btn {
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  padding: 0 28px;
  height: 42px;
  line-height: 42px;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 600;
}

.submit-disabled {
  opacity: 0.6;
  pointer-events: none;
}

.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
}

.popup-content {
  background: #fff;
  width: 100%;
  border-radius: $radius-lg $radius-lg 0 0;
  padding: 16px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.popup-title {
  font-size: 16px;
  font-weight: 700;
  color: $text;
}

.popup-close {
  font-size: 24px;
  color: $text-muted;
  padding: 0 4px;
}

.coupon-scroll {
  max-height: 420px;
}

.popup-coupon-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.popup-coupon-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: $radius-md;
  border: 1px solid $border;
  background: #fff;
}

.popup-coupon-item.active {
  border-color: $primary;
  background: rgba($primary, 0.04);
}

.popup-coupon-item.no-coupon {
  justify-content: space-between;
  font-size: 14px;
  color: $text-light;
}

.popup-coupon-left {
  width: 90px;
  height: 70px;
  border-radius: $radius-sm;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.popup-coupon-value {
  font-size: 20px;
  font-weight: 700;
}

.popup-coupon-condition {
  font-size: 11px;
  margin-top: 2px;
}

.popup-coupon-body {
  flex: 1;
  min-width: 0;
}

.popup-coupon-name {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: $text;
}

.popup-coupon-desc,
.popup-coupon-expire {
  display: block;
  font-size: 11px;
  color: $text-muted;
  margin-top: 3px;
}

.popup-check {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: $primary;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.popup-footer {
  margin-top: 16px;
}

.popup-btn {
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  border-radius: 23px;
  font-size: 15px;
  font-weight: 600;
}

.remark-popup {
  padding-bottom: 24px;
}

.remark-textarea {
  width: 100%;
  height: 120px;
  background: $bg;
  border-radius: $radius-md;
  padding: 12px;
  font-size: 14px;
  color: $text;
  box-sizing: border-box;
}

.remark-count {
  display: block;
  text-align: right;
  font-size: 12px;
  color: $text-muted;
  margin-top: 8px;
}
</style>
