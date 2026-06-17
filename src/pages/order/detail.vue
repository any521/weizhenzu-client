<template>
  <view class="detail">
    <view class="completed-header">
      <view class="completed-icon"><CategoryIcon name="check" :size="32" /></view>
      <view class="completed-title">{{ order.status }}</view>
      <view class="completed-sub">感谢您的信任，期待再次光临</view>
    </view>

    <view class="delivery-time-card">
      <view class="delivery-time">{{ order.deliveryTime }}</view>
      <view class="delivery-time-sub">骑手{{ order.riderName }} · 配送用时 {{ order.deliveryDuration }} 分钟</view>
    </view>

    <view class="order-section">
      <view class="section-head">
        <text>订单信息</text>
      </view>
      <view class="merchant-row">
        <view class="merchant-icon-sm" :style="{ background: 'linear-gradient(135deg, #FF6B35, #FFC107)' }">{{ order.merchant.icon }}</view>
        <text class="merchant-name-sm">{{ order.merchant.name }}</text>
      </view>
      <view v-for="(it, idx) in order.items" :key="idx" class="item-row">
        <view class="item-img" :style="{ background: it.bg }"></view>
        <view class="item-info">
          <view class="item-name">{{ it.name }}</view>
          <view class="item-spec">{{ it.spec }}</view>
        </view>
        <view class="item-price">¥{{ it.price.toFixed(2) }} × {{ it.qty }}</view>
      </view>
      <view class="summary-row"><text>商品金额</text><text>¥{{ order.goodsAmount.toFixed(2) }}</text></view>
      <view class="summary-row"><text>配送费</text><text>¥{{ order.deliveryFee.toFixed(2) }}</text></view>
      <view class="summary-row"><text>满减优惠</text><text style="color: $success;">-¥{{ order.discount.toFixed(2) }}</text></view>
      <view class="summary-row total">
        <text>实付</text>
        <text class="price">¥{{ order.payable.toFixed(2) }}</text>
      </view>
    </view>

    <view class="order-section">
      <view class="section-head"><text>配送信息</text></view>
      <view class="info-line"><text>订单编号</text><text>{{ order.orderNo }}</text></view>
      <view class="info-line"><text>下单时间</text><text>{{ order.orderTime }}</text></view>
      <view class="info-line"><text>配送地址</text><text>{{ order.address }}</text></view>
      <view class="info-line"><text>收货人</text><text>{{ order.contact }}</text></view>
      <view class="info-line"><text>支付方式</text><text>{{ order.payType }}</text></view>
    </view>

    <view class="action-btns">
      <text class="btn btn-secondary" @tap="onDelete">删除订单</text>
      <text class="btn btn-secondary" @tap="onReorder">再来一单</text>
      <text class="btn btn-primary" @tap="onRate">立即评价</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { MOCK_ORDER_DETAIL } from '@/mock'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'

const order = ref(MOCK_ORDER_DETAIL)

onLoad((q: any) => {
  // 可依据 q.id 切换，当前使用 Mock
})

function onDelete() {
  uni.showModal({
    title: '提示',
    content: '确定删除该订单？',
    success: (r) => {
      if (r.confirm) {
        uni.showToast({ title: '已删除', icon: 'success' })
        setTimeout(() => uni.navigateBack(), 600)
      }
    }
  })
}
function onReorder() {
  uni.switchTab({ url: '/pages/index/index' })
}
function onRate() {
  uni.showToast({ title: '跳转评价', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.detail {
  min-height: 100vh;
  background: $bg;
  padding-bottom: 40px;
}

.completed-header {
  background: linear-gradient(180deg, #fff 0%, $bg 100%);
  padding: 24px 16px 32px;
  text-align: center;
}

.completed-icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, $primary, $secondary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 36px;
  box-shadow: 0 8px 24px rgba(255, 107, 53, 0.3);
}

.completed-title {
  font-size: 20px;
  font-weight: 700;
  color: $text;
  margin-bottom: 4px;
}

.completed-sub {
  font-size: 13px;
  color: $text-muted;
}

.delivery-time-card {
  background: #fff;
  margin: 0 16px 12px;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  box-shadow: $shadow;
}

.delivery-time {
  font-size: 18px;
  font-weight: 700;
  color: $primary;
}

.delivery-time-sub {
  font-size: 12px;
  color: $text-muted;
  margin-top: 4px;
}

.order-section {
  background: #fff;
  margin: 0 16px 12px;
  border-radius: 12px;
  padding: 16px;
  box-shadow: $shadow;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 12px;
}

.merchant-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.merchant-icon-sm {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 16px;
}

.merchant-name-sm {
  font-size: 14px;
  font-weight: 600;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid $border;
}

.item-row:last-child {
  border-bottom: none;
}

.item-img {
  width: 48px;
  height: 48px;
  border-radius: 6px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 13px;
}

.item-spec {
  font-size: 11px;
  color: $text-muted;
}

.item-price {
  font-size: 12px;
  color: $text-light;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  padding: 4px 0;
  color: $text-light;
}

.summary-row.total {
  border-top: 1px solid $border;
  margin-top: 8px;
  padding-top: 12px;
  font-size: 16px;
  font-weight: 700;
  color: $text;
}

.summary-row.total .price {
  color: $primary;
  font-size: 20px;
}

.info-line {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: $text-muted;
  padding: 4px 0;
}

.action-btns {
  display: flex;
  gap: 8px;
  padding: 0 16px;
  margin: 16px 0;
}

.btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
  border-radius: 22px;
  font-size: 14px;
  font-weight: 600;
}

.btn-primary {
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
}

.btn-secondary {
  background: #fff;
  color: $primary;
  border: 1px solid $primary;
}
</style>
