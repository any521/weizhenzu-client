<template>
  <view class="app-loading" :class="{ 'is-fullscreen': fullscreen }">
    <view class="spinner" :class="sizeClass" />
    <text v-if="text" class="loading-text">{{ text }}</text>
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  size?: 'small' | 'medium' | 'large'
  text?: string
  fullscreen?: boolean
}>(), {
  size: 'medium',
  text: '努力加载中...',
  fullscreen: false
})

const sizeClass = computed(() => `spinner--${props.size}`)
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.app-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 24px;
}

.app-loading.is-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  z-index: 999;
}

.spinner {
  border-radius: $radius-round;
  border: 3px solid rgba(255, 195, 0, 0.2);
  border-top-color: $primary;
  animation: spin 0.8s linear infinite;
}

.spinner--small {
  width: 18px;
  height: 18px;
  border-width: 2px;
}

.spinner--medium {
  width: 28px;
  height: 28px;
  border-width: 3px;
}

.spinner--large {
  width: 40px;
  height: 40px;
  border-width: 4px;
}

.loading-text {
  font-size: 13px;
  color: $text-light;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>