<template>
  <view class="login-page">
    <view class="brand">
      <view class="brand-logo">味</view>
      <text class="brand-name">味真足</text>
      <text class="brand-slogan">外卖订餐 美味到家</text>
    </view>

    <view class="login-card">
      <view class="tabs">
        <view :class="['tab', mode === 'sms' && 'tab-active']" @tap="mode = 'sms'">验证码登录</view>
        <view :class="['tab', mode === 'pwd' && 'tab-active']" @tap="mode = 'pwd'">密码登录</view>
      </view>

      <!-- 短信登录 -->
      <view v-if="mode === 'sms'" class="form">
        <view class="form-item">
          <text class="form-label">手机号</text>
          <input v-model="phone" class="form-input" type="number" maxlength="11" placeholder="请输入手机号" />
        </view>
        <view class="form-item">
          <text class="form-label">验证码</text>
          <input v-model="code" class="form-input" type="number" maxlength="6" placeholder="请输入验证码" />
          <view :class="['sms-btn', countdown > 0 && 'sms-btn-disabled']" @tap="onSendCode">
            {{ countdown > 0 ? `${countdown}s 后重发` : '获取验证码' }}
          </view>
        </view>
        <view class="submit-btn" @tap="onSmsLogin">登 录</view>
        <view class="hint">未注册的手机号将自动创建账号</view>
      </view>

      <!-- 密码登录 -->
      <view v-else class="form">
        <view class="form-item">
          <text class="form-label">手机号</text>
          <input v-model="phone" class="form-input" type="number" maxlength="11" placeholder="请输入手机号" />
        </view>
        <view class="form-item">
          <text class="form-label">密码</text>
          <input v-model="password" class="form-input" :type="showPwd ? 'text' : 'password'" placeholder="请输入密码" />
          <view class="sms-btn" @tap="showPwd = !showPwd">{{ showPwd ? '隐藏' : '显示' }}</view>
        </view>
        <view class="submit-btn" @tap="onPwdLogin">登 录</view>
      </view>
    </view>

    <view class="footer">登录即代表同意《用户协议》《隐私政策》</view>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { MOCK_USER } from '@/mock'

const mode = ref<'sms' | 'pwd'>('sms')
const phone = ref('')
const code = ref('')
const password = ref('')
const showPwd = ref(false)
const countdown = ref(0)
const userStore = useUserStore()

let timer: any = null

function isValidPhone(p: string) { return /^1[3-9]\d{9}$/.test(p) }

function onSendCode() {
  if (countdown.value > 0) return
  if (!isValidPhone(phone.value)) {
    return uni.showToast({ title: '请输入正确的手机号', icon: 'none' })
  }
  uni.showToast({ title: '验证码已发送', icon: 'success' })
  countdown.value = 60
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) { clearInterval(timer); timer = null }
  }, 1000)
}

function onSmsLogin() {
  if (!isValidPhone(phone.value)) return uni.showToast({ title: '手机号格式错误', icon: 'none' })
  if (!code.value) return uni.showToast({ title: '请输入验证码', icon: 'none' })
  doLogin()
}

function onPwdLogin() {
  if (!isValidPhone(phone.value)) return uni.showToast({ title: '手机号格式错误', icon: 'none' })
  if (!password.value) return uni.showToast({ title: '请输入密码', icon: 'none' })
  doLogin()
}

function doLogin() {
  // 模拟登录成功，使用 Mock 用户数据
  const user = { ...MOCK_USER, token: 'mock_token_' + Date.now() }
  userStore.userInfo.value = user
  uni.setStorageSync('wzz_user_info', user)
  uni.showToast({ title: '登录成功', icon: 'success' })
  setTimeout(() => uni.reLaunch({ url: '/pages/profile/index' }), 600)
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.login-page {
  min-height: 100vh;
  background: linear-gradient(180deg, $primary 0%, $primary-light 30%, $bg 30%, $bg 100%);
  padding: 60px 24px 40px;
}

.brand { text-align: center; margin-bottom: 40px; }
.brand-logo {
  width: 72px; height: 72px; border-radius: 18px; margin: 0 auto 12px;
  background: #fff; color: $primary; display: flex; align-items: center; justify-content: center;
  font-size: 36px; font-weight: 800; box-shadow: $shadow-md;
}
.brand-name { display: block; font-size: 24px; font-weight: 700; color: #fff; letter-spacing: 2px; }
.brand-slogan { display: block; font-size: 13px; color: rgba(255, 255, 255, 0.85); margin-top: 4px; }

.login-card {
  background: #fff; border-radius: $radius-lg; padding: 24px 20px;
  box-shadow: $shadow-md;
}
.tabs { display: flex; border-bottom: 1px solid $border; margin-bottom: 24px; }
.tab {
  flex: 1; text-align: center; padding: 12px 0; font-size: 15px; color: $text-muted;
  position: relative; font-weight: 500;
}
.tab-active { color: $primary; font-weight: 700; }
.tab-active::after {
  content: ''; position: absolute; left: 50%; bottom: -1px; transform: translateX(-50%);
  width: 24px; height: 3px; background: $primary; border-radius: 2px;
}

.form-item {
  display: flex; align-items: center; border-bottom: 1px solid $border;
  padding: 14px 0; margin-bottom: 4px;
}
.form-label { width: 70px; color: $text; font-size: 14px; }
.form-input { flex: 1; font-size: 15px; color: $text; }
.sms-btn {
  padding: 6px 12px; font-size: 13px; color: $primary; border: 1px solid $primary;
  border-radius: 16px; background: #fff;
}
.sms-btn-disabled { color: $text-muted; border-color: $border; }

.submit-btn {
  margin-top: 28px; height: 48px; line-height: 48px; text-align: center;
  background: linear-gradient(135deg, $primary, $primary-light); color: #fff;
  font-size: 16px; font-weight: 600; border-radius: 24px;
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
}
.hint { text-align: center; font-size: 12px; color: $text-muted; margin-top: 12px; }

.footer { text-align: center; font-size: 11px; color: $text-muted; margin-top: 32px; }
</style>
