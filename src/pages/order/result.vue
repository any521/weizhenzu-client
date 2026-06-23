<template>
  <view class="result">
    <view :class="['icon-circle', success ? 'icon-success' : 'icon-fail']">
      <CategoryIcon :name="success ? 'check' : 'close'" :size="48" />
    </view>
    <text class="title">{{ success ? '支付成功' : '支付失败' }}</text>
    <text class="desc">{{ success ? '商家正在准备您的订单' : '请稍后再试' }}</text>

    <!-- 订单信息卡片 -->
    <view v-if="order" class="order-card">
      <view class="order-row">
        <text class="order-label">商家</text>
        <text class="order-value">{{ order.merchantName || '-' }}</text>
      </view>
      <view class="order-row">
        <text class="order-label">订单号</text>
        <text class="order-value">{{ order.orderNo || order.id }}</text>
      </view>
      <view class="order-row">
        <text class="order-label">支付金额</text>
        <text class="order-value price">¥{{ Number(order.payAmount || 0).toFixed(2) }}</text>
      </view>
      <view class="order-row">
        <text class="order-label">支付方式</text>
        <text class="order-value">{{ payType }}</text>
      </view>
      <view class="order-row">
        <text class="order-label">支付时间</text>
        <text class="order-value">{{ payTime }}</text>
      </view>
    </view>
    <view v-else class="order-card">
      <view class="order-row">
        <text class="order-label">订单号</text>
        <text class="order-value">{{ orderId || '-' }}</text>
      </view>
      <view class="order-row">
        <text class="order-label">支付方式</text>
        <text class="order-value">{{ payType }}</text>
      </view>
      <view class="order-row">
        <text class="order-label">支付时间</text>
        <text class="order-value">{{ payTime }}</text>
      </view>
    </view>

    <view class="actions">
      <view class="action-btn" @tap="goOrder">查看订单</view>
      <view class="action-btn action-primary" @tap="goHome">返回首页</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import { getOrderDetail } from '@/api'
import type { OrderVO } from '@/types/api'

const success = ref(true)
const order = ref<OrderVO | null>(null)
const orderId = ref<string | number>('')
const payType = ref('在线支付')

const payTime = computed(() => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const h = String(now.getHours()).padStart(2, '0')
  const min = String(now.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}`
})

onLoad((q: any) => {
  success.value = q?.status !== 'fail'
  if (q?.payType) payType.value = decodeURIComponent(q.payType)
  if (q?.orderId) {
    orderId.value = q.orderId
    loadOrder(q.orderId)
  } else if (q?.id) {
    orderId.value = q.id
    loadOrder(q.id)
  }
})

async function loadOrder(id: string | number) {
  try {
    order.value = await getOrderDetail(id)
  } catch (e) {
    console.error('加载订单详情失败', e)
    order.value = null
  }
}

function goOrder() {
  uni.reLaunch({ url: '/pages/order/list' })
}
function goHome() {
  uni.reLaunch({ url: '/pages/index/index' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.result {
  min-height: 100vh;
  background: $bg;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px;
}

.icon-circle {
  width: 96px;
  height: 96px;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 56px;
  font-weight: 700;
  margin-bottom: 24px;
}

.icon-success {
  background: $success;
}

.icon-fail {
  background: $danger;
}

.title {
  font-size: 22px;
  font-weight: 700;
  color: $text;
}

.desc {
  font-size: 13px;
  color: $text-muted;
  margin-top: 8px;
}

.order-card {
  width: 100%;
  background: #fff;
  border-radius: $radius-lg;
  padding: 16px;
  margin-top: 32px;
  box-shadow: $shadow;
}

.order-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 14px;
  border-bottom: 1px solid $border;
}

.order-row:last-child {
  border-bottom: none;
}

.order-label {
  color: $text-light;
}

.order-value {
  color: $text;
  font-weight: 500;
}

.order-value.price {
  color: $primary;
  font-weight: 700;
}

.actions {
  display: flex;
  gap: 16px;
  margin-top: 40px;
  width: 100%;
}

.action-btn {
  flex: 1;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border: 1px solid $primary;
  color: $primary;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 600;
}

.action-primary {
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  border: none;
}
</style>
