<template>
  <view class="detail-page">
    <view class="detail-hero">
      <view class="detail-product-img" :style="{ background: display.bg }"></view>
    </view>

    <view class="detail-content">
      <view class="detail-name">{{ display.name }}</view>
      <view class="detail-sales">
        <view class="star"><CategoryIcon name="star" :size="10" /> {{ display.rating }}</view>
        <text> · 月售 {{ display.sales }} · </text>
        <text>好评率 {{ display.goodRate }}%</text>
      </view>
      <view class="detail-price-row">
        <view class="detail-price">
          ¥{{ display.price }}
          <text v-if="display.originalPrice" class="old">¥{{ display.originalPrice }}</text>
        </view>
        <text v-for="(tag, idx) in display.tags" :key="idx" :class="['detail-tag', tag.type === 'success' && 'success']">{{ tag.text }}</text>
      </view>

      <view v-if="specList.length" class="detail-section">
        <view class="detail-section-title">选择规格</view>
        <view class="detail-spec-row">
          <text
            v-for="(spec, idx) in specList"
            :key="idx"
            :class="['detail-spec-item', activeSpec === idx && 'active']"
            @tap="activeSpec = idx"
          >{{ spec.name }}</text>
        </view>
      </view>

      <view v-if="flavorList.length" class="detail-section">
        <view class="detail-section-title">口味选择</view>
        <view class="detail-spec-row">
          <text
            v-for="(flavor, idx) in flavorList"
            :key="idx"
            :class="['detail-spec-item', activeFlavor === idx && 'active']"
            @tap="activeFlavor = idx"
          >{{ flavor }}</text>
        </view>
      </view>

      <view class="detail-section">
        <view class="detail-section-title">商品描述</view>
        <view class="detail-desc">{{ display.description || '暂无描述' }}</view>
      </view>

      <view class="detail-section">
        <view class="detail-section-title">购买数量</view>
        <view class="detail-qty-row">
          <text class="stock-text">库存充足</text>
          <view class="detail-qty">
            <text class="detail-qty-btn" @tap="onDec">−</text>
            <text class="detail-qty-num">{{ qty }}</text>
            <text class="detail-qty-btn" @tap="onInc">+</text>
          </view>
        </view>
      </view>
      <view style="height: 100px;"></view>
    </view>

    <view class="detail-bottom">
      <button class="add-cart-btn" @tap="addCart">加入购物车 ¥{{ totalPrice }}</button>
      <button class="buy-btn" @tap="buyNow">立即购买</button>
    </view>

    <FloatingCart :count="cartStore.totalCount" @tap="goCart" />
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getDishDetail } from '@/api'
import type { DishVO, DishSpecVO } from '@/types/api'
import FloatingCart from '@/components/FloatingCart/FloatingCart.vue'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import { useCartStore } from '@/store/cart'
import { dishVoToCard } from '@/utils/dataTransform'

const dish = ref<Partial<DishVO>>({})
const activeSpec = ref(0)
const activeFlavor = ref(0)
const qty = ref(1)
const cartStore = useCartStore()

const display = computed(() => {
  const card = dishVoToCard(dish.value as DishVO)
  return {
    name: card.name,
    bg: card.bg,
    rating: card.rating.toFixed(1),
    sales: card.sales,
    goodRate: 98,
    price: card.price,
    originalPrice: card.originalPrice,
    tags: card.tags,
    description: dish.value.description || '',
  }
})

const specList = computed<DishSpecVO[]>(() => dish.value.specs?.length ? dish.value.specs : [])
const flavorList = computed<string[]>(() => {
  const tags = dish.value.tags || []
  return tags.length ? tags.slice(0, 4) : []
})

const selectedSpecId = computed(() => {
  if (!specList.value.length) return undefined
  return specList.value[activeSpec.value]?.id
})

const totalPrice = computed(() => {
  const base = Number(dish.value.price || 0)
  const diff = selectedSpecId.value
    ? (specList.value.find((s) => s.id === selectedSpecId.value)?.priceDiff || 0)
    : 0
  return ((base + diff) * qty.value).toFixed(2)
})

onLoad((q: any) => {
  const id = Number(q?.id)
  if (id) loadData(id)
})

onMounted(() => {
  cartStore.fetchCart()
})

async function loadData(id: number) {
  try {
    dish.value = await getDishDetail(id)
  } catch (e) {
    console.error('加载菜品详情失败', e)
  }
}

function onInc() {
  qty.value++
}
function onDec() {
  if (qty.value > 1) qty.value--
}
async function addCart() {
  const merchantId = dish.value.merchantId
  const dishId = dish.value.id
  if (!merchantId || !dishId) {
    uni.showToast({ title: '商品信息不完整', icon: 'none' })
    return
  }
  await cartStore.addItem({
    merchantId,
    dishId,
    specId: selectedSpecId.value,
    quantity: qty.value,
  })
  uni.showToast({ title: '已加入购物车', icon: 'success' })
}
function buyNow() {
  addCart()
  uni.navigateTo({ url: '/pages/order/checkout' })
}
function goCart() {
  uni.switchTab({ url: '/pages/cart/index' })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.detail-page {
  min-height: 100vh;
  background: $secondary;
  position: relative;
}

.detail-hero {
  background: $secondary;
  padding: 16px 16px 24px;
  text-align: center;
}

.detail-product-img {
  width: 200px;
  height: 200px;
  margin: 16px auto 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 80px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.detail-content {
  background: #fff;
  border-radius: 24px 24px 0 0;
  margin-top: -16px;
  padding: 24px 16px 0;
  min-height: 60vh;
}

.detail-name {
  font-size: 20px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.detail-sales {
  font-size: 12px;
  color: $text-muted;
  margin-bottom: 16px;
}

.detail-sales .star {
  color: $primary;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.detail-price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.detail-price {
  color: $primary;
  font-size: 28px;
  font-weight: 800;
}

.detail-price .old {
  color: #999;
  font-size: 14px;
  text-decoration: line-through;
  margin-left: 4px;
  font-weight: 400;
}

.detail-tag {
  background: rgba(255, 107, 53, 0.1);
  color: $primary;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 11px;
}

.detail-tag.success {
  background: rgba(76, 175, 80, 0.1);
  color: $success;
}

.detail-section {
  margin-bottom: 20px;
}

.detail-section-title {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
}

.detail-spec-row {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.detail-spec-item {
  padding: 6px 14px;
  border: 1px solid $border;
  border-radius: 16px;
  font-size: 13px;
  color: $text-light;
}

.detail-spec-item.active {
  background: rgba(255, 107, 53, 0.1);
  color: $primary;
  border-color: $primary;
  font-weight: 600;
}

.detail-desc {
  font-size: 13px;
  color: $text-light;
  line-height: 1.6;
  padding: 12px 14px;
  background: $bg;
  border-radius: 10px;
}

.detail-qty-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
}

.stock-text {
  font-size: 12px;
  color: $text-muted;
}

.detail-qty {
  display: flex;
  align-items: center;
  gap: 12px;
}

.detail-qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid $primary;
  background: #fff;
  color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

.detail-qty-num {
  font-size: 16px;
  font-weight: 600;
  min-width: 24px;
  text-align: center;
}

.detail-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: #fff;
  border-top: 1px solid $border;
  display: flex;
  align-items: center;
  padding: 16px;
  gap: 12px;
  z-index: 50;
}

.add-cart-btn {
  flex: 1;
  height: 44px;
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.buy-btn {
  flex: 1;
  height: 44px;
  background: linear-gradient(135deg, $primary-light, #FFB74D);
  color: #fff;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
