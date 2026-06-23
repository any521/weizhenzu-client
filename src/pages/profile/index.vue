<template>
  <view class="profile">
    <!-- 顶部黄色头部 -->
    <view class="profile-header">
      <view class="header-top">
        <view class="user-card">
          <view class="user-avatar">
            <CategoryIcon name="avatar" :size="40" />
          </view>
          <view class="user-info">
            <view class="user-name">
              <text>{{ userStore.userInfo?.nickname || '未登录' }}</text>
              <view class="auth-badge">实名待认证</view>
            </view>
          </view>
        </view>
        <view class="settings-btn" @tap="goSettings">
          <CategoryIcon name="settings" :size="22" />
        </view>
      </view>
    </view>

    <!-- 我的资产 -->
    <view class="assets-card">
      <view class="assets-title">我的资产</view>
      <view class="assets-list">
        <view v-for="a in assets" :key="a.label" class="assets-item" @tap="a.onTap">
          <view class="assets-value">{{ a.value }}</view>
          <view class="assets-label">{{ a.label }}</view>
        </view>
      </view>
    </view>

    <!-- 促销横幅 -->
    <view class="promo-banner" @tap="onPromo">
      <view class="promo-content">
        <view class="promo-title">25元神券</view>
        <view class="promo-subtitle">立即领取</view>
      </view>
      <view class="promo-btn">去领取</view>
    </view>

    <!-- 我的收藏 -->
    <view class="favorites-card" @tap="onFavorites">
      <view class="favorites-thumbs">
        <view v-for="i in 3" :key="i" class="favorites-thumb">
          <CategoryIcon name="shop" :size="24" />
        </view>
      </view>
      <view class="favorites-text">
        <text class="favorites-title">我的收藏</text>
        <text class="favorites-count">收藏了 {{ favoriteCount }} 个商家</text>
      </view>
      <text class="favorites-arrow">›</text>
    </view>

    <!-- 我的功能 -->
    <view class="menu-card">
      <view class="menu-title">我的功能</view>
      <view class="feature-grid">
        <view v-for="f in features" :key="f.text" class="feature-item" @tap="f.onTap">
          <view class="feature-icon" :style="{ background: f.bg }">
            <CategoryIcon :name="f.iconName" :size="22" />
          </view>
          <text class="feature-text">{{ f.text }}</text>
        </view>
      </view>
    </view>

    <!-- 更多推荐 -->
    <view class="menu-card">
      <view class="menu-title">更多推荐</view>
      <view class="recommend-list">
        <view v-for="r in recommends" :key="r.text" class="recommend-item" @tap="r.onTap">
          <view class="recommend-icon" :style="{ background: r.bg }">
            <CategoryIcon :name="r.iconName" :size="20" />
          </view>
          <view class="recommend-info">
            <text class="recommend-title">{{ r.text }}</text>
            <text v-if="r.sub" class="recommend-sub">{{ r.sub }}</text>
          </view>
          <text class="recommend-arrow">›</text>
        </view>
      </view>
    </view>

    <!-- #ifdef H5 -->
    <GlobalTabbar />
    <!-- #endif -->

    <!-- 底部安全区 -->
    <view class="safe-bottom" />
  </view>
</template>

<script setup lang="ts">
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import GlobalTabbar from '@/components/GlobalTabbar/GlobalTabbar.vue'
import { useTabStore } from '@/store/tab'
import { useUserStore } from '@/store/user'
import { onShow } from '@dcloudio/uni-app'
import { ref, onMounted } from 'vue'
import { getFavorites, getMyCoupons } from '@/api'

const tabStore = useTabStore()
const userStore = useUserStore()

const favoriteCount = ref(0)

const assets = ref([
  { value: 0, label: '红包/神券', onTap: () => uni.switchTab({ url: '/pages/coupon/index' }) },
  { value: 0, label: '商家代金券', onTap: () => uni.switchTab({ url: '/pages/coupon/index' }) },
  { value: 0, label: '神抢手券', onTap: () => uni.switchTab({ url: '/pages/coupon/index' }) },
  { value: 0, label: '美团币返利', onTap: () => uni.showToast({ title: '美团币返利', icon: 'none' }) },
  { value: 0, label: '津贴', onTap: () => uni.showToast({ title: '津贴', icon: 'none' }) }
])

async function loadProfileData() {
  try {
    const favPage = await getFavorites({ current: 1, size: 1 })
    favoriteCount.value = favPage.total || 0
  } catch (e) {
    console.error('加载收藏数失败', e)
    favoriteCount.value = 0
  }

  try {
    const couponsRes: any = await getMyCoupons()
    const list = couponsRes?.list || couponsRes || []
    const unusedCount = (list as any[]).filter((c: any) => c.status === 1).length
    assets.value[0].value = unusedCount
  } catch (e) {
    console.error('加载优惠券失败', e)
    assets.value[0].value = 0
  }
}

onMounted(() => {
  loadProfileData()
})

onShow(() => {
  tabStore.setActiveTab('/pages/profile/index')
})

