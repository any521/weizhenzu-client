<template>
  <view class="page">
    <!-- 商家信息头 -->
    <view class="merchant-header">
      <view class="merchant-info-row">
        <view class="merchant-logo" :style="{ background: merchant.bg }">{{ merchant.logo }}</view>
        <view class="merchant-detail">
          <view class="merchant-name-row">{{ merchant.name }}</view>
          <view class="merchant-rating">
            <view class="star"><CategoryIcon name="star" :size="10" /> {{ merchant.rating }}</view>
            <text>月售 {{ merchant.monthlySales }}</text>
            <text>起送 ¥{{ merchant.minOrder }}</text>
            <text>配送 ¥{{ merchant.deliveryFee }}</text>
          </view>
        </view>
      </view>
      <view class="merchant-promo-row">
        <text v-for="(tag, idx) in merchant.tags" :key="idx" :class="['tag', `tag-${tag.type}`]">{{ tag.text }}</text>
      </view>
    </view>

    <!-- Tabs -->
    <view class="filter-tabs">
      <text
        v-for="(tab, idx) in tabs"
        :key="idx"
        :class="['filter-tab', activeTab === idx && 'active']"
        @tap="activeTab = idx"
      >{{ tab }}</text>
    </view>

    <!-- 点餐内容 -->
    <scroll-view v-if="activeTab === 0" scroll-y class="menu-content" :style="{ height: contentHeight + 'px' }">
      <view v-for="(section, sIdx) in menuSections" :key="sIdx" class="menu-section">
        <view class="menu-section-title">
          <CategoryIcon :name="section.icon" :size="12" />
          <text>{{ section.title }}</text>
        </view>
        <view
          v-for="d in section.dishes"
          :key="d.id"
          class="menu-item"
          @tap="goDish(d.id)"
        >
          <view class="menu-item-img" :style="{ background: d.bg }"></view>
          <view class="menu-item-info">
            <view class="menu-item-name">{{ d.name }}</view>
            <view class="menu-item-desc">{{ d.desc }}</view>
            <view class="menu-item-stats">月售 {{ d.sales }} <view class="star"><CategoryIcon name="star" :size="10" /> {{ (d.rating / 20).toFixed(1) }}</view></view>
            <view class="menu-item-bottom">
              <view class="menu-item-price">
                ¥{{ d.price }}
                <text v-if="d.originalPrice" class="old">¥{{ d.originalPrice }}</text>
              </view>
              <view class="qty-control" v-if="d.qty > 0" @tap.stop>
                <text class="qty-btn minus" @tap="onDec(d)">−</text>
                <text class="qty-num">{{ d.qty }}</text>
                <text class="qty-btn plus" @tap="onInc(d)">+</text>
              </view>
              <view v-else class="add-btn" @tap.stop="onInc(d)">+</view>
            </view>
          </view>
        </view>
      </view>
      <view style="height: 80px;"></view>
    </scroll-view>

    <!-- 评价内容 -->
    <scroll-view v-else-if="activeTab === 1" scroll-y class="tab-content" :style="{ height: contentHeight + 'px' }">
      <view class="rating-summary">
        <view class="rating-score">
          <text class="score">{{ merchant.rating }}</text>
          <text class="score-label">商家评分</text>
        </view>
        <view class="rating-tags">
          <text v-for="(tag, idx) in ratingTags" :key="idx" class="rating-tag">{{ tag }}</text>
        </view>
      </view>
      <view class="comment-list">
        <view v-for="i in 3" :key="i" class="comment-item">
          <view class="comment-user">
            <view class="user-avatar"><CategoryIcon name="user" :size="14" /></view>
            <text class="user-name">用户{{ 1000 + i }}</text>
          </view>
          <view class="comment-content">
            <view class="star"><CategoryIcon v-for="n in 5" :key="n" name="star" :size="10" /></view>
            <text class="comment-text">味道不错，配送很快，下次还会再来！</text>
          </view>
        </view>
      </view>
      <view style="height: 80px;"></view>
    </scroll-view>

    <!-- 商家内容 -->
    <scroll-view v-else scroll-y class="tab-content" :style="{ height: contentHeight + 'px' }">
      <view class="notice-card">
        <view class="notice-title">商家公告</view>
        <text class="notice-text">{{ merchant.notice }}</text>
      </view>
      <view class="info-card">
        <view class="info-title">商家信息</view>
        <view class="info-line"><text>配送时间</text><text>{{ merchant.deliveryTime }}</text></view>
        <view class="info-line"><text>起送价</text><text>¥{{ merchant.minOrder }}</text></view>
        <view class="info-line"><text>配送费</text><text>¥{{ merchant.deliveryFee }}</text></view>
      </view>
      <view style="height: 80px;"></view>
    </scroll-view>

    <FloatingCart :count="cartStore.totalCount" @tap="goCart" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { MOCK_MERCHANT_DETAIL, MOCK_DISHES, MOCK_RATING_TAGS } from '@/mock'
import FloatingCart from '@/components/FloatingCart/FloatingCart.vue'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import { useCartStore } from '@/store/cart'

const merchant = ref(MOCK_MERCHANT_DETAIL)
const dishes = ref(MOCK_DISHES.map(d => ({ ...d })))
const ratingTags = ref(MOCK_RATING_TAGS)
const tabs = ref(['点餐', `评价 ${MOCK_MERCHANT_DETAIL.monthlySales}`, '商家'])
const activeTab = ref(0)
const contentHeight = ref(600)
const cartStore = useCartStore()

