<template>
  <view class="home">
    <!-- 黄色顶部区域 -->
    <view class="home-header">
      <view class="header-top">
        <view class="header-tabs">
          <text
            v-for="t in topTabs"
            :key="t"
            :class="['top-tab', activeTopTab === t && 'top-tab-active']"
            @tap="activeTopTab = t"
          >{{ t }}</text>
        </view>
        <view class="header-msg" @tap="goMessage">
          <CategoryIcon name="message" :size="22" />
        </view>
      </view>

      <view class="location-bar" @tap="onLocationTap">
        <CategoryIcon name="location" :size="16" />
        <text class="loc-text">{{ locationText }}</text>
        <text class="loc-arrow">▼</text>
      </view>

      <view class="search-bar" @tap="goSearch">
        <CategoryIcon name="search" :size="16" />
        <text class="search-placeholder">搜索商家或商品</text>
        <text class="search-btn">搜索</text>
      </view>
    </view>

    <!-- 分类横向滚动 -->
    <scroll-view scroll-x class="category-scroll" :show-scrollbar="false">
      <view class="category-row">
        <view
          v-for="cat in displayCategories"
          :key="cat.id"
          class="category-item"
          @tap="onCategoryTap(cat)"
        >
          <view class="icon-wrapper" :style="{ background: cat.bg }">
            <CategoryIcon :name="cat.iconName" :size="26" />
          </view>
          <text class="category-name">{{ cat.name }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 拼好饭精选 -->
    <view class="deal-section">
      <view class="deal-header">
        <view class="deal-title">
          <text class="deal-name">精选推荐</text>
          <text class="deal-tag">0起送 0配送</text>
        </view>
        <text class="deal-more">更多 ›</text>
      </view>
      <scroll-view scroll-x class="deal-scroll" :show-scrollbar="false">
        <view
          v-for="d in deals"
          :key="d.id"
          class="deal-card"
          @tap="goMerchantDetail(d.merchantId)"
        >
          <view class="deal-img" :style="{ background: d.bg }"></view>
          <text class="deal-food">{{ d.name }}</text>
          <text class="deal-price">
            <text class="price-symbol">¥</text>{{ d.price }}
          </text>
        </view>
      </scroll-view>
    </view>

    <!-- 优惠券条（左右滑动） -->
    <scroll-view v-if="coupons.length" scroll-x class="coupon-scroll" :show-scrollbar="false">
      <view class="coupon-strip">
        <view
          v-for="c in coupons"
          :key="c.id"
          class="coupon-item coupon-red"
          @tap="onCouponTap(c)"
        >
          <view class="coupon-val">{{ couponValue(c) }}</view>
          <view class="coupon-info">
            <text class="coupon-name">{{ c.name }}</text>
            <text class="coupon-rule">{{ couponRule(c) }}</text>
          </view>
          <text class="coupon-action">{{ c.canReceive ? '领取' : '去使用' }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 附近商家 -->
    <view class="merchant-section">
      <view class="section-header">
        <text class="section-title">附近商家</text>
        <text class="section-sub">特价外卖</text>
        <text class="section-more" @tap="goMerchantList">一键下单</text>
      </view>
      <view class="filter-bar">
        <text
          v-for="f in filters"
          :key="f"
          :class="['filter-item', activeFilter === f && 'filter-active']"
          @tap="activeFilter = f"
        >{{ f }}</text>
        <view class="filter-toggle">
          <CategoryIcon name="list" :size="14" />
        </view>
      </view>

      <view v-if="loading" class="loading-wrap">
        <view class="loading-spinner"></view>
        <text class="loading-text">加载中...</text>
      </view>

      <view class="merchant-list">
        <view
          v-for="m in merchants"
          :key="m.id"
          class="merchant-card"
          @tap="goMerchantDetail(m.id)"
        >
          <view class="merchant-img" :style="{ background: m.bg }">
            <text class="merchant-logo-text">{{ m.logo }}</text>
          </view>
          <view class="merchant-info">
            <view class="merchant-name">
              <text>{{ m.name }}</text>
              <CategoryIcon v-if="m.top" name="star" :size="10" class="top-star" />
            </view>
            <view class="merchant-meta">
              <view class="meta-score">
                <CategoryIcon name="star" :size="9" />
                <text class="score-num">{{ m.rating }}</text>
              </view>
              <text>月售 {{ m.monthlySales > 999 ? '1000+' : m.monthlySales }}</text>
              <text class="meta-right">{{ m.deliveryTime }} · {{ m.distance || '920m' }}</text>
            </view>
            <view class="merchant-price">
              <text>起送 ¥{{ m.minOrder }}</text>
              <text>配送约¥{{ m.deliveryFee }}</text>
              <text v-if="m.perCapita">人均¥{{ m.perCapita }}</text>
            </view>
            <view class="merchant-tags">
              <text v-for="(tag, idx) in m.tags" :key="idx" :class="['tag', `tag-${tag.type}`]">{{ tag.text }}</text>
            </view>
            <view v-if="m.promo" class="merchant-promo">{{ m.promo }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- #ifdef H5 -->
    <GlobalTabbar />
    <!-- #endif -->

    <!-- 更多服务面板 -->
    <view v-if="showMorePanel" class="more-modal" @tap="closeMorePanel">
      <view class="more-panel" @tap.stop>
        <view class="more-header">
          <text class="more-title">全部服务</text>
          <text class="more-close" @tap="closeMorePanel">×</text>
        </view>
        <scroll-view scroll-y class="more-body">
          <view v-for="g in categoryGroups" :key="g.name" class="more-group">
            <text class="group-title">{{ g.name }}</text>
            <view class="group-grid">
              <view
                v-for="cat in g.items"
                :key="cat.id"
                class="group-item"
                @tap="onCategoryTap(cat)"
              >
                <view class="icon-wrapper" :style="{ background: cat.bg }">
                  <CategoryIcon :name="cat.iconName" :size="26" />
                </view>
                <text class="category-name">{{ cat.name }}</text>
              </view>
            </view>
          </view>
          <view style="height: 24px;"></view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { getMerchantCategories, getMerchantPage, getAvailableCoupons } from '@/api/index'
import type { MerchantCategoryVO, MerchantCardVO, CouponVO } from '@/types/api'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import GlobalTabbar from '@/components/GlobalTabbar/GlobalTabbar.vue'
import { useTabStore } from '@/store/tab'

const tabStore = useTabStore()
const locationText = ref('请选择地址')
const merchants = ref<MerchantCardVO[]>([])
const categories = ref<MerchantCategoryVO[]>([])
const coupons = ref<CouponVO[]>([])
const loading = ref(false)
const showMorePanel = ref(false)
const activeTopTab = ref('外卖')
const activeFilter = ref('综合排序')

const topTabs = ['外卖', '首页', '自取']
const filters = ['综合排序', '销量最高', '距离最近', '筛选']

const CATEGORY_BG: Record<string, string> = {
  美食: 'linear-gradient(135deg, #FF6B35, #FF8C42)',
  早餐: 'linear-gradient(135deg, #FFC107, #FFD54F)',
  跑腿代购: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
  甜品饮品: 'linear-gradient(135deg, #2196F3, #03A9F4)',
  果蔬生鲜: 'linear-gradient(135deg, #9C27B0, #BA68C8)',
  汉堡西餐: 'linear-gradient(135deg, #E91E63, #F06292)',
  咖啡奶茶: 'linear-gradient(135deg, #00BCD4, #4DD0E1)',
  大牌专送: 'linear-gradient(135deg, #FF5722, #FF8A65)',
  面食: 'linear-gradient(135deg, #795548, #A1887F)',
  超市便利: 'linear-gradient(135deg, #4CAF50, #8BC34A)',
  蔬菜水果: 'linear-gradient(135deg, #9C27B0, #BA68C8)',
  看病买药: 'linear-gradient(135deg, #26C6DA, #4DD0E1)',
  夜宵: 'linear-gradient(135deg, #F44336, #EF5350)',
  拼好饭: 'linear-gradient(135deg, #FF5722, #FF8A65)',
  神枪手: 'linear-gradient(135deg, #FFC107, #FFD54F)',
  必点榜: 'linear-gradient(135deg, #E91E63, #F06292)',
  堂食店: 'linear-gradient(135deg, #FF7043, #FF8A65)',
  学生价: 'linear-gradient(135deg, #00BCD4, #4DD0E1)',
  送奶茶: 'linear-gradient(135deg, #AB47BC, #CE93D8)',
  每日大牌: 'linear-gradient(135deg, #FF5722, #FF8A65)',
  天天津贴: 'linear-gradient(135deg, #FFA726, #FFCC80)',
  小美餐厅: 'linear-gradient(135deg, #795548, #A1887F)',
  面包蛋糕: 'linear-gradient(135deg, #AB47BC, #CE93D8)',
  包子粥铺: 'linear-gradient(135deg, #FFB74D, #FFCC80)',
}

function iconNameForCategory(name: string): string {
  if (name.includes('美食')) return 'meishi'
  if (name.includes('早餐') || name.includes('粥铺')) return 'breakfast'
  if (name.includes('跑腿') || name.includes('代购')) return 'errand'
  if (name.includes('甜品') || name.includes('饮品') || name.includes('奶茶') || name.includes('蛋糕')) return 'dessert'
  if (name.includes('水果') || name.includes('生鲜') || name.includes('蔬菜')) return 'fruit'
  if (name.includes('汉堡') || name.includes('西餐') || name.includes('披萨')) return 'burger'
  if (name.includes('咖啡')) return 'coffee'
  if (name.includes('大牌') || name.includes('品牌')) return 'brand'
  if (name.includes('面') || name.includes('粉') || name.includes('小吃')) return 'noodles'
  if (name.includes('超市') || name.includes('便利') || name.includes('商店')) return 'store'
  if (name.includes('买药') || name.includes('医药')) return 'pharmacy'
  if (name.includes('夜宵') || name.includes('烧烤')) return 'bbq'
  if (name.includes('火锅') || name.includes('锅')) return 'hotpot'
  if (name.includes('寿司') || name.includes('日料')) return 'sushi'
  if (name.includes('轻食') || name.includes('沙拉')) return 'salad'
  return 'more'
}

function categoryGroup(name: string): string {
  if (['美食', '早餐', '夜宵', '汉堡西餐', '面食', '堂食店', '小美餐厅', '面包蛋糕', '包子粥铺'].includes(name)) return '美食餐饮'
  if (['甜品饮品', '咖啡奶茶', '送奶茶'].includes(name)) return '甜品饮品'
  if (['超市便利', '果蔬生鲜', '蔬菜水果', '看病买药'].includes(name)) return '生活服务'
  if (['拼好饭', '神枪手', '天天津贴', '学生价'].includes(name)) return '优惠助手'
  if (['大牌专送', '必点榜', '每日大牌'].includes(name)) return '特色推荐'
  if (['跑腿代购'].includes(name)) return '跑腿代购'
  return '全部'
}

const allCategories = computed(() => {
  const list = categories.value.map((c) => ({
    id: c.id,
    name: c.name,
    iconName: iconNameForCategory(c.name),
    bg: CATEGORY_BG[c.name] || 'linear-gradient(135deg, #607D8B, #90A4AE)',
    group: categoryGroup(c.name),
    isMore: false,
  }))
  // 追加“全部”入口
  list.push({
    id: 0,
    name: '全部',
    iconName: 'more',
    bg: 'linear-gradient(135deg, #607D8B, #90A4AE)',
    group: '全部',
    isMore: true,
  })
  return list
})

const displayCategories = computed(() => allCategories.value.slice(0, 11))

const categoryGroups = computed(() => {
  const map: Record<string, any[]> = {}
  allCategories.value.forEach((c) => {
    if (!map[c.group]) map[c.group] = []
    map[c.group].push(c)
  })
  return Object.keys(map).map((name) => ({ name, items: map[name] }))
})

const deals = ref<Array<{ id: number; name: string; price: number; merchantId: number; bg: string }>>([])

onShow(() => {
  tabStore.setActiveTab('/pages/index/index')
})

onMounted(() => {
  loadCategories()
  loadMerchants()
  loadCoupons()
  loadDeals()
})

async function loadCategories() {
  try {
    categories.value = await getMerchantCategories()
  } catch (e) {
    console.error('加载分类失败', e)
  }
}

async function loadMerchants() {
  loading.value = true
  try {
    const page = await getMerchantPage({ current: 1, size: 10 })
    merchants.value = page.list
  } catch (e) {
    console.error('加载商家失败', e)
  } finally {
    loading.value = false
  }
}

async function loadCoupons() {
  try {
    coupons.value = await getAvailableCoupons()
  } catch (e) {
    console.error('加载优惠券失败', e)
    coupons.value = []
  }
}

async function loadDeals() {
  try {
    const page = await getMerchantPage({ current: 1, size: 10 })
    const list = page.list || []
    const dishBgList = [
      'linear-gradient(135deg, #FF6B35, #FFC107)',
      'linear-gradient(135deg, #4CAF50, #8BC34A)',
      'linear-gradient(135deg, #E91E63, #FF8A65)',
      'linear-gradient(135deg, #2196F3, #03A9F4)',
      'linear-gradient(135deg, #9C27B0, #BA68C8)'
    ]
    deals.value = list.slice(0, 8).map((m, idx) => ({
      id: m.id,
      name: m.name,
      price: m.perCapita || m.minOrder || 0,
      merchantId: m.id,
      bg: dishBgList[idx % dishBgList.length]
    }))
  } catch (e) {
    console.error('加载精选推荐失败', e)
    deals.value = []
  }
}

function couponValue(c: CouponVO): string {
  if (c.type === 2 && c.discount) {
    return `${(c.discount * 10).toFixed(1)}折`
  }
  if (c.amount) {
    return `¥${c.amount}`
  }
  return '优惠'
}

function couponRule(c: CouponVO): string {
  if (c.threshold && c.threshold > 0) {
    return `满${c.threshold}可用`
  }
  return '无门槛'
}

function onCouponTap(c: CouponVO) {
  if (c.canReceive) {
    uni.showToast({ title: '请登录后领取', icon: 'none' })
  } else {
    uni.navigateTo({ url: '/pages/coupon/index' })
  }
}

function onCategoryTap(cat: any) {
  if (cat.isMore) {
    showMorePanel.value = true
    return
  }
  closeMorePanel()
  uni.navigateTo({ url: `/pages/merchant/list?categoryId=${cat.id}&name=${encodeURIComponent(cat.name)}` })
}

function closeMorePanel() {
  showMorePanel.value = false
}

function onLocationTap() {
  uni.showToast({ title: '请使用地址选择', icon: 'none' })
}
function goSearch() {
  uni.navigateTo({ url: '/pages/search/index' })
}
function goMessage() {
  uni.navigateTo({ url: '/pages/message/index' })
}
function goMerchantList() {
  uni.navigateTo({ url: '/pages/merchant/list' })
}
function goMerchantDetail(id: number) {
  uni.navigateTo({ url: `/pages/merchant/detail?id=${id}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.home {
  min-height: 100vh;
  background: $bg;
  padding-bottom: calc($tabbar-height + 20px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.home-header {
  background: linear-gradient(180deg, $header-start 0%, $header-end 100%);
  padding: 44px 16px 16px;
  color: #fff;
}

.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.header-tabs {
  display: flex;
  align-items: center;
  gap: 20px;
}

.top-tab {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.75);
  position: relative;
}

.top-tab-active {
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}

.top-tab-active::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: #fff;
  border-radius: 2px;
}

.header-msg {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.location-bar {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 10px;
}

.loc-text {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.loc-arrow {
  font-size: 9px;
  opacity: 0.7;
}

.search-bar {
  background: #fff;
  border-radius: 20px;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 6px 0 14px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.search-placeholder {
  flex: 1;
  font-size: 13px;
  color: $text-muted;
  margin-left: 6px;
}

.search-btn {
  background: $primary;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 16px;
}

.category-scroll {
  background: #fff;
  padding: 16px 0;
  white-space: nowrap;
}

.category-row {
  display: inline-flex;
  padding: 0 12px;
  gap: 18px;
}

.category-item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  width: 56px;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: $shadow;
}

.category-name {
  font-size: 11px;
  color: $text;
  line-height: 1.2;
  text-align: center;
}

.deal-section {
  background: #fff;
  margin-top: 10px;
  padding: 14px 16px;
}

.deal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.deal-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.deal-name {
  font-size: 16px;
  font-weight: 800;
  color: $text;
}

.deal-tag {
  font-size: 10px;
  color: $secondary;
  border: 1px solid rgba(255, 75, 51, 0.3);
  padding: 1px 5px;
  border-radius: 4px;
}

.deal-more {
  font-size: 12px;
  color: $text-muted;
}

.deal-scroll {
  white-space: nowrap;
}

.deal-card {
  display: inline-flex;
  flex-direction: column;
  width: 110px;
  margin-right: 10px;
}

.deal-img {
  width: 110px;
  height: 80px;
  border-radius: 10px;
  margin-bottom: 6px;
}

.deal-food {
  font-size: 12px;
  color: $text;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.deal-price {
  font-size: 16px;
  font-weight: 800;
  color: $secondary;
}

.price-symbol {
  font-size: 11px;
}

.coupon-scroll {
  background: #fff;
  margin-top: 10px;
  white-space: nowrap;
}

.coupon-strip {
  display: inline-flex;
  gap: 10px;
  padding: 12px 16px;
}

.coupon-item {
  flex-shrink: 0;
  width: 220px;
  background: linear-gradient(135deg, #FF4B33 0%, #FF6B6B 100%);
  border-radius: 10px;
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #fff;
}

.coupon-val {
  font-size: 24px;
  font-weight: 800;
}

.coupon-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.coupon-name {
  font-size: 13px;
  font-weight: 700;
}

.coupon-rule {
  font-size: 10px;
  opacity: 0.85;
}

.coupon-action {
  font-size: 11px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  padding: 3px 8px;
  border-radius: 10px;
}

.merchant-section {
  margin-top: 10px;
  background: #fff;
  padding: 14px 0;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 0 16px 10px;
  gap: 10px;
}

.section-title {
  font-size: 17px;
  font-weight: 800;
  color: $text;
}

.section-sub {
  font-size: 12px;
  color: $text-muted;
  background: $bg;
  padding: 2px 8px;
  border-radius: 10px;
}

.section-more {
  margin-left: auto;
  font-size: 12px;
  color: $secondary;
  background: rgba(255, 75, 51, 0.08);
  padding: 3px 10px;
  border-radius: 12px;
  font-weight: 600;
}

.filter-bar {
  display: flex;
  align-items: center;
  padding: 0 16px 12px;
  gap: 12px;
  border-bottom: 1px solid $border;
}

.filter-item {
  font-size: 13px;
  color: $text-light;
  padding: 4px 10px;
  border-radius: 12px;
  background: $bg;
}

.filter-active {
  color: $text;
  background: $primary;
  font-weight: 700;
}

.filter-toggle {
  margin-left: auto;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-light;
}

.loading-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
}

.loading-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid rgba($primary, 0.25);
  border-top-color: $primary;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.loading-text {
  margin-top: 8px;
  font-size: 12px;
  color: $text-muted;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.merchant-list {
  padding: 0 16px;
}

.merchant-card {
  display: flex;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid $border;
}

.merchant-card:last-child {
  border-bottom: none;
}

.merchant-img {
  width: 76px;
  height: 76px;
  border-radius: 8px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.merchant-logo-text {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
}

.merchant-info {
  flex: 1;
  min-width: 0;
}

.merchant-name {
  font-size: 15px;
  font-weight: 700;
  color: $text;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.top-star {
  color: $primary;
}

.merchant-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: $text-muted;
  margin-bottom: 4px;
}

.meta-score {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  color: $secondary;
  font-weight: 700;
}

.score-num {
  font-size: 12px;
}

.meta-right {
  margin-left: auto;
}

.merchant-price {
  display: flex;
  gap: 10px;
  font-size: 11px;
  color: $text-muted;
  margin-bottom: 6px;
}

.merchant-tags {
  display: flex;
  gap: 4px;
  margin-bottom: 4px;
}

.tag {
  display: inline-block;
  padding: 1px 5px;
  border-radius: 3px;
  font-size: 10px;
  font-weight: 600;
}

.tag-primary {
  background: rgba(255, 75, 51, 0.08);
  color: $secondary;
}

.tag-success {
  background: rgba(0, 200, 83, 0.08);
  color: $success;
}

.tag-warning {
  background: rgba(255, 152, 0, 0.08);
  color: $warning;
}

.tag-danger {
  background: rgba(244, 67, 54, 0.08);
  color: $danger;
}

.merchant-promo {
  font-size: 11px;
  color: $secondary;
}

/* 更多服务面板 */
.more-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.more-panel {
  background: #fff;
  border-radius: 20px 20px 0 0;
  height: 78vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.25s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
}

@keyframes slideUp {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

.more-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid $border;
}

.more-title {
  font-size: 17px;
  font-weight: 700;
  color: $text;
}

.more-close {
  width: 28px;
  height: 28px;
  line-height: 26px;
  text-align: center;
  font-size: 22px;
  color: $text-light;
  background: $bg;
  border-radius: 50%;
}

.more-body {
  flex: 1;
  padding: 8px 16px;
  overflow: hidden;
}

.more-group {
  margin-top: 16px;
}

.group-title {
  font-size: 14px;
  font-weight: 700;
  color: $text;
  margin-bottom: 12px;
  display: block;
}

.group-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px 8px;
}

.group-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
</style>
