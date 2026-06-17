<template>
  <view class="search-page">
    <!-- 顶部搜索栏 -->
    <view class="search-header">
      <view class="back-btn" @tap="goBack">
        <view class="back-arrow" />
      </view>
      <view class="search-input-wrap">
        <CategoryIcon name="search" :size="18" class="search-icon" />
        <input
          v-model="keyword"
          class="search-input"
          type="text"
          focus
          placeholder="请输入商家或商品名称"
          placeholder-class="placeholder"
          confirm-type="search"
          @confirm="onSearch"
        />
        <view v-if="keyword" class="input-clear" @tap="keyword = ''">
          <CategoryIcon name="close" :size="14" />
        </view>
      </view>
      <view class="header-action" @tap="onSearch">搜索</view>
    </view>

    <!-- AI 助手入口 -->
    <view class="ai-entry" @tap="askAi">
      <view class="ai-badge">
        <text class="ai-name">问小团</text>
      </view>
      <text class="ai-tip">想吃什么？直接问我</text>
      <CategoryIcon name="search" :size="14" class="ai-arrow" />
    </view>

    <!-- 搜索结果区域 -->
    <view v-if="keyword.trim()" class="result-area">
      <view v-if="resultList.length" class="result-list">
        <view v-for="item in resultList" :key="item.id" class="shop-card">
          <view class="shop-img" :style="{ background: item.color }" />
          <view class="shop-info">
            <view class="shop-name">{{ item.name }}</view>
            <view class="shop-row">
              <text class="shop-score">{{ item.score }}分</text>
              <text class="shop-sale">月售{{ item.sale }}+</text>
            </view>
            <view class="shop-row">
              <text class="shop-fee">起送￥{{ item.minPrice }}</text>
              <text class="shop-fee">配送￥{{ item.delivery }}</text>
            </view>
          </view>
        </view>
      </view>
      <view v-else class="empty-result">
        <view class="empty-img" />
        <text>暂无“{{ keyword }}”相关结果</text>
      </view>
    </view>

    <!-- 默认内容区 -->
    <view v-else class="default-content">
      <!-- 历史搜索 -->
      <view class="section">
        <view class="section-title">
          <CategoryIcon name="history" :size="16" class="title-icon" />
          <text>历史搜索</text>
          <view v-if="history.length" class="section-action" @tap="clearHistory">
            <CategoryIcon name="close" :size="12" class="action-icon" />
            <text>清空</text>
          </view>
        </view>
        <view v-if="history.length" class="tags">
          <view
            v-for="h in history"
            :key="h"
            class="tag history-tag"
            @tap="fillAndSearch(h)"
          >
            {{ h }}
          </view>
        </view>
        <view v-else class="empty-tip">暂无搜索历史</view>
      </view>

      <!-- 猜你想搜 -->
      <view class="section">
        <view class="section-title">
          <CategoryIcon name="fire" :size="16" class="title-icon" />
          <text>猜你想搜</text>
          <view class="section-action" @tap="refreshGuess">
            <CategoryIcon name="search" :size="12" class="action-icon refresh-icon" />
            <text>换一批</text>
          </view>
        </view>
        <view class="tags">
          <view
            v-for="t in hotTags"
            :key="t"
            class="tag hot-tag"
            @tap="fillAndSearch(t)"
          >
            {{ t }}
          </view>
        </view>
      </view>

      <!-- 趋势播报 -->
      <view class="section trend-section">
        <view class="section-title">
          <text class="trend-title">趋势播报</text>
        </view>
        <view class="trend-list">
          <view
            v-for="(item, index) in trendList"
            :key="item.id"
            class="trend-item"
            @tap="fillAndSearch(item.title)"
          >
            <view class="trend-rank" :class="{ 'rank-top': index < 3 }">
              {{ index + 1 }}
            </view>
            <view class="trend-thumb" :style="{ background: item.color }" />
            <view class="trend-body">
              <view class="trend-name">{{ item.title }}</view>
              <view class="trend-meta">
                <text class="trend-heat">{{ item.heat }}万热度</text>
                <text v-if="index < 3" class="trend-tag hot-tag-text">热</text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'

const keyword = ref('')
const history = ref<string[]>([])

const guessPool = ref([
  '奶茶', '炸鸡', '烧烤', '火锅', '日料',
  '螺蛳粉', '麻辣烫', '汉堡', '寿司', '轻食',
  '小龙虾', '烤鱼', '饺子', '披萨', '粥'
])
const hotTags = computed(() => guessPool.value.slice(0, 8))

const trendList = ref([
  { id: 1, title: '夏日冰爽奶茶', heat: 128.5, color: '#FF6B6B' },
  { id: 2, title: '深夜烧烤摊', heat: 96.2, color: '#FFB347' },
  { id: 3, title: '麻辣小龙虾', heat: 84.7, color: '#FF4B33' },
  { id: 4, title: '减脂沙拉碗', heat: 62.1, color: '#4ECDC4' },
  { id: 5, title: '经典牛肉面', heat: 55.4, color: '#45B7D1' },
  { id: 6, title: '韩式炸鸡', heat: 48.9, color: '#96CEB4' },
  { id: 7, title: '手工水饺', heat: 41.3, color: '#DDA0DD' },
  { id: 8, title: '广式早茶', heat: 35.6, color: '#FFD93D' },
  { id: 9, title: '酸菜鱼', heat: 29.8, color: '#6BCB77' },
  { id: 10, title: '榴莲披萨', heat: 22.4, color: '#FF9F45' }
])

