<template>
  <view class="addresses">
    <view v-if="loading" class="loading">加载中...</view>
    <view v-else-if="!list.length" class="empty">
      <text class="empty-icon">📍</text>
      <text class="empty-text">暂无地址</text>
    </view>
    <view v-else class="address-list">
      <view
        v-for="a in list"
        :key="a.id"
        :class="['addr-card', a.default && 'addr-default']"
        @tap="onSelect(a)"
      >
        <view class="addr-top">
          <view class="addr-user">
            <text class="addr-name">{{ a.name }}</text>
            <text class="addr-phone">{{ a.phone }}</text>
          </view>
          <text v-if="a.default" class="default-tag">默认</text>
        </view>
        <view class="addr-row">
          <text class="addr-tag">{{ a.tag }}</text>
          <text class="addr-detail">{{ a.address }}</text>
        </view>
        <view class="addr-actions">
          <text class="action default-action" @tap.stop="setDefault(a)">
            <text :class="['radio', a.default && 'radio-active']"></text>
            {{ a.default ? '默认地址' : '设为默认' }}
          </text>
          <view class="action-right">
            <text class="action" @tap.stop="edit(a)">编辑</text>
            <text class="action danger" @tap.stop="del(a)">删除</text>
          </view>
        </view>
      </view>
    </view>
    <view class="add-btn" @tap="add">+ 新增收货地址</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getAddressList, deleteAddress, setDefaultAddress } from '@/api'
import type { AddressVO } from '@/types/api'

const list = ref<AddressVO[]>([])
const loading = ref(false)
let fromCheckout = false

onLoad((q: any) => { fromCheckout = q?.from === 'checkout' })
onShow(() => load())

async function load() {
  loading.value = true
  try {
    list.value = await getAddressList()
  } catch (e) {
    console.error('加载地址失败', e)
  } finally {
    loading.value = false
  }
}

function onSelect(a: any) {
  if (fromCheckout) {
    uni.setStorageSync('wzz_selected_address', a)
    uni.navigateBack()
  }
}
function add() { uni.navigateTo({ url: '/pages/address/edit' }) }
function edit(a: any) { uni.navigateTo({ url: `/pages/address/edit?id=${a.id}` }) }
async function del(a: AddressVO) {
  const confirmed = await uni.showModal({
    title: '提示', content: '确定删除该地址？',
  }).then(r => r.confirm).catch(() => false)
  if (!confirmed) return
  try {
    await deleteAddress(a.id)
    list.value = list.value.filter(item => item.id !== a.id)
    uni.showToast({ title: '已删除', icon: 'success' })
  } catch (e) {
    console.error('删除地址失败', e)
  }
}
async function setDefault(a: AddressVO) {
  try {
    await setDefaultAddress(a.id)
    list.value.forEach(item => { item.default = item.id === a.id })
    uni.showToast({ title: '已设为默认', icon: 'success' })
  } catch (e) {
    console.error('设置默认地址失败', e)
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.addresses {
  min-height: 100vh;
  background: $bg;
  padding: 12px 16px 80px;
}

.loading, .empty {
  text-align: center;
  padding: 60px 0;
  color: $text-muted;
  .empty-icon { display: block; font-size: 60px; opacity: 0.5; margin-bottom: 12px; }
}

.addr-card {
  background: #fff;
  border-radius: $radius-md;
  padding: 14px;
  margin-bottom: 10px;
  box-shadow: $shadow;
}

.addr-default {
  border: 1px solid $primary;
}

.addr-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.addr-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.addr-name {
  font-size: 16px;
  font-weight: 600;
  color: $text;
}

.addr-phone {
  color: $text-light;
  font-size: 14px;
}

.default-tag {
  background: $primary;
  color: #fff;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 4px;
}

.addr-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
}

.addr-tag {
  background: rgba(255, 107, 53, 0.1);
  color: $primary;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 4px;
  flex-shrink: 0;
}

.addr-detail {
  color: $text-light;
  font-size: 13px;
  line-height: 1.5;
}

.addr-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid $border;
  font-size: 13px;
}

.action {
  color: $text-light;
  padding: 4px 8px;
}

.action.danger {
  color: $danger;
}

.default-action {
  display: flex;
  align-items: center;
  gap: 6px;
}

.radio {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1.5px solid $text-muted;
}

.radio-active {
  background: $primary;
  border-color: $primary;
  position: relative;
}

.radio-active::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 6px;
  height: 6px;
  background: #fff;
  border-radius: 50%;
}

.action-right {
  display: flex;
  gap: 10px;
}

.add-btn {
  position: fixed;
  left: 16px;
  right: 16px;
  bottom: 16px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: 0 4px 16px rgba(255, 107, 53, 0.3);
}
</style>
