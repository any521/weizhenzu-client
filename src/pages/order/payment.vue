<template>
  <view class="payment">
    <view class="amount-card">
      <text class="lbl">应付金额</text>
      <text class="amount">¥{{ amount.toFixed(2) }}</text>
      <text class="order-no">订单号：{{ orderNo }}</text>
    </view>

    <view class="pay-methods">
      <text class="section-title">选择支付方式</text>
      <view
        v-for="m in methods"
        :key="m.id"
        :class="['pay-item', payMethod === m.id && 'pay-active']"
        @tap="payMethod = m.id"
      >
        <text class="pay-icon">{{ m.icon }}</text>
        <view class="pay-info">
          <text class="pay-name">{{ m.name }}</text>
          <text class="pay-desc">{{ m.desc }}</text>
        </view>
        <view :class="['pay-radio', payMethod === m.id && 'pay-radio-active']"></view>
      </view>
    </view>

    <view class="pay-btn" @tap="onPay">确认支付 ¥{{ amount.toFixed(2) }}</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { MOCK_ORDER_DETAIL } from '@/mock'

const orderNo = ref(MOCK_ORDER_DETAIL.id)
const amount = ref(MOCK_ORDER_DETAIL.payable)
const payMethod = ref('WECHAT')

const methods = [
  { id: 'WECHAT', name: '微信支付', desc: '推荐有微信账户的用户使用', icon: '💚' },
  { id: 'ALIPAY', name: '支付宝', desc: '推荐有支付宝账户的用户使用', icon: '💙' }
]

onLoad((q: any) => {
  // 可依据 q.id 切换，当前使用 Mock
})

function onPay() {
  uni.showLoading({ title: '支付中...', mask: true })
  setTimeout(() => {
    uni.hideLoading()
    uni.redirectTo({ url: '/pages/order/result?status=success' })
  }, 1500)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.payment {
  min-height: 100vh;
  background: $bg;
  padding-bottom: 80px;
}

.amount-card {
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  padding: 32px 20px;
  text-align: center;
}

.lbl {
  display: block;
  font-size: 13px;
  opacity: 0.9;
}

.amount {
  display: block;
  font-size: 40px;
  font-weight: 800;
  margin: 8px 0;
}

.order-no {
  display: block;
  font-size: 12px;
  opacity: 0.85;
}

.pay-methods {
  background: #fff;
  margin: 16px;
  border-radius: $radius-md;
  padding: 16px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
  color: $text;
}

.pay-item {
  display: flex;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px solid $border;
}

.pay-item:last-child {
  border-bottom: none;
}

.pay-icon {
  font-size: 28px;
  margin-right: 14px;
}

.pay-info {
  flex: 1;
}

.pay-name {
  font-size: 15px;
  font-weight: 600;
  display: block;
}

.pay-desc {
  font-size: 11px;
  color: $text-muted;
  margin-top: 2px;
}

.pay-radio {
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border: 2px solid $border;
}

.pay-radio-active {
  background: $primary;
  border-color: $primary;
  box-shadow: inset 0 0 0 3px #fff;
}

.pay-active {
  background: rgba(255, 107, 53, 0.04);
  border-radius: 8px;
}

.pay-btn {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 25px;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.4);
}
</style>