const features = [
  { iconName: 'favorite', text: '我的收藏', bg: 'rgba(255, 75, 51, 0.12)', onTap: () => uni.navigateTo({ url: '/pages/favorites/index' }) },
  { iconName: 'address', text: '我的地址', bg: 'rgba(255, 195, 0, 0.12)', onTap: () => uni.navigateTo({ url: '/pages/address/list' }) },
  { iconName: 'coupon-card', text: '优惠券', bg: 'rgba(255, 75, 51, 0.12)', onTap: () => uni.switchTab({ url: '/pages/coupon/index' }) },
  { iconName: 'service', text: '客服中心', bg: 'rgba(0, 200, 83, 0.12)', onTap: () => uni.navigateTo({ url: '/pages/service/index' }) },
  { iconName: 'order', text: '我的评价', bg: 'rgba(255, 195, 0, 0.12)', onTap: () => uni.showToast({ title: '我的评价', icon: 'none' }) },
  { iconName: 'ticket', text: '发票助手', bg: 'rgba(255, 195, 0, 0.12)', onTap: () => uni.showToast({ title: '发票助手', icon: 'none' }) },
  { iconName: 'terms', text: '餐具设置', bg: 'rgba(255, 195, 0, 0.12)', onTap: () => uni.showToast({ title: '餐具设置', icon: 'none' }) }
]

const recommends = [
  { iconName: 'message', text: '消息中心', sub: '查看订单/优惠/系统消息', bg: 'rgba(255, 75, 51, 0.12)', onTap: () => uni.navigateTo({ url: '/pages/message/index' }) },
  { iconName: 'shop', text: '浣熊食堂招商', sub: '优质商家招募中', bg: 'rgba(255, 75, 51, 0.12)', onTap: () => uni.showToast({ title: '浣熊食堂招商', icon: 'none' }) }
]

function goSettings() {
  uni.navigateTo({ url: '/pages/settings/index' })
}

function onPromo() {
  uni.switchTab({ url: '/pages/coupon/index' })
}

function onFavorites() {
  uni.navigateTo({ url: '/pages/favorites/index' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.profile {
  min-height: 100vh;
  background: $bg;
  padding-bottom: 24px;
}

.profile-header {
  background: linear-gradient(180deg, $header-start 0%, $header-end 100%);
  padding: 52px 16px 28px;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 64px;
  height: 64px;
  border-radius: $radius-round;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary-dark;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.user-info {
  flex: 1;
}

.user-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: $text;
}

.auth-badge {
  font-size: 10px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 2px 6px;
  border-radius: 8px;
}

.settings-btn {
  width: 36px;
  height: 36px;
  border-radius: $radius-round;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text;
}

.assets-card {
  background: $card;
  margin: -16px 16px 0;
  border-radius: $radius-lg;
  padding: 16px 0 12px;
  box-shadow: $shadow;
  position: relative;
  z-index: 2;
}

.assets-title {
  font-size: 15px;
  font-weight: 700;
  color: $text;
  padding: 0 16px 12px;
}

.assets-list {
  display: flex;
  align-items: center;
  overflow-x: auto;
  padding: 0 8px;
}

.assets-item {
  flex: 1;
  min-width: 64px;
  text-align: center;
  padding: 8px 4px;
}

.assets-value {
  font-size: 18px;
  font-weight: 700;
  color: $text;
}

.assets-label {
  font-size: 11px;
  color: $text-light;
  margin-top: 4px;
}

.promo-banner {
  margin: 12px 16px 0;
  border-radius: $radius-md;
  background: linear-gradient(135deg, $secondary 0%, $primary 100%);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: $shadow;
}

.promo-content {
  color: #fff;
}

.promo-title {
  font-size: 18px;
  font-weight: 800;
}

.promo-subtitle {
  font-size: 12px;
  opacity: 0.95;
  margin-top: 2px;
}

.promo-btn {
  background: #fff;
  color: $secondary;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 16px;
}

.favorites-card {
  background: $card;
  margin: 12px 16px 0;
  border-radius: $radius-lg;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: $shadow;
}

.favorites-thumbs {
  display: flex;
  gap: 4px;
}

.favorites-thumb {
  width: 44px;
  height: 44px;
  border-radius: $radius-sm;
  background: $bg;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-muted;
}

.favorites-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.favorites-title {
  font-size: 15px;
  font-weight: 700;
  color: $text;
}

.favorites-count {
  font-size: 12px;
  color: $text-muted;
  margin-top: 2px;
}

.favorites-arrow {
  font-size: 18px;
  color: $text-muted;
}

.menu-card {
  background: $card;
  margin: 12px 16px 0;
  border-radius: $radius-lg;
  padding: 14px 0;
  box-shadow: $shadow;
}

.menu-title {
  font-size: 15px;
  font-weight: 700;
  color: $text;
  padding: 0 16px 12px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 0 8px;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 4px;
}

.feature-icon {
  width: 44px;
  height: 44px;
  border-radius: $radius-round;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary-dark;
}

.feature-text {
  font-size: 12px;
  color: $text-light;
}

.recommend-list {
  padding: 0 16px;
}

.recommend-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid $border;
}

.recommend-item:last-child {
  border-bottom: none;
}

.recommend-icon {
  width: 40px;
  height: 40px;
  border-radius: $radius-round;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text;
  flex-shrink: 0;
}

.recommend-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.recommend-title {
  font-size: 14px;
  color: $text;
}

.recommend-sub {
  font-size: 12px;
  color: $text-muted;
  margin-top: 2px;
}

.recommend-arrow {
  font-size: 16px;
  color: $text-muted;
}

.safe-bottom {
  height: calc($tabbar-height + 16px);
}
</style>