const menuSections = computed(() => {
  return [
    { title: '招牌推荐', dishes: dishes.value.slice(0, 4), icon: 'fire' },
    { title: '人气单品', dishes: dishes.value.slice(4), icon: 'star' }
  ]
})

onLoad((q: any) => {
  // 可依据 q.id 切换商家，当前使用 Mock
  uni.getSystemInfo({
    success: (res: any) => {
      contentHeight.value = res.windowHeight - 220
    }
  })
})

function onInc(d: any) {
  d.qty++
  cartStore.addOrUpdate({
    dishId: d.id,
    name: d.name,
    spec: '默认',
    price: d.price,
    qty: 1
  })
  uni.showToast({ title: '已加入购物车', icon: 'success' })
}
function onDec(d: any) {
  if (d.qty > 0) {
    d.qty--
    cartStore.changeQty(d.id, -1)
  }
}
function goDish(id: number) {
  uni.navigateTo({ url: `/pages/dish/detail?id=${id}` })
}
function goCart() {
  uni.switchTab({ url: '/pages/cart/index' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $bg;
  position: relative;
  padding-bottom: 80px;
}

.merchant-header {
  background: #fff;
  padding: 12px 16px 12px;
}

.merchant-info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
}

.merchant-logo {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 22px;
  flex-shrink: 0;
}

.merchant-detail {
  flex: 1;
  min-width: 0;
}

.merchant-name-row {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
}

.merchant-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: $text-muted;
}

.merchant-rating .star {
  color: $primary;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.merchant-promo-row {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 8px;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 600;
}

.tag-primary {
  background: rgba(255, 107, 53, 0.1);
  color: $primary;
}

.tag-success {
  background: rgba(76, 175, 80, 0.1);
  color: $success;
}

.filter-tabs {
  background: #fff;
  display: flex;
  padding: 0 16px;
  border-bottom: 1px solid $border;
  border-top: 8px solid $bg;
}

.filter-tab {
  padding: 12px 0;
  margin-right: 20px;
  font-size: 14px;
  color: $text-light;
  position: relative;
}

.filter-tab.active {
  color: $primary;
  font-weight: 600;
}

.filter-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: $primary;
  border-radius: 2px;
}

.menu-content,
.tab-content {
  background: $bg;
}

.menu-section {
  background: #fff;
  margin-top: 8px;
  padding: 12px 16px;
}

.menu-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.menu-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid $border;
  position: relative;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item-img {
  width: 84px;
  height: 84px;
  border-radius: 8px;
  flex-shrink: 0;
}

.menu-item-info {
  flex: 1;
  min-width: 0;
}

.menu-item-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.menu-item-desc {
  font-size: 12px;
  color: $text-muted;
  margin-bottom: 6px;
  line-height: 1.4;
}

.menu-item-stats {
  font-size: 11px;
  color: $text-muted;
  margin-bottom: 6px;
}

.menu-item-stats .star {
  color: $primary;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.menu-item-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-item-price {
  color: $primary;
  font-size: 16px;
  font-weight: 700;
}

.menu-item-price .old {
  color: #999;
  font-size: 11px;
  text-decoration: line-through;
  margin-left: 4px;
  font-weight: 400;
}

.qty-control {
  display: flex;
  align-items: center;
  gap: 6px;
}

.qty-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.qty-btn.minus {
  border: 1px solid $primary;
  background: #fff;
  color: $primary;
}

.qty-btn.plus {
  background: $primary;
  color: #fff;
}

.qty-num {
  min-width: 24px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
}

.add-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: $primary;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.rating-summary {
  background: #fff;
  margin-top: 8px;
  padding: 16px;
  display: flex;
  gap: 16px;
}

.rating-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 80px;
}

.rating-score .score {
  font-size: 32px;
  font-weight: 800;
  color: $primary;
}

.rating-score .score-label {
  font-size: 11px;
  color: $text-muted;
}

.rating-tags {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-content: center;
}

.rating-tag {
  padding: 4px 10px;
  background: rgba(255, 107, 53, 0.1);
  color: $primary;
  border-radius: 12px;
  font-size: 11px;
}

.comment-list {
  background: #fff;
  margin-top: 8px;
  padding: 0 16px;
}

.comment-item {
  padding: 14px 0;
  border-bottom: 1px solid $border;
}

.comment-user {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.user-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.user-name {
  font-size: 13px;
  color: $text-light;
}

.comment-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.comment-content .star {
  color: $primary;
  font-size: 12px;
  display: inline-flex;
  align-items: center;
  gap: 1px;
}

.comment-text {
  font-size: 13px;
  color: $text;
  line-height: 1.5;
}

.notice-card,
.info-card {
  background: #fff;
  margin: 8px 16px 0;
  border-radius: 12px;
  padding: 16px;
  box-shadow: $shadow;
}

.notice-title,
.info-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
}

.notice-text {
  font-size: 13px;
  color: $text-light;
  line-height: 1.6;
}

.info-line {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 13px;
  color: $text-light;
  border-bottom: 1px solid $border;
}

.info-line:last-child {
  border-bottom: none;
}

</style>
