<template>
  <view class="coupon-center">
    <!-- 顶部头部 -->
    <view class="header">
      <view class="header-bg">
        <view class="header-top">
          <text class="header-title">神券中心</text>
          <view class="header-count">
            <text class="count-label">共</text>
            <text class="count-value">{{ totalCoupons }}</text>
            <text class="count-label">张券</text>
          </view>
        </view>
        <view class="header-tip">
          <CategoryIcon name="ticket" :size="16" class="tip-icon" />
          <text>用券下单，单单省更多</text>
        </view>
      </view>
    </view>

    <view class="content">
      <!-- 福利挑战 1 -->
      <view class="challenge-card">
        <view class="challenge-head">
          <view class="challenge-title-row">
            <CategoryIcon name="fire" :size="18" class="challenge-fire" />
            <text class="challenge-title">看球下单累计得60元红包</text>
          </view>
          <text class="challenge-sub">下单满额即可解锁，多买多省</text>
        </view>
        <view class="progress-section">
          <view class="progress-bar-bg">
            <view class="progress-bar-fill" :style="{ width: challengeProgress + '%' }" />
          </view>
          <view class="progress-nodes">
            <view
              v-for="(node, idx) in challengeNodes"
              :key="idx"
              :class="['progress-node', node.reached && 'reached']"
            >
              <view class="node-dot">
                <text v-if="node.reached" class="node-check">√</text>
              </view>
              <text class="node-amount">¥{{ node.amount }}</text>
            </view>
          </view>
        </view>
        <view class="challenge-foot">
          <text class="challenge-progress-text">当前进度 ¥{{ challengeCurrent }}/¥{{ challengeTotal }}</text>
          <view class="challenge-btn" @tap="goChallenge">去完成</view>
        </view>
      </view>

      <!-- 福利区 2：神券天天膨 -->
      <view class="section-expand">
        <view class="section-title-row">
          <view class="section-title-left">
            <CategoryIcon name="star" :size="18" class="section-icon star-icon" />
            <text class="section-title">神券天天膨</text>
          </view>
          <text class="section-more">查看更多 ></text>
        </view>
        <view class="expand-list">
          <view
            v-for="pkg in expandPackages"
            :key="pkg.id"
            class="expand-card"
          >
            <view class="expand-info">
              <view class="expand-price-row">
                <text class="expand-price">¥{{ pkg.price }}</text>
                <text class="expand-origin">¥{{ pkg.originPrice }}</text>
              </view>
              <text class="expand-desc">{{ pkg.desc }}</text>
              <view class="expand-tags">
                <text v-for="(tag, tIdx) in pkg.tags" :key="tIdx" class="expand-tag">{{ tag }}</text>
              </view>
            </view>
            <view class="expand-action">
              <view class="expand-btn" @tap="expandCoupon(pkg)">去膨胀</view>
              <text class="expand-sales">{{ pkg.sales }}人已膨</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 用券下单商家列表 -->
      <view class="section-merchant">
        <view class="section-title-row">
          <view class="section-title-left">
            <CategoryIcon name="shop" :size="18" class="section-icon shop-icon" />
            <text class="section-title">用券下单</text>
          </view>
          <text class="section-more">附近商家 ></text>
        </view>
        <scroll-view scroll-x class="merchant-scroll" show-scrollbar="false">
          <view
            v-for="m in merchants"
            :key="m.id"
            class="merchant-card"
            @tap="goMerchant(m)"
          >
            <view class="merchant-logo" :style="{ background: m.logoBg }">
              <text class="merchant-initial">{{ m.name[0] }}</text>
            </view>
            <text class="merchant-name">{{ m.name }}</text>
            <view class="merchant-meta">
              <text class="merchant-time">{{ m.time }}分钟</text>
              <text class="merchant-distance">{{ m.distance }}km</text>
            </view>
            <view class="merchant-coupon">
              <text class="merchant-coupon-text">{{ m.couponTip }}</text>
            </view>
          </view>
        </scroll-view>
      </view>

      <!-- 我的优惠券标签页 -->
      <view class="my-coupons">
        <view class="coupon-tabs">
          <view
            v-for="t in tabs"
            :key="t.value"
            :class="['coupon-tab', status === t.value && 'tab-active']"
            @tap="status = t.value"
          >
            {{ t.label }} ({{ counts[t.value] }})
          </view>
        </view>

        <view v-if="!list.length" class="empty">
          <CategoryIcon name="ticket-empty" :size="72" class="empty-icon" />
          <text class="empty-text">暂无{{ statusLabel }}优惠券</text>
          <view class="empty-btn" @tap="goGetCoupon">去领券</view>
        </view>

        <view v-else class="coupon-list">
          <view
            v-for="c in list"
            :key="c.id"
            :class="['coupon-card', c.status === 'used' && 'used', c.status === 'expired' && 'expired']"
          >
            <view class="coupon-left" :style="{ background: leftBg(c) }">
              <view class="coupon-amount">
                <text v-if="c.type === 'amount'" class="coupon-symbol">¥</text>
                <text class="coupon-value">{{ c.value }}</text>
                <text v-if="c.type === 'discount'" class="coupon-unit">折</text>
              </view>
              <text class="coupon-condition">{{ c.condition }}</text>
            </view>
            <view class="coupon-right">
              <view>
                <text class="coupon-title">{{ c.name }}</text>
                <text class="coupon-desc">{{ c.desc }}</text>
              </view>
              <view class="coupon-meta">
                <text>{{ c.expire }} 到期</text>
                <view v-if="c.status === 'unused'" class="coupon-btn" @tap="useCoupon(c)">去使用</view>
                <text v-else class="coupon-status">{{ c.status === 'used' ? '已使用' : '已过期' }}</text>
              </view>
              <text v-if="c.status === 'used'" class="stamp">已使用</text>
              <text v-if="c.status === 'expired'" class="stamp expired-stamp">已过期</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <GlobalTabbar />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { MOCK_COUPONS } from '@/mock'
