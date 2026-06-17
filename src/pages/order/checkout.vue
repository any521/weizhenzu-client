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
      <text class="m-name">{{ cart.merchant.name }}</text>
    </view>

    <!-- 商品列表 -->
    <view class="dish-list">
      <view v-for="it in cart.items" :key="it.dishId" class="dish-item">
        <view class="d-img" :style="{ background: itemBg(it.name) }"></view>
        <view class="d-info">
          <text class="d-name">{{ it.name }}</text>
          <text class="d-spec">{{ it.spec }}</text>
        </view>
        <view class="d-price">¥{{ it.price.toFixed(2) }} × {{ it.qty }}</view>
      </view>
    </view>

    <!-- 备注 -->
    <view class="remark-input">
      <text class="lbl">备注：</text>
      <input v-model="remark" placeholder="选填，可填写口味、忌口等" />
    </view>

    <!-- 费用明细 -->
    <view class="price-list">
      <view class="p-row"><text>商品金额</text><text>¥{{ cart.total.toFixed(2) }}</text></view>
      <view class="p-row"><text>配送费</text><text>¥{{ cart.deliveryFee.toFixed(2) }}</text></view>
      <view class="p-row"><text>优惠</text><text style="color: $success;">-¥{{ cart.discount.toFixed(2) }}</text></view>
      <view class="p-row total">
        <text>实付</text>
        <text class="p-total-price">¥{{ cart.payable.toFixed(2) }}</text>
      </view>
    </view>

    <!-- 底部 -->
    <view class="footer">
      <view class="footer-total">合计：<text class="price">¥{{ cart.payable.toFixed(2) }}</text></view>
      <view class="submit-btn" @tap="onSubmit">提交订单</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MOCK_CART, MOCK_ADDRESSES, MOCK_DISHES } from '@/mock'

const cart = ref(MOCK_CART)
const remark = ref('')
const address = ref(MOCK_ADDRESSES.find(a => a.default) || MOCK_ADDRESSES[0])

function itemBg(name: string) {
  const dish = MOCK_DISHES.find(d => d.name === name)
  return dish?.bg || 'linear-gradient(135deg, #FF6B35, #FFC107)'
}

function goAddress() {
  uni.navigateTo({ url: '/pages/address/list?from=checkout' })
}
function onSubmit() {
  if (!address.value) {
    return uni.showToast({ title: '请先选择地址', icon: 'none' })
  }
  uni.showLoading({ title: '提交中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.redirectTo({ url: '/pages/order/payment?id=DD20260617001' })
  }, 800)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

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

.remark-input {
  background: #fff;
  margin: 0 16px 12px;
  border-radius: $radius-md;
  padding: 12px 16px;
  display: flex;
  align-items: center;
}

.lbl {
  color: $text-light;
  font-size: 14px;
  margin-right: 8px;
}

input {
  flex: 1;
  font-size: 14px;
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
</style>
