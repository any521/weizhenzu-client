<template>
  <view class="map-page">
    <!-- 顶部阶段提示 -->
    <view class="map-header">
      <view class="back-btn" @tap="goBack">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </view>
      <view class="phase-info">
        <text class="phase-title">{{ phaseTitle }}</text>
        <text class="phase-sub">{{ distance ? `距离您 ${distance} 米 · ` : '' }}{{ estimateTime ? `预计 ${estimateTime} 到达` : '配送中' }}</text>
      </view>
      <view class="header-right" />
    </view>

    <!-- 地图占位区 -->
    <view class="map-container">
      <view class="map-placeholder">
        <CategoryIcon name="location" :size="72" />
        <text class="map-tip">配送地图导航</text>
        <text class="map-sub">骑手正在朝您赶来</text>
      </view>
    </view>

    <!-- 底部骑手信息 -->
    <view class="rider-panel">
      <view class="rider-info">
        <view class="rider-avatar">
          <CategoryIcon name="avatar" :size="32" />
        </view>
        <view class="rider-text">
          <view class="rider-name">{{ rider.name || '骑手信息加载中' }}</view>
          <view class="rider-desc">{{ [rider.level, rider.vehicle].filter(Boolean).join(' · ') || '配送中' }}</view>
        </view>
      </view>
      <view class="rider-actions">
        <view class="rider-btn" @tap="callRider">
          <CategoryIcon name="service" :size="18" />
          <text>联系</text>
        </view>
        <view class="rider-btn primary" @tap="nextPhase">{{ nextBtnText }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import { getOrderDelivery } from '@/api'

const phases = ['商家已接单', '骑手已到店', '骑手已取餐', '正在配送', '已送达']
const phaseIndex = ref(0)
const distance = ref(0)
const estimateTime = ref('')
const rider = ref({ name: '', level: '', phone: '', virtualPhone: '', avatar: '', vehicle: '' })

const phaseTitle = computed(() => phases[phaseIndex.value] || '')
const nextBtnText = computed(() => phaseIndex.value < phases.length - 1 ? '下一步' : '确认送达')

onLoad((q: any) => {
  if (q?.id) {
    fetchDelivery(q.id)
  }
})

async function fetchDelivery(id: string | number) {
  try {
    const delivery: any = await getOrderDelivery(id)
    if (delivery?.rider) {
      rider.value = {
        name: delivery.rider.name || '',
        level: delivery.rider.rating ? `评分 ${delivery.rider.rating}` : '',
        phone: delivery.rider.phone || '',
        virtualPhone: delivery.rider.phone || '',
        avatar: delivery.rider.avatar || '',
        vehicle: ''
      }
    }
    if (delivery?.steps?.length) {
      const idx = delivery.steps.findIndex((s: any) => !s.done)
      phaseIndex.value = idx === -1 ? delivery.steps.length - 1 : Math.max(0, idx - 1)
    }
    if (delivery?.expectedTime) {
      const t = delivery.expectedTime
      estimateTime.value = t.length >= 16 ? t.slice(11, 16) : t
    }
  } catch (e) {
    console.error('加载配送信息失败', e)
  }
}

function nextPhase() {
  if (phaseIndex.value < phases.length - 1) {
    phaseIndex.value++
  } else {
    uni.showToast({ title: '已送达', icon: 'success' })
  }
}

function callRider() {
  const phone = rider.value.virtualPhone || rider.value.phone
  if (!phone) {
    uni.showToast({ title: '暂无骑手联系方式', icon: 'none' })
    return
  }
  uni.showModal({
    title: '联系骑手',
    content: `拨打 ${phone}`,
    confirmText: '拨打',
    success: (r) => {
      if (r.confirm) {
        uni.makePhoneCall({ phoneNumber: phone })
      }
    }
  })
}

function goBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.map-page {
  min-height: 100vh;
  background: #e8f4f8;
  position: relative;
}

.map-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text;
}

.phase-info {
  flex: 1;
  text-align: center;
}

.phase-title {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: $text;
}

.phase-sub {
  display: block;
  font-size: 11px;
  color: $text-muted;
  margin-top: 2px;
}

.header-right {
  width: 36px;
}

.map-container {
  height: 100vh;
  padding-top: 60px;
}

.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $primary;
}

.map-tip {
  font-size: 16px;
  font-weight: 700;
  color: $text;
  margin-top: 14px;
}

.map-sub {
  font-size: 13px;
  color: $text-muted;
  margin-top: 6px;
}

.rider-panel {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  background: $card;
  border-radius: $radius-lg;
  padding: 16px;
  box-shadow: $shadow-lg;
}

.rider-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
}

.rider-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: $bg;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary;
}

.rider-name {
  font-size: 15px;
  font-weight: 700;
  color: $text;
}

.rider-desc {
  font-size: 12px;
  color: $text-muted;
  margin-top: 3px;
}

.rider-actions {
  display: flex;
  gap: 12px;
}

.rider-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background: rgba($primary, 0.08);
  color: $primary;
  padding: 11px 0;
  border-radius: 22px;
  font-size: 14px;
  font-weight: 600;
}

.rider-btn.primary {
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
}
</style>