import { useTabStore } from '@/store/tab'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import GlobalTabbar from '@/components/GlobalTabbar/GlobalTabbar.vue'

const tabStore = useTabStore()
const status = ref<'unused' | 'used' | 'expired'>('unused')
const coupons = ref(MOCK_COUPONS)

const tabs = [
  { label: '未使用', value: 'unused' as const },
  { label: '已使用', value: 'used' as const },
  { label: '已过期', value: 'expired' as const }
]

const list = computed(() => coupons.value.filter(c => c.status === status.value))

const counts = computed(() => ({
  unused: coupons.value.filter(c => c.status === 'unused').length,
  used: coupons.value.filter(c => c.status === 'used').length,
  expired: coupons.value.filter(c => c.status === 'expired').length
}))

const totalCoupons = computed(() => coupons.value.length)

const statusLabel = computed(() => {
  const map: Record<string, string> = { unused: '未使用', used: '已使用', expired: '已过期' }
  return map[status.value]
})

// 福利挑战
const challengeTotal = 60
const challengeCurrent = 35
const challengeProgress = computed(() => Math.min(100, (challengeCurrent / challengeTotal) * 100))
const challengeNodes = [
  { amount: 20, reached: challengeCurrent >= 20 },
  { amount: 25, reached: challengeCurrent >= 45 },
  { amount: 25, reached: challengeCurrent >= 60 }
]

// 膨胀券包
const expandPackages = [
  {
    id: 1,
    price: 29.9,
    originPrice: 100,
    desc: '得 20 张 ¥5 神券',
    tags: ['全场通用', '可膨胀'],
    sales: '1.2万'
  },
  {
    id: 2,
    price: 10.8,
    originPrice: 30,
    desc: '得 6 张 ¥3 神券',
    tags: ['天天可领', '限时特惠'],
    sales: '8千'
  }
]

// 商家列表
const merchants = [
  { id: 1, name: '麦当劳', time: 30, distance: 1.2, couponTip: '满30减10', logoBg: 'linear-gradient(135deg, #FFC300, #FF4B33)' },
  { id: 2, name: '肯德基', time: 35, distance: 1.5, couponTip: '可用红包', logoBg: 'linear-gradient(135deg, #FF6B6B, #FF4B33)' },
  { id: 3, name: '喜茶', time: 25, distance: 0.8, couponTip: '无门槛券', logoBg: 'linear-gradient(135deg, #00C853, #00B248)' },
  { id: 4, name: '瑞幸咖啡', time: 20, distance: 0.6, couponTip: '满20减5', logoBg: 'linear-gradient(135deg, #2196F3, #1976D2)' },
  { id: 5, name: '必胜客', time: 40, distance: 2.1, couponTip: '大额满减', logoBg: 'linear-gradient(135deg, #9C27B0, #7B1FA2)' }
]

onShow(() => {
  tabStore.setActiveTab('/pages/coupon/index')
})

function leftBg(c: any) {
  if (c.status !== 'unused') return '#CCCCCC'
  if (c.bg) return c.bg
  return 'linear-gradient(135deg, #FF4B33 0%, #FF6B6B 100%)'
}

function useCoupon(c: any) {
  uni.showToast({ title: `使用 ${c.name}`, icon: 'none' })
}

