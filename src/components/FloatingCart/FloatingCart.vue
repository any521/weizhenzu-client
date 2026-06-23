<template>
  <view
    class="floating-cart"
    :class="{ dragging: dragging }"
    :style="positionStyle"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @tap="onTap"
  >
    <view class="floating-cart-inner">
      <CategoryIcon name="cart" :size="26" />
      <text v-if="count > 0" class="floating-badge">{{ count > 99 ? '99+' : count }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'

const props = defineProps<{
  count?: number
}>()

const emit = defineEmits<{
  (e: 'tap'): void
}>()

const count = computed(() => props.count || 0)

// 悬浮球尺寸与边距
const BALL_SIZE = 52
const MARGIN_X = 12
const MARGIN_BOTTOM = 100 // 避开自定义 tabbar + 一点间距

const screenWidth = ref(375)
const screenHeight = ref(667)
const safeBottom = ref(0)

const pos = ref({ x: 0, y: 0 })
const dragging = ref(false)
const moved = ref(false)
const start = ref({ x: 0, y: 0, px: 0, py: 0 })

// 初始化位置：右下角
uni.getSystemInfo({
  success: (res: any) => {
    screenWidth.value = res.windowWidth
    screenHeight.value = res.windowHeight
    safeBottom.value = res.safeAreaInsets?.bottom || 0
    pos.value = {
      x: res.windowWidth - BALL_SIZE - MARGIN_X,
      y: res.windowHeight - BALL_SIZE - MARGIN_BOTTOM - safeBottom.value
    }
  }
})

const positionStyle = computed(() => ({
  left: `${pos.value.x}px`,
  top: `${pos.value.y}px`,
  width: `${BALL_SIZE}px`,
  height: `${BALL_SIZE}px`
}))

function onTouchStart(e: any) {
  const touch = e.touches[0]
  start.value = {
    x: touch.clientX - pos.value.x,
    y: touch.clientY - pos.value.y,
    px: touch.clientX,
    py: touch.clientY
  }
  dragging.value = true
  moved.value = false
}

function onTouchMove(e: any) {
  if (!dragging.value) return
  const touch = e.touches[0]
  // 判定是否产生移动（避免点击时触发 touchend 误判为拖动）
  if (Math.abs(touch.clientX - start.value.px) > 3 || Math.abs(touch.clientY - start.value.py) > 3) {
    moved.value = true
  }
  let nx = touch.clientX - start.value.x
  let ny = touch.clientY - start.value.y
  // 边界限制
  nx = Math.max(MARGIN_X, Math.min(screenWidth.value - BALL_SIZE - MARGIN_X, nx))
  ny = Math.max(80, Math.min(screenHeight.value - BALL_SIZE - MARGIN_BOTTOM - safeBottom.value, ny))
  pos.value = { x: nx, y: ny }
  // 阻止滚动
  if (e.preventDefault) e.preventDefault()
}

function onTouchEnd() {
  dragging.value = false
  snapToEdge()
}

function snapToEdge() {
  const centerX = pos.value.x + BALL_SIZE / 2
  const half = screenWidth.value / 2
  const targetX = centerX < half ? MARGIN_X : screenWidth.value - BALL_SIZE - MARGIN_X
  pos.value = { ...pos.value, x: targetX }
}

function onTap() {
  if (moved.value) return
  emit('tap')
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.floating-cart {
  position: fixed;
  z-index: 888;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.25s cubic-bezier(0.25, 0.1, 0.25, 1), top 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
}

.floating-cart.dragging {
  transition: none;
}

.floating-cart-inner {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, $primary 0%, $primary-light 100%);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.floating-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  background: #FF3B30;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
}
</style>
