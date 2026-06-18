<template>
  <view class="orders-page">
    <view class="orders-header">
      <text class="orders-header-title">我的订单</text>
    </view>

    <view class="orders-tabs">
      <view
        v-for="(tab, idx) in tabs"
        :key="idx"
        :class="['orders-tab', activeIdx === idx && 'active']"
        @tap="switchTab(idx)"
      >
        <text class="orders-tab-text">{{ tab }}</text>
        <view class="orders-tab-line"></view>
      </view>
    </view>

    <scroll-view scroll-y class="orders-body" :style="{ height: bodyHeight + 'px' }">
      <view v-if="loading" class="orders-loading">
        <view class="orders-loading-spinner"></view>
        <text class="orders-loading-text">努力加载中...</text>
      </view>

      <template v-else>
        <view v-if="activeIdx === 0" class="orders-shops">
          <text class="orders-shops-title">买过的店</text>
          <scroll-view scroll-x class="orders-shops-scroll" show-scrollbar="false">
            <view class="orders-shops-list">
              <view v-for="shop in visitedShops" :key="shop.id" class="orders-shop-card">
                <view class="orders-shop-img" :style="{ background: shop.bg }">
                  <CategoryIcon name="shop" :size="24" />
                </view>
                <text class="orders-shop-name">{{ shop.name }}</text>
                <text class="orders-shop-count">买过 {{ shop.count }} 次</text>
              </view>
            </view>
          </scroll-view>
        </view>

        <view v-if="filteredOrders.length > 0" class="orders-list">
          <view
            v-for="order in filteredOrders"
            :key="order.id"
            class="orders-card"
          >
            <view class="orders-card-header">
              <view class="orders-merchant">
                <view class="orders-merchant-img" :style="{ background: order.merchantBg }">
                  <CategoryIcon name="shop" :size="18" />
                </view>
                <text class="orders-merchant-name">{{ order.merchantName }}</text>
                <text class="orders-merchant-arrow">></text>
              </view>
              <text :class="['orders-status', `orders-status-${order.statusType}`]">{{ order.statusText }}</text>
            </view>

            <view class="orders-card-body" @tap="goDetail(order.id)">
              <view class="orders-dish-img" :style="{ background: order.merchantBg }">
                <CategoryIcon :name="order.icon || 'package'" :size="28" />
              </view>
              <view class="orders-dish-info">
                <text class="orders-dish-name">{{ order.dishName }}</text>
                <text class="orders-dish-spec">{{ order.spec }}</text>
                <view class="orders-dish-bottom">
                  <text class="orders-dish-count">共 {{ order.count }} 件</text>
                  <text class="orders-dish-price">
                    <text class="orders-dish-price-symbol">¥</text>
                    <text class="orders-dish-price-num">{{ order.amount }}</text>
                  </text>
                </view>
              </view>
            </view>

            <view class="orders-card-footer">
              <text class="orders-time">{{ order.time }}</text>
              <view class="orders-actions">
                <view
                  v-for="(btn, bIdx) in order.btns"
                  :key="bIdx"
                  :class="['orders-action-btn', btn.type === 'primary' && 'primary', btn.type === 'secondary' && 'secondary']"
                  @tap="onBtnClick(order, btn)"
                >
                  <text>{{ btn.text }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <view v-else-if="activeIdx === 1" class="orders-empty">
          <view class="orders-empty-icon">
            <CategoryIcon name="comment" :size="72" />
          </view>
          <text class="orders-empty-title">哇，订单全部都评论完了~</text>
          <text class="orders-empty-subtitle">快去下单尝鲜吧</text>
        </view>

        <view v-else-if="activeIdx === 2" class="orders-empty">
          <view class="orders-empty-icon">
            <CategoryIcon name="refund" :size="72" />
          </view>
          <text class="orders-empty-title">暂无退款订单</text>
          <text class="orders-empty-subtitle">购物无忧，售后有保障</text>
        </view>

        <view v-else class="orders-empty">
          <view class="orders-empty-icon">
            <CategoryIcon name="ticket-empty" :size="72" />
          </view>
          <text class="orders-empty-title">暂无相关订单</text>
          <text class="orders-empty-subtitle">去看看有什么好店吧</text>
        </view>
      </template>

      <view style="height: 20px;"></view>
    </scroll-view>

    <!-- #ifdef H5 -->
    <GlobalTabbar />
    <!-- #endif -->
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { useTabStore } from '@/store/tab'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import GlobalTabbar from '@/components/GlobalTabbar/GlobalTabbar.vue'

const tabStore = useTabStore()
const tabs = ref(['全部订单', '待评价', '退款/售后'])
const activeIdx = ref(0)
const loading = ref(false)
const bodyHeight = ref(600)

onShow(() => {
  tabStore.setActiveTab('/pages/order/list')
})

onLoad(() => {
  uni.getSystemInfo({
    success: (res: any) => {
      bodyHeight.value = res.windowHeight - 44 - 48
    }
  })
})

const visitedShops = ref([
  { id: 's1', name: '必胜客', count: 3, bg: 'linear-gradient(135deg, #FF6B6B, #FF4B33)' },
  { id: 's2', name: '麦当劳', count: 5, bg: 'linear-gradient(135deg, #FFC300, #FF9900)' },
  { id: 's3', name: '喜茶', count: 2, bg: 'linear-gradient(135deg, #00C853, #00B248)' },
  { id: 's4', name: '海底捞', count: 1, bg: 'linear-gradient(135deg, #E53935, #C62828)' },
  { id: 's5', name: '瑞幸咖啡', count: 4, bg: 'linear-gradient(135deg, #2196F3, #1976D2)' }
])

const allOrders = ref([
  {
    id: 'o1',
    merchantName: '麦当劳（科技园店）',
    merchantBg: 'linear-gradient(135deg, #FFC300, #FF9900)',
    statusText: '已完成',
    statusType: 'default',
    dishName: '巨无霸套餐 + 麦辣鸡翅 + 可乐',
    spec: '巨无霸去酱 / 中杯可乐加冰',
    count: 3,
    amount: '42.50',
    time: '2026-06-17 12:30',
    icon: 'package',
    btns: [
      { text: '评价', type: 'primary' },
      { text: '再来一单', type: 'default' }
    ]
  },
  {
    id: 'o2',
    merchantName: '喜茶（万象天地店）',
    merchantBg: 'linear-gradient(135deg, #00C853, #00B248)',
    statusText: '待评价',
    statusType: 'warning',
    dishName: '多肉葡萄 + 芝芝莓莓',
    spec: '少冰 / 少糖',
    count: 2,
    amount: '38.00',
    time: '2026-06-17 15:20',
    icon: 'package',
    btns: [
      { text: '去评价', type: 'primary' },
      { text: '再来一单', type: 'default' }
    ]
  },
  {
    id: 'o3',
    merchantName: '海底捞火锅（海岸城店）',
    merchantBg: 'linear-gradient(135deg, #E53935, #C62828)',
    statusText: '退款中',
    statusType: 'danger',
    dishName: '麻辣锅底 + 招牌虾滑 + 肥牛卷',
    spec: '中辣 / 3人份',
    count: 5,
    amount: '268.00',
    time: '2026-06-16 19:00',
    icon: 'refund',
    btns: [
      { text: '查看进度', type: 'primary' },
      { text: '再来一单', type: 'default' }
    ]
  },
  {
    id: 'o4',
    merchantName: '瑞幸咖啡（软件园店）',
    merchantBg: 'linear-gradient(135deg, #2196F3, #1976D2)',
    statusText: '已完成',
    statusType: 'default',
    dishName: '生椰拿铁',
    spec: '大杯 / 去冰 / 不另外加糖',
    count: 1,
    amount: '18.90',
    time: '2026-06-16 09:15',
    icon: 'package',
    btns: [
      { text: '再来一单', type: 'default' }
    ]
  },
  {
    id: 'o5',
    merchantName: '必胜客（中心城店）',
    merchantBg: 'linear-gradient(135deg, #FF6B6B, #FF4B33)',
    statusText: '已完成',
    statusType: 'default',
    dishName: '超级至尊披萨套餐',
    spec: '9寸 / 铁盘 / 芝心',
    count: 2,
    amount: '99.00',
    time: '2026-06-15 18:40',
    icon: 'package',
    btns: [
      { text: '评价', type: 'primary' },
      { text: '再来一单', type: 'default' }
    ]
  }
])

const filteredOrders = computed(() => {
  if (activeIdx.value === 0) return allOrders.value
  if (activeIdx.value === 1) return allOrders.value.filter(o => o.statusText === '待评价')
  if (activeIdx.value === 2) return allOrders.value.filter(o => ['退款中', '已退款'].includes(o.statusText))
  return allOrders.value
})

function switchTab(idx: number) {
  if (activeIdx.value === idx || loading.value) return
  activeIdx.value = idx
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 800)
}