function expandCoupon(pkg: any) {
  uni.showToast({ title: `去膨胀 ¥${pkg.price} 券包`, icon: 'none' })
}

function goChallenge() {
  uni.showToast({ title: '跳转任务页', icon: 'none' })
}

function goMerchant(m: any) {
  uni.showToast({ title: `进入 ${m.name}`, icon: 'none' })
}

function goGetCoupon() {
  uni.showToast({ title: '去领券中心', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.coupon-center {
  min-height: 100vh;
  background: $bg;
  font-family: $font-family;
  padding-bottom: 24px;
}

/* 头部 */
.header {
  position: relative;
}

.header-bg {
  background: linear-gradient(135deg, #FF4B33 0%, #FF6B6B 40%, #FFC300 100%);
  padding: 16px 16px 28px;
  border-radius: 0 0 24px 24px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-title {
  font-size: 22px;
  font-weight: 800;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}

.header-count {
  background: rgba(255, 255, 255, 0.22);
  border-radius: 20px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
  backdrop-filter: blur(4px);
}

.count-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.95);
}

.count-value {
  font-size: 18px;
  font-weight: 800;
  color: #fff;
  margin: 0 4px;
}

.header-tip {
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 16px;
  padding: 5px 12px;
  font-size: 12px;
  color: #fff;
}

.tip-icon {
  color: #fff;
  margin-right: 6px;
}

/* 内容区 */
.content {
  margin-top: -18px;
  padding: 0 12px;
  position: relative;
  z-index: 1;
}

/* 福利挑战卡 */
.challenge-card {
  background: linear-gradient(135deg, #FF4B33 0%, #FF6B6B 60%, #FFC300 100%);
  border-radius: $radius-lg;
  padding: 16px;
  color: #fff;
  box-shadow: $shadow-md;
  margin-bottom: 14px;
}

.challenge-head {
  margin-bottom: 14px;
}

.challenge-title-row {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}

.challenge-fire {
  color: #fff;
  margin-right: 6px;
}

.challenge-title {
  font-size: 17px;
  font-weight: 700;
}

.challenge-sub {
  font-size: 12px;
  opacity: 0.92;
  margin-left: 24px;
}

.progress-section {
  margin-bottom: 14px;
}

.progress-bar-bg {
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #FFC300, #FFE082);
  border-radius: 5px;
  transition: width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.progress-nodes {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.progress-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: rgba(255, 255, 255, 0.85);
}

.node-dot {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.progress-node.reached .node-dot {
  background: #fff;
  border-color: #fff;
}

.node-check {
  color: $secondary;
  font-size: 12px;
  font-weight: 700;
}

.node-amount {
  font-size: 13px;
  font-weight: 700;
}

.challenge-foot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.08);
  border-radius: $radius-md;
  padding: 10px 12px;
}

.challenge-progress-text {
  font-size: 12px;
  font-weight: 600;
}

.challenge-btn {
  background: #fff;
  color: $secondary;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* 分区标题 */
.section-expand,
.section-merchant,
.my-coupons {
  margin-bottom: 14px;
}

.section-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.section-title-left {
  display: flex;
  align-items: center;
}

.section-icon {
  margin-right: 6px;
}

.star-icon {
  color: $secondary;
}

.shop-icon {
  color: $primary-dark;
}

.section-title {
  font-size: 16px;
  font-weight: 700;
  color: $text;
}

.section-more {
  font-size: 12px;
  color: $text-muted;
}

/* 膨胀券包 */
.expand-list {
  display: flex;
  gap: 10px;
}

.expand-card {
  flex: 1;
  background: linear-gradient(135deg, #FFF8E1 0%, #FFFDE7 100%);
  border-radius: $radius-md;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #FFE082;
  box-shadow: $shadow;
}

.expand-info {
  flex: 1;
}

.expand-price-row {
  display: flex;
  align-items: baseline;
  margin-bottom: 4px;
}

.expand-price {
  font-size: 22px;
  font-weight: 800;
  color: $secondary;
}

.expand-origin {
  font-size: 12px;
  color: $text-muted;
  text-decoration: line-through;
  margin-left: 6px;
}

.expand-desc {
  display: block;
  font-size: 13px;
  color: $text;
  font-weight: 600;
  margin-bottom: 6px;
}

.expand-tags {
  display: flex;
  gap: 6px;
}

.expand-tag {
  font-size: 10px;
  color: $secondary;
  background: rgba(255, 75, 51, 0.1);
  padding: 2px 6px;
  border-radius: 8px;
}

.expand-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
}

.expand-btn {
  background: linear-gradient(135deg, $secondary 0%, $secondary-light 100%);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  padding: 7px 14px;
  border-radius: 16px;
  box-shadow: 0 3px 8px rgba(255, 75, 51, 0.28);
}

.expand-sales {
  font-size: 10px;
  color: $text-muted;
  margin-top: 5px;
}

/* 商家横向滚动 */
.merchant-scroll {
  white-space: nowrap;
}

.merchant-card {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: $card;
  border-radius: $radius-md;
  padding: 12px;
  margin-right: 10px;
  width: 100px;
  box-shadow: $shadow;
}

.merchant-logo {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
}

.merchant-initial {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.merchant-name {
  font-size: 13px;
  font-weight: 600;
  color: $text;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: center;
}

.merchant-meta {
  display: flex;
  gap: 8px;
  margin-bottom: 6px;
}

.merchant-time,
.merchant-distance {
  font-size: 11px;
  color: $text-light;
}

.merchant-coupon {
  background: linear-gradient(90deg, #FFF3E0, #FFECB3);
  border-radius: 10px;
  padding: 3px 8px;
}

.merchant-coupon-text {
  font-size: 10px;
  color: $secondary;
  font-weight: 600;
}

/* 我的优惠券 */
.my-coupons {
  background: $card;
  border-radius: $radius-lg;
  box-shadow: $shadow;
  overflow: hidden;
}

.coupon-tabs {
  display: flex;
  border-bottom: 1px solid $border;
}

.coupon-tab {
  flex: 1;
  text-align: center;
  padding: 14px 0;
  font-size: 14px;
  color: $text-light;
  position: relative;
  font-weight: 500;
}

.tab-active {
  color: $secondary;
  font-weight: 700;
}

.tab-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 3px;
  background: $secondary;
  border-radius: 2px;
}

.empty {
  text-align: center;
  padding: 48px 0;
  color: $text-muted;
}

.empty-icon {
  display: flex;
  justify-content: center;
  color: $text-muted;
  opacity: 0.45;
  margin-bottom: 12px;
}

.empty-text {
  display: block;
  font-size: 14px;
  margin-bottom: 14px;
}

.empty-btn {
  display: inline-block;
  background: linear-gradient(90deg, $secondary, $secondary-light);
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  padding: 7px 22px;
  border-radius: 18px;
  box-shadow: 0 3px 8px rgba(255, 75, 51, 0.22);
}

.coupon-list {
  padding: 12px;
}

.coupon-card {
  background: #fff;
  margin-bottom: 12px;
  border-radius: 12px;
  display: flex;
  overflow: hidden;
  box-shadow: $shadow;
  position: relative;
}

.coupon-left {
  width: 110px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px 8px;
  position: relative;
}

.coupon-left::before,
.coupon-left::after {
  content: '';
  position: absolute;
  right: -6px;
  width: 12px;
  height: 12px;
  background: #fff;
  border-radius: 50%;
}

.coupon-left::before { top: -6px; }
.coupon-left::after { bottom: -6px; }

.coupon-amount {
  display: flex;
  align-items: baseline;
}

.coupon-symbol {
  font-size: 18px;
}

.coupon-value {
  font-size: 36px;
  font-weight: 800;
  line-height: 1;
}

.coupon-unit {
  font-size: 14px;
}

.coupon-condition {
  font-size: 11px;
  margin-top: 4px;
  text-align: center;
  opacity: 0.95;
}

.coupon-right {
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-left: 1px dashed #F0F0F0;
  position: relative;
}

.coupon-title {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: $text;
}

.coupon-desc {
  display: block;
  font-size: 12px;
  color: $text-muted;
  margin-top: 4px;
}

.coupon-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
  color: $text-muted;
  margin-top: 10px;
}

.coupon-btn {
  background: linear-gradient(90deg, $secondary, $secondary-light);
  color: #fff;
  border: none;
  padding: 5px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(255, 75, 51, 0.2);
}

.coupon-status {
  color: $text-muted;
  font-size: 12px;
}

.coupon-card.used .coupon-left,
.coupon-card.expired .coupon-left {
  background: #CCCCCC !important;
}

.coupon-card.used .coupon-btn,
.coupon-card.expired .coupon-btn {
  background: #CCCCCC;
}

.stamp {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%) rotate(-15deg);
  color: rgba(255, 75, 51, 0.28);
  font-size: 22px;
  font-weight: 800;
  border: 3px solid rgba(255, 75, 51, 0.28);
  padding: 4px 10px;
  border-radius: 6px;
}

.expired-stamp {
  color: rgba(153, 153, 153, 0.35);
  border-color: rgba(153, 153, 153, 0.35);
}
</style>