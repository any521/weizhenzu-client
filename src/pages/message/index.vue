<template>
  <view class="messages">
    <view v-if="!list.length" class="empty">
      <text class="empty-icon">🔔</text>
      <text class="empty-text">暂无消息</text>
    </view>
    <view v-else class="message-list">
      <view
        v-for="m in list"
        :key="m.id"
        :class="['msg-item', m.unread ? 'msg-unread' : 'msg-read']"
        @tap="onRead(m)"
      >
        <view class="m-icon-wrap">
          <text class="m-icon">📢</text>
          <text v-if="m.unread" class="m-dot"></text>
        </view>
        <view class="m-body">
          <view class="m-top">
            <text class="m-title">{{ m.title }}</text>
            <text class="m-time">{{ m.time }}</text>
          </view>
          <text class="m-content">{{ m.content }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { MOCK_MESSAGES } from '@/mock'

const list = ref<any[]>([])

onShow(() => load())

function load() {
  list.value = MOCK_MESSAGES.map(m => ({ ...m }))
}

function onRead(m: any) {
  if (m.unread) {
    m.unread = false
    uni.showToast({ title: '已标记为已读', icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.messages {
  min-height: 100vh;
  background: $bg;
  padding: 12px 16px;
}

.empty {
  text-align: center;
  padding: 80px 0;
  color: $text-muted;
  .empty-icon { display: block; font-size: 60px; opacity: 0.5; margin-bottom: 12px; }
}

.msg-item {
  display: flex;
  background: #fff;
  margin-bottom: 10px;
  border-radius: $radius-md;
  padding: 14px;
  box-shadow: $shadow;
}

.msg-unread {
  border-left: 3px solid $primary;
}

.msg-read {
  border-left: 3px solid transparent;
}

.m-icon-wrap {
  position: relative;
  margin-right: 12px;
}

.m-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.m-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #FF3B30;
  border-radius: 50%;
  border: 2px solid #fff;
}

.m-body {
  flex: 1;
  min-width: 0;
}

.m-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.m-title {
  font-size: 15px;
  font-weight: 600;
  color: $text;
}

.m-time {
  font-size: 11px;
  color: $text-muted;
}

.m-content {
  display: block;
  font-size: 13px;
  color: $text-light;
  line-height: 1.5;
}
</style>
