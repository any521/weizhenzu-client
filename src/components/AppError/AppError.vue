<template>
  <view class="app-error">
    <view class="error-icon">
      <CategoryIcon name="close" :size="iconSize" />
    </view>
    <text class="error-title">{{ title }}</text>
    <text v-if="subtitle" class="error-subtitle">{{ subtitle }}</text>
    <view v-if="retryText" class="error-btn" @tap="onRetry">{{ retryText }}</view>
  </view>
</template>

<script setup lang="ts">
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  retryText?: string
  iconSize?: number
}>(), {
  title: '加载失败',
  subtitle: '',
  retryText: '重新加载',
  iconSize: 64
})

const emit = defineEmits<{
  (e: 'retry'): void
}>()

function onRetry() {
  emit('retry')
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.app-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
}

.error-icon {
  color: $text-muted;
  opacity: 0.6;
  margin-bottom: 16px;
}

.error-title {
  font-size: 15px;
  font-weight: 600;
  color: $text;
  margin-bottom: 8px;
}

.error-subtitle {
  font-size: 13px;
  color: $text-light;
  line-height: 1.5;
}

.error-btn {
  margin-top: 20px;
  background: $primary;
  color: $text;
  font-size: 14px;
  font-weight: 600;
  padding: 10px 28px;
  border-radius: 20px;
}
</style>