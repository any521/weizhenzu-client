<template>
  <view class="map-page">
    <!-- 顶部搜索栏 -->
    <view class="map-header">
      <view class="back-btn" @tap="goBack">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </view>
      <view class="map-search">
        <CategoryIcon name="search" :size="16" class="search-icon" />
        <input v-model="keyword" class="search-input" type="text" placeholder="搜索地点" confirm-type="search" @confirm="onSearch" />
      </view>
      <view class="header-action" @tap="onSearch">搜索</view>
    </view>

    <!-- 地图占位区 -->
    <view class="map-container">
      <view class="map-placeholder">
        <CategoryIcon name="location" :size="64" />
        <text class="map-tip">地图选点</text>
        <text class="map-sub">{{ selected.name || '请选择收货地址' }}</text>
      </view>
    </view>

    <!-- POI 列表 -->
    <scroll-view scroll-y class="poi-list" :style="{ height: listHeight + 'px' }">
      <view v-if="!poiList.length" class="poi-empty">
        <text>暂无搜索结果</text>
      </view>
      <view
        v-for="(poi, idx) in poiList"
        :key="idx"
        :class="['poi-item', selectedIndex === idx && 'active']"
        @tap="selectPoi(idx)"
      >
        <view class="poi-icon">
          <CategoryIcon name="location" :size="20" />
        </view>
        <view class="poi-body">
          <view class="poi-name">{{ poi.name }}</view>
          <view class="poi-address">{{ poi.address }}</view>
        </view>
        <view v-if="selectedIndex === idx" class="poi-check">
          <CategoryIcon name="check" :size="18" />
        </view>
      </view>
    </scroll-view>

    <!-- 底部确认 -->
    <view class="map-footer">
      <view class="footer-info">
        <text class="footer-name">{{ selected.name || '请选择地址' }}</text>
        <text class="footer-address">{{ selected.address || '' }}</text>
      </view>
      <view class="confirm-btn" @tap="confirm">确认选点</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'

const keyword = ref('')
const selectedIndex = ref(0)
const poiList = ref<any[]>([])
const listHeight = ref(300)

const selected = computed(() => poiList.value[selectedIndex.value] || {})

onMounted(() => {
  uni.getSystemInfo({
    success: (res: any) => {
      listHeight.value = res.windowHeight - 44 - 280 - 80
    }
  })
})

function onSearch() {
  const kw = keyword.value.trim()
  if (!kw) {
    poiList.value = []
    return
  }
  // 无地图 SDK 时无法搜索，清空列表显示空状态
  poiList.value = []
  selectedIndex.value = 0
}

function selectPoi(idx: number) {
  selectedIndex.value = idx
}

function confirm() {
  const poi = selected.value
  if (!poi.name) {
    uni.showToast({ title: '请选择地址', icon: 'none' })
    return
  }
  uni.setStorageSync('wzz_map_selected_poi', poi)
  uni.showToast({ title: '已选择地址', icon: 'success' })
  setTimeout(() => uni.navigateBack(), 600)
}

function goBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.map-page {
  min-height: 100vh;
  background: $bg;
}

.map-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: $card;
  border-bottom: 1px solid $border;
}

.back-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text;
}

.map-search {
  flex: 1;
  display: flex;
  align-items: center;
  height: 38px;
  background: $bg;
  border-radius: 19px;
  padding: 0 12px;
}

.search-icon {
  color: $text-muted;
  margin-right: 8px;
}

.search-input {
  flex: 1;
  font-size: 14px;
  color: $text;
}

.header-action {
  font-size: 14px;
  color: $primary;
  font-weight: 600;
}

.map-container {
  height: 280px;
  background: #e8f4f8;
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
  margin-top: 12px;
}

.map-sub {
  font-size: 13px;
  color: $text-muted;
  margin-top: 6px;
  padding: 0 24px;
  text-align: center;
}

.poi-list {
  background: $bg;
}

.poi-empty {
  text-align: center;
  padding: 60px 0;
  font-size: 13px;
  color: $text-muted;
}

.poi-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: $card;
  margin: 0 16px 10px;
  border-radius: $radius-lg;
  padding: 14px;
  box-shadow: $shadow;
}

.poi-item.active {
  border: 1px solid $primary;
}

.poi-icon {
  color: $primary;
}

.poi-body {
  flex: 1;
  min-width: 0;
}

.poi-name {
  font-size: 14px;
  font-weight: 600;
  color: $text;
}

.poi-address {
  font-size: 12px;
  color: $text-muted;
  margin-top: 4px;
}

.poi-check {
  color: $primary;
}

.map-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: $card;
  border-top: 1px solid $border;
  padding: 12px 16px calc(12px + env(safe-area-inset-bottom));
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-info {
  flex: 1;
  min-width: 0;
}

.footer-name {
  display: block;
  font-size: 15px;
  font-weight: 600;
  color: $text;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.footer-address {
  display: block;
  font-size: 12px;
  color: $text-muted;
  margin-top: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.confirm-btn {
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  padding: 11px 22px;
  border-radius: 22px;
}
</style>
