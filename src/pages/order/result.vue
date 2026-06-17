<template>
  <view class="result">
    <view :class="['icon-circle', success ? 'icon-success' : 'icon-fail']">
      <CategoryIcon :name="success ? 'check' : 'close'" :size="48" />
    </view>
    <text class="title">{{ success ? '支付成功' : '支付失败' }}</text>
    <text class="desc">{{ success ? '商家正在准备您的订单' : '请稍后再试' }}</text>
    <view class="actions">
      <view class="action-btn" @tap="goOrder">查看订单</view>
      <view class="action-btn action-primary" @tap="goHome">返回首页</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'

const success = ref(true)

onLoad((q: any) => {
  success.value = q?.status !== 'fail'
})

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