function goDetail(id: string) {
  uni.navigateTo({ url: `/pages/order/detail?id=${id}` })
}

function onBtnClick(order: any, btn: any) {
  if (btn.text === '再来一单') {
    uni.showToast({ title: '已加入购物车', icon: 'none' })
  } else if (btn.text === '评价' || btn.text === '去评价') {
    uni.showToast({ title: '跳转评价页面', icon: 'none' })
  } else if (btn.text === '查看进度') {
    uni.showToast({ title: '查看退款进度', icon: 'none' })
  } else {
    uni.showToast({ title: btn.text, icon: 'none' })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.orders-page {
  min-height: 100vh;
  background: $bg;
}

.orders-header {
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, $header-start, $header-end);
}

.orders-header-title {
  font-size: 17px;
  font-weight: 700;
  color: $text;
}

.orders-tabs {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: $card;
  padding: 0 16px;
  border-bottom: 1px solid $border;
}

.orders-tab {
  position: relative;
  padding: 14px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.orders-tab-text {
  font-size: 14px;
  color: $text-light;
  transition: color 0.2s;
}

.orders-tab-line {
  position: absolute;
  bottom: 6px;
  width: 0;
  height: 3px;
  border-radius: 2px;
  background: $primary;
  transition: width 0.2s;
}

.orders-tab.active .orders-tab-text {
  color: $text;
  font-weight: 700;
}

.orders-tab.active .orders-tab-line {
  width: 24px;
}

.orders-body {
  background: $bg;
}

.orders-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 120px;
}

.orders-loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid rgba($primary, 0.25);
  border-top-color: $primary;
  border-radius: 50%;
  animation: orders-spin 0.8s linear infinite;
}

