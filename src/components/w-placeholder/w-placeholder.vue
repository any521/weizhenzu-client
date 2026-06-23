<template>
  <view class="placeholder">
    <text class="p-icon">🍽️</text>
    <text class="p-title">{{ title }}</text>
    <text class="p-desc">{{ desc }}</text>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

defineProps<{ title?: string; desc?: string }>()
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;
.placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; padding: 40px;
  .p-icon { font-size: 80px; opacity: 0.5; margin-bottom: 16px; }
  .p-title { font-size: 18px; color: $text; font-weight: 600; margin-bottom: 8px; }
  .p-desc { font-size: 13px; color: $text-muted; text-align: center; }
}
</style>
