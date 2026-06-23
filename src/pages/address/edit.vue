<template>
  <view class="edit">
    <view class="form-card">
      <view class="form-item">
        <text class="label">收货人</text>
        <input v-model="form.name" placeholder="请输入姓名" />
      </view>
      <view class="form-item">
        <text class="label">手机号</text>
        <input v-model="form.phone" type="number" maxlength="11" placeholder="请输入手机号" />
      </view>
      <view class="form-item" @tap="showRegionPicker = true">
        <text class="label">省市区</text>
        <text class="region-text" :class="{ placeholder: !form.region }">{{ form.region || '请选择省市区' }}</text>
        <text class="arrow">›</text>
      </view>
      <view class="form-item">
        <text class="label">详细地址</text>
        <input v-model="form.address" placeholder="街道、门牌号等" />
      </view>
      <view class="form-item" @tap="goMap">
        <text class="label">地图定位</text>
        <text class="region-text" :class="{ placeholder: !mapLocation }">{{ mapLocation || '点击选择地图位置' }}</text>
        <text class="arrow">›</text>
      </view>
      <view class="form-item">
        <text class="label">地址标签</text>
        <view class="tag-group">
          <text v-for="t in tagOptions" :key="t" :class="['tag', form.tag === t && 'tag-active']" @tap="form.tag = t">{{ t }}</text>
        </view>
      </view>
      <view class="form-item" @tap="form.default = !form.default">
        <text class="label">设为默认</text>
        <switch :checked="form.default" @change="onDefaultChange" color="#FF6B35" />
      </view>
    </view>
    <view class="save-btn" @tap="onSave">保存地址</view>

    <!-- 省市区选择弹窗 -->
    <view v-if="showRegionPicker" class="popup-mask" @tap="showRegionPicker = false">
      <view class="popup-content" @tap.stop>
        <view class="popup-header">
          <text class="popup-title">选择省市区</text>
          <text class="popup-close" @tap="showRegionPicker = false">×</text>
        </view>
        <picker-view class="region-picker" :value="regionIndex" @change="onRegionChange">
          <picker-view-column>
            <view v-for="p in regionList" :key="p.name" class="picker-item">{{ p.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="c in cityList" :key="c.name" class="picker-item">{{ c.name }}</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="d in districtList" :key="d" class="picker-item">{{ d }}</view>
          </picker-view-column>
        </picker-view>
        <view class="popup-btn" @tap="confirmRegion">确定</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { getAddressDetail, addAddress, updateAddress } from '@/api'
import type { AddressVO } from '@/types/api'

interface RegionNode {
  name: string
  children?: RegionNode[]
  districts?: string[]
}

const form = reactive<Partial<AddressVO>>({ id: undefined, name: '', phone: '', region: '', address: '', tag: '家', default: false })
const tagOptions = ['家', '公司', '学校', '其他']
const showRegionPicker = ref(false)
const regionIndex = ref([0, 0, 0])
const mapLocation = ref('')
const loading = ref(false)

const regionList = ref<RegionNode[]>([])

const cityList = computed(() => regionList.value[regionIndex.value[0]]?.children || [])
const districtList = computed(() => {
  const city = cityList.value[regionIndex.value[1]]
  return city?.districts || []
})

onLoad((q: any) => {
  if (q?.id) {
    loadDetail(Number(q.id))
  }
  const poi = uni.getStorageSync('wzz_map_selected_poi')
  if (poi?.name) {
    mapLocation.value = poi.name
    if (!form.address && poi.address) form.address = poi.address
  }
})

async function loadDetail(id: number) {
  loading.value = true
  try {
    const detail = await getAddressDetail(id)
    Object.assign(form, detail)
  } catch (e) {
    console.error('加载地址详情失败', e)
  } finally {
    loading.value = false
  }
}

onShow(() => {
  const poi = uni.getStorageSync('wzz_map_selected_poi')
  if (poi?.name) {
    mapLocation.value = poi.name
    if (!form.address && poi.address) form.address = poi.address
  }
})

function onRegionChange(e: any) {
  const val = e.detail.value || [0, 0, 0]
  regionIndex.value = val
}

function confirmRegion() {
  const p = regionList.value[regionIndex.value[0]]?.name || ''
  const c = cityList.value[regionIndex.value[1]]?.name || ''
  const d = districtList.value[regionIndex.value[2]] || ''
  form.region = [p, c, d].filter(Boolean).join(' ')
  showRegionPicker.value = false
}

function onDefaultChange(e: any) {
  form.default = !!e.detail.value
}

function goMap() {
  uni.navigateTo({ url: '/pages/address/map?from=edit' })
}

async function onSave() {
  if (!form.name || !form.phone || !form.address || !form.region) {
    return uni.showToast({ title: '请填写完整', icon: 'none' })
  }
  try {
    if (form.id) {
      await updateAddress(form.id, form)
    } else {
      await addAddress(form)
    }
    uni.showToast({ title: '已保存', icon: 'success' })
    uni.removeStorageSync('wzz_map_selected_poi')
    setTimeout(() => uni.navigateBack(), 600)
  } catch (e) {
    console.error('保存地址失败', e)
  }
}
</script>

<style lang="scss" scoped>
@use '@/styles/variables.scss' as *;

.edit { min-height: 100vh; background: $bg; padding: 12px 16px; }
.form-card { background: #fff; border-radius: $radius-md; overflow: hidden; }
.form-item { display: flex; align-items: center; padding: 14px 16px; border-bottom: 1px solid $border; min-height: 56px;
  .label { width: 80px; color: $text; font-size: 14px; }
  input { flex: 1; font-size: 14px; }
  .tag-group { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; .tag { padding: 4px 14px; border: 1px solid $border; border-radius: 14px; font-size: 12px; color: $text-light; } .tag-active { background: rgba(255, 107, 53, 0.1); border-color: $primary; color: $primary; } }
}
.region-text {
  flex: 1;
  font-size: 14px;
  color: $text;
}
.region-text.placeholder {
  color: $text-muted;
}
.arrow {
  font-size: 16px;
  color: $text-muted;
  margin-left: 8px;
}
.save-btn { margin-top: 24px; height: 50px; line-height: 50px; text-align: center; background: linear-gradient(135deg, $primary, $primary-light); color: #fff; border-radius: 25px; font-size: 16px; font-weight: 600; }

.popup-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
}
.popup-content {
  background: #fff;
  width: 100%;
  border-radius: $radius-lg $radius-lg 0 0;
  padding: 16px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
}
.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}
.popup-title {
  font-size: 16px;
  font-weight: 700;
  color: $text;
}
.popup-close {
  font-size: 24px;
  color: $text-muted;
  padding: 0 4px;
}
.region-picker {
  height: 220px;
  margin-bottom: 16px;
}
.picker-item {
  line-height: 44px;
  text-align: center;
  font-size: 14px;
  color: $text;
}
.popup-btn {
  height: 46px;
  line-height: 46px;
  text-align: center;
  background: linear-gradient(135deg, $primary, $primary-light);
  color: #fff;
  border-radius: 23px;
  font-size: 15px;
  font-weight: 600;
}
</style>
