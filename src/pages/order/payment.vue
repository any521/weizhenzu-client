<template>
  <view class="payment">
    <view class="amount-card">
      <text class="lbl">应付金额</text>
      <text class="amount">¥{{ amount.toFixed(2) }}</text>
      <text class="order-no">订单号：{{ orderNo }}</text>
      <text v-if="countdownText" class="countdown">支付剩余时间 {{ countdownText }}</text>
    </view>

    <view class="pay-methods">
      <text class="section-title">选择支付方式</text>
      <view
        v-for="m in methods"
        :key="m.id"
        :class="['pay-item', payMethod === m.id && 'pay-active', m.disabled && 'pay-disabled']"
        @tap="selectMethod(m)"
      >
        <text class="pay-icon">{{ m.icon }}</text>
        <view class="pay-info">
          <text class="pay-name">{{ m.name }}</text>
          <text class="pay-desc">{{ m.desc }}</text>
        </view>
        <view :class="['pay-radio', payMethod === m.id && 'pay-radio-active']"></view>
      </view>
    </view>

    <view :class="['pay-btn', timeLeft <= 0 && 'pay-btn-disabled']" @tap="onPay">
      {{ timeLeft <= 0 ? '订单已超时' : `确认支付 ¥${amount.toFixed(2)}` }}
    </view>

    <!-- 支付宝 Mock Form 容器（H5） -->
    <!-- #ifdef H5 -->
    <view v-if="alipayHtml" class="alipay-webview" v-html="alipayHtml" />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { createPayment } from '@/api'
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
const orderNo = ref('')
const orderId = ref<string | number>('')
const amount = ref(0)
const payMethod = ref('WECHAT')
const timeLeft = ref(900)
const alipayHtml = ref('')
let timer: ReturnType<typeof setInterval> | null = null

const balance = computed(() => Number(userStore.userInfo?.balance || 0))

const methods = computed(() => [
  { id: 'WECHAT', name: '微信支付', desc: '推荐有微信账户的用户使用', icon: '💚' },
  { id: 'ALIPAY', name: '支付宝', desc: '推荐有支付宝账户的用户使用', icon: '💙' },
  { id: 'BALANCE', name: '余额支付', desc: `当前余额 ¥${balance.value.toFixed(2)}`, icon: '💰', disabled: balance.value < amount.value }
])

const payTypeNumberMap: Record<string, number> = {
  WECHAT: 1,
  ALIPAY: 2,
  BALANCE: 3
}

const payTypeNameMap: Record<string, string> = {
  WECHAT: '微信支付',
  ALIPAY: '支付宝',
  BALANCE: '余额支付'
}

const countdownText = computed(() => {
  if (timeLeft.value <= 0) return '00:00'
  const m = Math.floor(timeLeft.value / 60).toString().padStart(2, '0')
  const s = (timeLeft.value % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

onLoad((q: any) => {
  if (q?.id) {
    orderNo.value = q.id
    orderId.value = q.id
  }
  if (q?.amount) amount.value = Number(q.amount) || 0
})

onMounted(() => {
  const deadline = uni.getStorageSync('wzz_payment_deadline')
  if (deadline) {
    timeLeft.value = Math.max(0, Math.floor((Number(deadline) - Date.now()) / 1000))
  } else {
    const d = Date.now() + 15 * 60 * 1000
    uni.setStorageSync('wzz_payment_deadline', d)
    timeLeft.value = 900
  }
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
      if (timeLeft.value <= 0) {
        onTimeout()
      }
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function selectMethod(m: any) {
  if (m.disabled) {
    uni.showToast({ title: '余额不足', icon: 'none' })
    return
  }
  payMethod.value = m.id
}

function onTimeout() {
  if (timer) clearInterval(timer)
  uni.showToast({ title: '支付超时，订单已取消', icon: 'none' })
  setTimeout(() => {
    uni.redirectTo({ url: `/pages/order/detail?id=${orderId.value}&autoCancel=1` })
  }, 1500)
}

async function onPay() {
  if (timeLeft.value <= 0) return
  const method = methods.value.find(m => m.id === payMethod.value)
  if (method?.disabled) {
    return uni.showToast({ title: '余额不足', icon: 'none' })
  }

  const payType = payTypeNumberMap[payMethod.value]
  const payTypeName = payTypeNameMap[payMethod.value] || '在线支付'

  try {
    const res = await createPayment(orderId.value, payType)
    if (payMethod.value === 'ALIPAY' && res?.payUrl) {
      // #ifdef H5
      alipayHtml.value = res.payUrl
      // #endif
      // #ifndef H5
      uni.showModal({
        title: '支付宝收银台',
        content: '将跳转支付宝完成支付',
        showCancel: false,
        confirmText: '知道了'
      })
      // #endif
    }
    setTimeout(() => {
      alipayHtml.value = ''
      uni.redirectTo({ url: `/pages/order/result?status=success&payType=${encodeURIComponent(payTypeName)}&orderId=${orderId.value}` })
    }, 2500)
  } catch (e: any) {
    uni.showToast({ title: e?.message || '支付失败', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

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

.countdown {
  display: inline-block;
  margin-top: 10px;
  padding: 4px 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 12px;
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

.pay-disabled {
  opacity: 0.5;
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
  display: block;
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

.pay-btn-disabled {
  opacity: 0.6;
}

.alipay-webview {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 200;
}
</style>
