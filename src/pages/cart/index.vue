<template>
  <view class="cart">
    <view v-if="!items.length" class="empty">
      <CategoryIcon name="empty-cart" :size="80" class="empty-icon" />
      <text class="empty-text">购物车空空如也</text>
      <view class="empty-btn" @tap="goHome">去逛逛</view>
    </view>
    <view v-else>
      <view class="merchant-bar">
        <CategoryIcon name="shop" :size="18" class="m-icon" />
        <text class="m-name">麦当劳麦乐送（东外滩店）</text>
      </view>
      <view class="cart-list">
        <view v-for="item in items" :key="item.dishId" class="cart-item">
          <view class="item-img" :style="{ background: itemBg(item.name) }"></view>
          <view class="item-info">
            <view class="item-name">{{ item.name }}</view>
            <view class="item-spec">{{ item.spec }}</view>
            <view class="item-bottom">
              <text class="item-price">¥{{ item.price.toFixed(2) }}</text>
              <view class="qty-control">
                <text class="qty-btn" @tap="onDec(item)">−</text>
                <text class="qty-num">{{ item.qty }}</text>
                <text class="qty-btn" @tap="onInc(item)">+</text>
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="fee-card">
        <view class="fee-row"><text>商品金额</text><text>¥{{ cartStore.totalAmount.toFixed(2) }}</text></view>
        <view class="fee-row"><text>配送费</text><text>¥{{ deliveryFee.toFixed(2) }}</text></view>
        <view class="fee-row discount"><text>满减优惠</text><text>-¥{{ discount.toFixed(2) }}</text></view>
      </view>
    </view>

    <view v-if="items.length" class="footer-bar">
      <view class="total-area">
        <text class="total-label">合计：</text>
        <text class="total-price">¥{{ payable.toFixed(2) }}</text>
      </view>
      <view class="checkout-btn" @tap="goCheckout">去结算({{ totalCount }})</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { MOCK_DISHES } from '@/mock'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import { useCartStore } from '@/store/cart'

const cartStore = useCartStore()
const deliveryFee = 5
const discount = 5

const items = computed(() => cartStore.items)
const totalCount = computed(() => cartStore.totalCount)
const payable = computed(() => Math.max(0, cartStore.totalAmount + deliveryFee - discount))

onShow(() => {
  // 页面显示时可刷新数据
})

function itemBg(name: string) {
  const dish = MOCK_DISHES.find(d => d.name === name)
  return dish?.bg || 'linear-gradient(135deg, #FF6B35, #FFC107)'
}

function onInc(item: any) {
  cartStore.changeQty(item.dishId, 1)
}
function onDec(item: any) {
  cartStore.changeQty(item.dishId, -1)
}
function goHome() {
  uni.switchTab({ url: '/pages/index/index' })
}
function goCheckout() {
  uni.navigateTo({ url: '/pages/order/checkout' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.cart {
  min-height: 100vh;
  background: $bg;
  padding-bottom: 80px;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
  color: $text-muted;
}

.empty-icon {
  margin-bottom: 16px;
  color: $text-muted;
  opacity: 0.6;
}

.empty-text {
  font-size: 14px;
  margin-bottom: 20px;
}

.empty-btn {
  background: $primary;
  color: #fff;
  padding: 10px 28px;
  border-radius: 22px;
  font-size: 14px;
}

.merchant-bar {
  background: #fff;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $border;
}

.m-icon {
  margin-right: 8px;
  color: $primary;
}

.m-name {
  font-size: 15px;
  font-weight: 600;
}

.cart-list {
  background: #fff;
  margin-top: 8px;
}

.cart-item {
  display: flex;
  padding: 14px 16px;
  border-bottom: 1px solid $border;
}

.item-img {
  width: 76px;
  height: 76px;
  border-radius: 8px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-name {
  font-size: 15px;
  font-weight: 500;
}

.item-spec {
  font-size: 12px;
  color: $text-muted;
  margin-top: 4px;
}

.item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-price {
  color: $primary;
  font-size: 16px;
  font-weight: 700;
}

.qty-control {
  display: flex;
  align-items: center;
}

.qty-btn {
  width: 26px;
  height: 26px;
  line-height: 24px;
  text-align: center;
  border: 1px solid $primary;
  color: $primary;
  border-radius: 13px;
  font-size: 14px;
  font-weight: 700;
}

.qty-num {
  min-width: 36px;
  text-align: center;
  font-size: 14px;
}

.fee-card {
  background: #fff;
  margin: 12px 16px;
  border-radius: $radius-md;
  padding: 14px 16px;
  box-shadow: $shadow;
}

.fee-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  font-size: 13px;
  color: $text-light;
}

.fee-row.discount {
  color: $success;
}

.footer-bar {
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

.total-area {
  flex: 1;
}

.total-label {
  font-size: 13px;
  color: $text-light;
}

.total-price {
  color: $primary;
  font-size: 20px;
  font-weight: 700;
}

.checkout-btn {
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  padding: 0 24px;
  height: 42px;
  line-height: 42px;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 600;
}
</style>
