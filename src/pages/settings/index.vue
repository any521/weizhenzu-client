<template>
  <view class="settings">
    <!-- 顶部标题栏 -->
    <view class="navbar">
      <view class="back-btn" @tap="goBack">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </view>
      <text class="navbar-title">设置</text>
      <view class="navbar-right" />
    </view>

    <!-- 设置列表 -->
    <view class="settings-body">
      <view class="group">
        <view v-for="item in generalSettings" :key="item.text" class="cell" @tap="onTap(item.text)">
          <text class="cell-text">{{ item.text }}</text>
          <view class="cell-right">
            <text v-if="item.sub" class="cell-sub">{{ item.sub }}</text>
            <text class="cell-arrow">›</text>
          </view>
        </view>
      </view>

      <view class="group">
        <view v-for="item in accountSettings" :key="item.text" class="cell" @tap="onTap(item.text)">
          <text class="cell-text">{{ item.text }}</text>
          <view class="cell-right">
            <text v-if="item.sub" class="cell-sub">{{ item.sub }}</text>
            <text class="cell-arrow">›</text>
          </view>
        </view>
      </view>

      <view class="group">
        <view class="cell" @tap="onClearCache">
          <text class="cell-text">清除缓存</text>
          <view class="cell-right">
            <text class="cell-sub">12.5MB</text>
            <text class="cell-arrow">›</text>
          </view>
        </view>
        <view class="cell cell-danger" @tap="onLogout">
          <text class="cell-text">退出登录</text>
          <view class="cell-right">
            <text class="cell-arrow">›</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const generalSettings = [
  { text: '聊天', sub: '' },
  { text: '禁止代下单设置', sub: '' }
]

const accountSettings = [
  { text: '账号与安全', sub: '' },
  { text: '支付设置', sub: '' },
  { text: '消息通知', sub: '' },
  { text: '隐私管理', sub: '' },
  { text: '关于我们', sub: 'v1.0.0' }
]

function goBack() {
  uni.navigateBack()
}

function onTap(text: string) {
  uni.showToast({ title: `${text} 开发中`, icon: 'none' })
}

function onClearCache() {
  uni.showToast({ title: '清除缓存成功', icon: 'none' })
}

function onLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({ title: '已退出登录', icon: 'none' })
      }
    }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.settings {
  min-height: 100vh;
  background: $bg;
}

.navbar {
  height: calc($status-bar-height + $navbar-height);
  padding-top: $status-bar-height;
  background: $card;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text;
}

.navbar-title {
  flex: 1;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: $text;
}

.navbar-right {
  width: 44px;
}

.settings-body {
  padding: 12px 0 24px;
}

.group {
  background: $card;
  margin: 0 0 12px;
  padding: 0 16px;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid $border;
}

.cell:last-child {
  border-bottom: none;
}

.cell-text {
  font-size: 15px;
  color: $text;
}

.cell-right {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cell-sub {
  font-size: 13px;
  color: $text-muted;
}

.cell-arrow {
  font-size: 16px;
  color: $text-muted;
}

.cell-danger .cell-text {
  color: $danger;
}
</style>