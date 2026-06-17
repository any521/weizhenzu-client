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
      <view class="form-item">
        <text class="label">详细地址</text>
        <input v-model="form.address" placeholder="街道、门牌号等" />
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
  </view>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { MOCK_ADDRESSES } from '@/mock'

const form = reactive({ id: null as any, name: '', phone: '', address: '', tag: '家', default: false })
const tagOptions = ['家', '公司', '学校', '其他']

onLoad((q: any) => {
  if (q?.id) {
    const found = MOCK_ADDRESSES.find(a => String(a.id) === q.id)
    if (found) {
      form.id = found.id
      form.name = found.name
      form.phone = found.phone
      form.address = found.address
      form.tag = found.tag || '家'
      form.default = found.default || false
    }
  }
})

function onDefaultChange(e: any) {
  form.default = !!e.detail.value
}

function onSave() {
  if (!form.name || !form.phone || !form.address) {
    return uni.showToast({ title: '请填写完整', icon: 'none' })
  }
  uni.showToast({ title: '已保存', icon: 'success' })
  setTimeout(() => uni.navigateBack(), 600)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.edit { min-height: 100vh; background: $bg; padding: 12px 16px; }
.form-card { background: #fff; border-radius: $radius-md; overflow: hidden; }
.form-item { display: flex; align-items: center; padding: 14px 16px; border-bottom: 1px solid $border; min-height: 56px;
  .label { width: 80px; color: $text; font-size: 14px; }
  input { flex: 1; font-size: 14px; }
  .tag-group { display: flex; gap: 8px; flex-wrap: wrap; flex: 1; .tag { padding: 4px 14px; border: 1px solid $border; border-radius: 14px; font-size: 12px; color: $text-light; } .tag-active { background: rgba(255, 107, 53, 0.1); border-color: $primary; color: $primary; } }
}
.save-btn { margin-top: 24px; height: 50px; line-height: 50px; text-align: center; background: linear-gradient(135deg, $primary, $primary-light); color: #fff; border-radius: 25px; font-size: 16px; font-weight: 600; }
</style>