const resultList = computed(() => {
  const kw = keyword.value.trim()
  if (!kw) return []
  const colors = ['#FFC300', '#FF4B33', '#4ECDC4', '#45B7D1', '#96CEB4', '#FF6B6B', '#FFD93D', '#6BCB77']
  const names = [
    `${kw}专门店`, `正宗${kw}`, `${kw}·精选`, `${kw}小馆`,
    `网红${kw}`, `${kw}工坊`, `${kw}大王`, `老牌${kw}`
  ]
  return names.map((name, i) => ({
    id: i,
    name,
    score: (4 + Math.random() * 1).toFixed(1),
    sale: Math.floor(Math.random() * 900) + 100,
    minPrice: Math.floor(Math.random() * 20) + 10,
    delivery: Math.floor(Math.random() * 6),
    color: colors[i % colors.length]
  }))
})

onShow(() => {
  history.value = uni.getStorageSync('wzz_search_history') || []
})

function onSearch() {
  const kw = keyword.value.trim()
  if (!kw) return
  const list = history.value.filter(h => h !== kw)
  list.unshift(kw)
  history.value = list.slice(0, 10)
  uni.setStorageSync('wzz_search_history', history.value)
}

function fillAndSearch(text: string) {
  keyword.value = text
  onSearch()
}

function clearHistory() {
  uni.showModal({
    title: '提示',
    content: '确定清空搜索历史？',
    success: (r) => {
      if (r.confirm) {
        history.value = []
        uni.removeStorageSync('wzz_search_history')
      }
    }
  })
}

function refreshGuess() {
  const arr = [...guessPool.value]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  guessPool.value = arr
}

function askAi() {
  uni.showToast({ title: 'AI 助手正在赶来', icon: 'none' })
}

function goBack() {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.search-page {
  min-height: 100vh;
  background: $bg;
  font-family: $font-family;
  padding-bottom: 24px;
}

/* 顶部搜索栏 */
.search-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px 14px;
  background: linear-gradient(180deg, $header-start 0%, $primary 100%);
}

.back-btn {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-arrow {
  width: 10px;
  height: 10px;
  border-left: 2px solid $text;
  border-bottom: 2px solid $text;
  transform: rotate(45deg);
  margin-left: 6px;
}

.search-input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  height: 40px;
  background: #fff;
  border-radius: 20px;
  padding: 0 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
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

.placeholder {
  color: $text-muted;
  font-size: 14px;
}

.input-clear {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: $text-muted;
  color: #fff;
  margin-left: 8px;
}

.header-action {
  font-size: 15px;
  color: $text;
  font-weight: 500;
  padding: 0 4px;
}

/* AI 助手入口 */
.ai-entry {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 16px;
  padding: 12px 14px;
  background: $card;
  border-radius: $radius-lg;
  box-shadow: $shadow;
}

.ai-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 10px;
  background: linear-gradient(135deg, $primary-light 0%, $primary 100%);
  border-radius: 12px;
}

.ai-name {
  font-size: 13px;
  font-weight: 700;
  color: $text;
}

.ai-tip {
  flex: 1;
  font-size: 13px;
  color: $text-light;
}

.ai-arrow {
  color: $text-muted;
}

/* 默认内容区 */
.default-content {
  padding: 0 16px;
}

.section {
  margin-top: 18px;
  background: $card;
  border-radius: $radius-lg;
  padding: 16px;
  box-shadow: $shadow;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 15px;
  font-weight: 700;
  color: $text;
  margin-bottom: 12px;
}

.title-icon {
  color: $primary;
}

.section-action {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  color: $text-muted;
  font-weight: 400;
}

.action-icon {
  color: $text-muted;
}

.refresh-icon {
  transition: transform 0.3s ease;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  padding: 7px 14px;
  border-radius: 16px;
  font-size: 13px;
  background: $bg;
  color: $text;
}

.history-tag {
  color: $text-light;
}

.hot-tag {
  color: $text;
}

.empty-tip {
  font-size: 13px;
  color: $text-muted;
  padding: 6px 0;
}

/* 趋势播报 */
.trend-section {
  padding-bottom: 10px;
}

.trend-title {
  font-size: 15px;
  font-weight: 700;
  color: $text;
}

.trend-list {
  display: flex;
  flex-wrap: wrap;
}

.trend-item {
  width: 50%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
}

.trend-rank {
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 700;
  color: $text-light;
  background: #f0f0f0;
}

.rank-top {
  background: $secondary;
  color: #fff;
}

.trend-thumb {
  width: 40px;
  height: 40px;
  border-radius: $radius-md;
  flex-shrink: 0;
}

.trend-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.trend-name {
  font-size: 13px;
  color: $text;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.trend-meta {
  display: flex;
  align-items: center;
  gap: 6px;
}

.trend-heat {
  font-size: 11px;
  color: $text-muted;
}

.trend-tag {
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  background: rgba($secondary, 0.12);
  color: $secondary;
}

/* 搜索结果 */
.result-area {
  padding: 0 16px;
}

.result-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
}

.shop-card {
  display: flex;
  gap: 12px;
  background: $card;
  border-radius: $radius-lg;
  padding: 14px;
  box-shadow: $shadow;
}

.shop-img {
  width: 84px;
  height: 84px;
  border-radius: $radius-md;
  flex-shrink: 0;
}

.shop-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.shop-name {
  font-size: 15px;
  font-weight: 600;
  color: $text;
}

.shop-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.shop-score {
  font-size: 14px;
  font-weight: 700;
  color: $secondary;
}

.shop-sale,
.shop-fee {
  font-size: 12px;
  color: $text-muted;
}

.empty-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  font-size: 14px;
  color: $text-light;
}

.empty-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #eee;
  margin-bottom: 16px;
}
</style>
