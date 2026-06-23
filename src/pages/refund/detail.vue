<template>
  <view v-if="refund" class="refund-detail">
    <!-- 退款状态 -->
    <view class="status-card">
      <view class="status-icon">
        <CategoryIcon name="refund" :size="32" />
      </view>
      <view class="status-info">
        <view class="status-title">{{ refund.status }}</view>
        <view class="status-desc">{{ refund.statusDesc }}</view>
      </view>
      <view v-if="refund.cancelable" class="cancel-btn" @tap="onCancel">撤销申请</view>
    </view>

    <!-- 退款进度 -->
    <view class="timeline-card">
      <view class="section-title">退款进度</view>
      <view class="timeline">
        <view
          v-for="(node, idx) in refund.timeline"
          :key="idx"
          :class="['timeline-item', node.done && 'done', idx === 0 && 'latest']"
        >
          <view class="timeline-dot"></view>
          <view class="timeline-body">
            <text class="timeline-text">{{ node.text }}</text>
            <text class="timeline-time">{{ node.time }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 退款信息 -->
    <view class="info-card">
      <view class="section-title">退款信息</view>
      <view class="info-row">
        <text>退款金额</text>
        <text class="info-highlight">¥{{ refund.amount.toFixed(2) }}</text>
      </view>
      <view class="info-row">
        <text>退款原因</text>
        <text>{{ refund.reason }}</text>
      </view>
      <view class="info-row">
        <text>退款编号</text>
        <text>{{ refund.refundNo }}</text>
      </view>
      <view class="info-row">
        <text>申请时间</text>
        <text>{{ refund.applyTime }}</text>
      </view>
    </view>

    <!-- 凭证图片 -->
    <view v-if="refund.images?.length" class="images-card">
      <view class="section-title">凭证图片</view>
      <view class="images-list">
        <image
          v-for="(img, idx) in refund.images"
          :key="idx"
          :src="img"
          mode="aspectFill"
          class="refund-img"
          @tap="previewImage(idx)"
        />
      </view>
    </view>

    <!-- 商家回复 -->
    <view v-if="refund.reply" class="reply-card">
      <view class="section-title">商家回复</view>
      <view class="reply-content">{{ refund.reply }}</view>
      <text class="reply-time">{{ refund.replyTime }}</text>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import CategoryIcon from '@/components/CategoryIcon/CategoryIcon.vue'
import { getRefundDetail, cancelRefund } from '@/api'
import type { RefundVO } from '@/types/api'

const refund = ref<RefundVO | null>(null)
const refundId = ref<string | number>('')
const loading = ref(false)

onLoad((q: any) => {
  if (q?.id) {
    refundId.value = q.id
    fetchRefundDetail(q.id)
  }
})

async function fetchRefundDetail(id: string | number) {
  loading.value = true
  try {
    refund.value = await getRefundDetail(id)
  } catch (e: any) {
    uni.showToast({ title: e?.message || '加载失败', icon: 'none' })
  } finally {
    loading.value = false
  }
}

function onCancel() {
  uni.showModal({
    title: '提示',
    content: '确定撤销退款申请？',
    success: async (r) => {
      if (r.confirm) {
        try {
          await cancelRefund(refundId.value)
          uni.showToast({ title: '已撤销', icon: 'success' })
          if (refund.value) {
            refund.value.cancelable = false
            refund.value.statusDesc = '您已撤销退款申请'
          }
        } catch (e: any) {
          uni.showToast({ title: e?.message || '撤销失败', icon: 'none' })
        }
      }
    }
  })
}

function previewImage(idx: number) {
  if (!refund.value?.images?.length) return
  uni.previewImage({
    current: refund.value.images[idx],
    urls: refund.value.images
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.refund-detail {
  min-height: 100vh;
  background: $bg;
  padding: 12px 16px 40px;
}

.status-card {
  background: $card;
  border-radius: $radius-lg;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  box-shadow: $shadow;
}

.status-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba($primary, 0.1);
  color: $primary;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-info {
  flex: 1;
}

.status-title {
  font-size: 16px;
  font-weight: 700;
  color: $text;
}

.status-desc {
  font-size: 12px;
  color: $text-muted;
  margin-top: 4px;
}

.cancel-btn {
  background: $bg;
  color: $text-light;
  font-size: 13px;
  padding: 7px 14px;
  border-radius: 16px;
  border: 1px solid $border;
}

.timeline-card,
.info-card,
.images-card,
.reply-card {
  background: $card;
  border-radius: $radius-lg;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: $shadow;
}

.section-title {
  font-size: 15px;
  font-weight: 700;
  color: $text;
  margin-bottom: 14px;
}

.timeline {
  position: relative;
  padding-left: 12px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 6px;
  top: 6px;
  bottom: 6px;
  width: 1px;
  background: $border;
}

.timeline-item {
  position: relative;
  padding-left: 20px;
  padding-bottom: 18px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-dot {
  position: absolute;
  left: 0;
  top: 2px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: $border;
  border: 2px solid #fff;
}

.timeline-item.done .timeline-dot {
  background: $primary;
}

.timeline-item.latest .timeline-dot {
  box-shadow: 0 0 0 4px rgba($primary, 0.15);
}

.timeline-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timeline-text {
  font-size: 13px;
  color: $text;
}

.timeline-time {
  font-size: 11px;
  color: $text-muted;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: $text-light;
  padding: 8px 0;
  border-bottom: 1px solid $border;
}

.info-row:last-child {
  border-bottom: none;
}

.info-highlight {
  color: $primary;
  font-weight: 700;
  font-size: 16px;
}

.images-list {
  display: flex;
  gap: 10px;
}

.refund-img {
  width: 80px;
  height: 80px;
  border-radius: $radius-md;
}

.reply-content {
  font-size: 14px;
  color: $text;
  line-height: 1.6;
  background: $bg;
  padding: 12px;
  border-radius: $radius-md;
}

.reply-time {
  display: block;
  font-size: 11px;
  color: $text-muted;
  margin-top: 8px;
  text-align: right;
}
</style>
