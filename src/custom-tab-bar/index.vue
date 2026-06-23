<template>
  <view class="custom-tab-bar">
    <view class="tab-main">
      <view
        v-for="tab in leftTabs"
        :key="tab.pagePath"
        class="tab-item"
        :class="{ active: tabStore.activeTab === tab.pagePath }"
        @tap="switchTab(tab)"
      >
        <view class="tab-icon">
          <CategoryIcon :name="tab.iconName" :size="24" />
        </view>
        <text class="tab-text">{{ tab.text }}</text>
      </view>

      <view class="tab-center" @tap="onCenterTap">
        <view class="center-btn">
          <text class="center-main">100元</text>
          <text class="center-sub">连续下单</text>
        </view>
      </view>

      <view
        v-for="tab in rightTabs"
        :key="tab.pagePath"
        class="tab-item"
        :class="{ active: tabStore.activeTab === tab.pagePath }"
        @tap="switchTab(tab)"
      >
        <view class="tab-icon">
          <CategoryIcon :name="tab.iconName" :size="24" />
        </view>
        <text class="tab-text">{{ tab.text }}</text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import { useTabStore } from '@/store/tab'

const tabStore = useTabStore()

const leftTabs = [
  { pagePath: '/pages/index/index', text: '外卖', iconName: 'home' },
  { pagePath: '/pages/coupon/index', text: '神券', iconName: 'ticket' }
]

const rightTabs = [
  { pagePath: '/pages/order/list', text: '订单', iconName: 'order' },
  { pagePath: '/pages/profile/index', text: '我的', iconName: 'profile' }
]

function switchTab(tab: any) {
  if (tabStore.activeTab === tab.pagePath) return
  tabStore.setActiveTab(tab.pagePath)
  uni.switchTab({ url: tab.pagePath })
}

function onCenterTap() {
  uni.showToast({ title: '连续下单活动', icon: 'none' })
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.custom-tab-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-top: 1px solid $border;
  padding-bottom: env(safe-area-inset-bottom);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.04);
  z-index: 999;
}

.tab-main {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
}

.tab-item {
  width: 0;
  flex: 1;
  height: 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  color: $text-muted;
  transition: color 0.2s ease;
}

.tab-icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-text {
  font-size: 10px;
  line-height: 1.2;
}

.tab-item.active {
  color: $primary-text;
}

.tab-item.active .tab-icon {
  color: $primary;
  transform: scale(1.08);
}

.tab-center {
  width: 80px;
  height: 80px;
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.center-btn {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(180deg, #FFD100 0%, #FFC300 100%);
  box-shadow: 0 4px 14px rgba(255, 195, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $text;
  border: 4px solid #fff;
}

.center-main {
  font-size: 15px;
  font-weight: 800;
  line-height: 1.1;
}

.center-sub {
  font-size: 9px;
  font-weight: 600;
  transform: scale(0.9);
}
</style>