@keyframes orders-spin {
  to {
    transform: rotate(360deg);
  }
}

.orders-loading-text {
  margin-top: 12px;
  font-size: 13px;
  color: $text-muted;
}

.orders-shops {
  margin: 12px 16px 0;
  padding: 14px 0 14px 14px;
  background: $card;
  border-radius: $radius-lg;
  box-shadow: $shadow;
}

.orders-shops-title {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: $text;
  margin-bottom: 12px;
}

.orders-shops-scroll {
  width: 100%;
}

.orders-shops-list {
  display: flex;
  flex-direction: row;
}

.orders-shop-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 72px;
  margin-right: 14px;
  flex-shrink: 0;
}

.orders-shop-img {
  width: 56px;
  height: 56px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 8px;
}

.orders-shop-name {
  font-size: 12px;
  color: $text;
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.orders-shop-count {
  font-size: 11px;
  color: $text-muted;
  margin-top: 2px;
}

.orders-list {
  padding-top: 12px;
}

.orders-card {
  margin: 0 16px 12px;
  background: $card;
  border-radius: $radius-lg;
  box-shadow: $shadow;
  overflow: hidden;
}

.orders-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
}

.orders-merchant {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.orders-merchant-img {
  width: 28px;
  height: 28px;
  border-radius: $radius-sm;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-right: 8px;
  flex-shrink: 0;
}

.orders-merchant-name {
  font-size: 15px;
  font-weight: 600;
  color: $text;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.orders-merchant-arrow {
  font-size: 13px;
  color: $text-muted;
  margin-left: 4px;
}

.orders-status {
  font-size: 13px;
  font-weight: 500;
  flex-shrink: 0;
  margin-left: 8px;
}

.orders-status-default {
  color: $text-muted;
}

.orders-status-warning {
  color: $warning;
}

.orders-status-danger {
  color: $danger;
}

.orders-card-body {
  display: flex;
  padding: 0 16px 14px;
}

.orders-dish-img {
  width: 72px;
  height: 72px;
  border-radius: $radius-md;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-right: 12px;
  flex-shrink: 0;
}

.orders-dish-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.orders-dish-name {
  font-size: 14px;
  font-weight: 500;
  color: $text;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.orders-dish-spec {
  font-size: 12px;
  color: $text-muted;
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.orders-dish-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 8px;
}

.orders-dish-count {
  font-size: 12px;
  color: $text-muted;
}

.orders-dish-price {
  color: $text;
}

.orders-dish-price-symbol {
  font-size: 12px;
  font-weight: 600;
}

.orders-dish-price-num {
  font-size: 18px;
  font-weight: 700;
}

.orders-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-top: 1px solid $border;
}

.orders-time {
  font-size: 12px;
  color: $text-muted;
}

.orders-actions {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.orders-action-btn {
  padding: 6px 14px;
  border-radius: 16px;
  border: 1px solid $border;
  background: $card;
}

.orders-action-btn text {
  font-size: 13px;
  color: $text-light;
}

.orders-action-btn.primary {
  background: $primary;
  border-color: $primary;
}

.orders-action-btn.primary text {
  color: $text;
  font-weight: 600;
}

.orders-action-btn.secondary {
  background: $secondary;
  border-color: $secondary;
}

.orders-action-btn.secondary text {
  color: #fff;
}

.orders-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
}

.orders-empty-icon {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $primary;
  box-shadow: $shadow;
  margin-bottom: 24px;
}

.orders-empty-title {
  font-size: 15px;
  color: $text-light;
  margin-bottom: 8px;
}

.orders-empty-subtitle {
  font-size: 13px;
  color: $text-muted;
}
</style>
