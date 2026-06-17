<template>
  <view class="page">
    <!-- 筛选 chips -->
    <view class="filter-row">
      <text
        v-for="(chip, idx) in chips"
        :key="idx"
        :class="['filter-chip', activeChip === idx && 'active']"
        @tap="activeChip = idx"
      >{{ chip }}</text>
      <text class="filter-more">筛选 ▾</text>
    </view>

    <!-- 商品行列表 -->
    <scroll-view scroll-y class="product-list" :style="{ height: contentHeight + 'px' }">
      <view
        v-for="d in dishes"
        :key="d.id"
        class="product-row"
        @tap="goDish(d.id)"
      >
        <view class="product-thumb" :style="{ background: d.bg }"></view>
        <view class="product-body">
          <view class="product-name">{{ d.name }}</view>
          <view class="product-sales">月售 {{ d.sales }} · 好评 {{ d.rating }}%</view>
          <view class="product-tags" v-if="d.tags.length">
            <text v-for="(tag, idx) in d.tags" :key="idx" :class="['tag', `tag-${tag.type}`]">{{ tag.text }}</text>
          </view>
          <view class="product-bottom">
            <view class="product-price">
              ¥{{ d.price }}
              <text v-if="d.originalPrice" class="old">¥{{ d.originalPrice }}</text>
            </view>
            <view class="product-action" @tap.stop>
              <template v-if="d.qty > 0">
                <text class="qty-btn minus" @tap="onDec(d)">−</text>
                <text class="qty-num">{{ d.qty }}</text>
                <text class="qty-btn plus" @tap="onInc(d)">+</text>
              </template>
              <view v-else class="add-btn-primary" @tap="onInc(d)">+ 加入</view>
            </view>
          </view>
        </view>
      </view>
      <view style="height: 20px;"></view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { MOCK_DISHES } from '@/mock'

const dishes = ref(MOCK_DISHES.map(d => ({ ...d })))
const chips = ref(['综合排序', '销量优先', '距离最近', '价格'])
const activeChip = ref(0)
const contentHeight = ref(600)

onLoad((q: any) => {
  uni.setNavigationBarTitle({ title: q?.name || '商家列表' })
  uni.getSystemInfo({
    success: (res: any) => {
      contentHeight.value = res.windowHeight - 50
    }
  })
})

function onInc(d: any) {
  d.qty++
  uni.showToast({ title: '已加入购物车', icon: 'success' })
}
function onDec(d: any) {
  if (d.qty > 0) d.qty--
}
function goDish(id: number) {
  uni.navigateTo({ url: `/pages/dish/detail?id=${id}` })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.page {
  min-height: 100vh;
  background: $bg;
}

.filter-row {
  background: #fff;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid $border;
}

.filter-chip {
  padding: 4px 12px;
  background: $bg;
  border-radius: 12px;
  font-size: 12px;
  color: $text-light;
}

.filter-chip.active {
  background: rgba(255, 107, 53, 0.1);
  color: $primary;
}

.filter-more {
  margin-left: auto;
  font-size: 12px;
  color: $text-muted;
}

.product-list {
  background: $bg;
}

.product-row {
  background: #fff;
  margin-top: 8px;
  padding: 12px 16px;
  display: flex;
  gap: 12px;
  border-bottom: 1px solid $border;
}

.product-thumb {
  width: 76px;
  height: 76px;
  border-radius: 8px;
  flex-shrink: 0;
}

.product-body {
  flex: 1;
  min-width: 0;
}

.product-name {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.product-sales {
  font-size: 11px;
  color: $text-muted;
  margin-bottom: 6px;
}

.product-tags {
  display: flex;
  gap: 4px;
  margin-bottom: 6px;
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

.tag-warning {
  background: rgba(255, 152, 0, 0.1);
  color: $warning;
}

.tag-success {
  background: rgba(76, 175, 80, 0.1);
  color: $success;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  color: $primary;
  font-size: 16px;
  font-weight: 700;
}

.product-price .old {
  color: #999;
  font-size: 11px;
  text-decoration: line-through;
  margin-left: 4px;
  font-weight: 400;
}

.product-action {
  display: flex;
  gap: 4px;
  align-items: center;
}

.qty-btn {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
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

.add-btn-primary {
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  padding: 6px 14px;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
