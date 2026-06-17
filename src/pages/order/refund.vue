<template>
  <view class="refund">
    <view class="card">
      <view class="section-title">退款原因</view>
      <view class="reason-list">
        <view
          v-for="(r, idx) in reasons"
          :key="idx"
          :class="['reason-item', selectedReason === idx && 'active']"
          @tap="selectedReason = idx"
        >
          <text>{{ r }}</text>
          <view :class="['radio', selectedReason === idx && 'radio-active']"></view>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="section-title">退款金额</view>
      <view class="amount-input">
        <text class="symbol">¥</text>
        <input v-model="refundAmount" type="digit" placeholder="请输入退款金额" />
      </view>
      <view class="tip">最多可退 ¥{{ maxAmount.toFixed(2) }}</view>
    </view>

    <view class="card">
      <view class="section-title">补充说明</view>
      <textarea v-model="remark" placeholder="请描述退款原因（选填）" />
    </view>

    <view class="submit-btn" @tap="onSubmit">提交退款申请</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MOCK_ORDER_DETAIL } from '@/mock'

const reasons = ref(['商家未接单', '配送超时', '商品质量问题', '错送/漏送', '其他原因'])
const selectedReason = ref(0)
const refundAmount = ref(MOCK_ORDER_DETAIL.payable.toFixed(2))
const maxAmount = ref(MOCK_ORDER_DETAIL.payable)
const remark = ref('')

function onSubmit() {
  if (!refundAmount.value || Number(refundAmount.value) <= 0) {
    return uni.showToast({ title: '请输入退款金额', icon: 'none' })
  }
  if (Number(refundAmount.value) > maxAmount.value) {
    return uni.showToast({ title: '退款金额不能超过订单金额', icon: 'none' })
  }
  uni.showLoading({ title: '提交中...' })
  setTimeout(() => {
    uni.hideLoading()
    uni.showToast({ title: '已提交申请', icon: 'success' })
    setTimeout(() => uni.navigateBack(), 800)
  }, 1000)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.refund {
  min-height: 100vh;
  background: $bg;
  padding: 12px 16px 40px;
}

.card {
  background: #fff;
  border-radius: $radius-md;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: $shadow;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 14px;
  color: $text;
}

.reason-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid $border;
  font-size: 14px;
  color: $text;
}

.reason-item:last-child {
  border-bottom: none;
}

.reason-item.active {
  color: $primary;
  font-weight: 600;
}

.radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid $border;
}

.radio-active {
  background: $primary;
  border-color: $primary;
  box-shadow: inset 0 0 0 3px #fff;
}

.amount-input {
  display: flex;
  align-items: center;
  border-bottom: 1px solid $border;
  padding: 10px 0;
}

.symbol {
  font-size: 20px;
  font-weight: 700;
  color: $text;
  margin-right: 8px;
}

input {
  flex: 1;
  font-size: 18px;
  font-weight: 600;
}

.tip {
  font-size: 12px;
  color: $text-muted;
  margin-top: 8px;
}

textarea {
  width: 100%;
  height: 80px;
  font-size: 14px;
  color: $text;
}

.submit-btn {
  margin-top: 24px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
}
</style>
