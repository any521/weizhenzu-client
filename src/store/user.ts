import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { smsLogin, sendSmsCode, logout as apiLogout, getUserProfile } from '@/api'
import { getToken, setToken, clearToken } from '@/utils/request'

const USER_KEY = 'wzz_user_info'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const userInfo = ref<any>(uni.getStorageSync(USER_KEY) || null)

  const isLoggedIn = computed(() => !!token.value)
  const userId = computed(() => userInfo.value?.id)
  const nickname = computed(() => userInfo.value?.nickname || '游客')
  const avatar = computed(() => userInfo.value?.avatar || '')

  function initFromStorage() {
    token.value = getToken()
    userInfo.value = uni.getStorageSync(USER_KEY) || null
  }

  async function loginBySms(phone: string, code: string) {
    const res: any = await smsLogin(phone, code)
    token.value = res.token
    userInfo.value = res
    setToken(res.token)
    uni.setStorageSync(USER_KEY, res)
    return res
  }

  async function fetchProfile() {
    const res: any = await getUserProfile()
    userInfo.value = res
    uni.setStorageSync(USER_KEY, res)
    return res
  }

  async function sendCode(phone: string, scene = 'LOGIN') {
    return sendSmsCode(phone, scene)
  }

  async function logout() {
    try { await apiLogout() } catch (e) { /* ignore */ }
    token.value = ''
    userInfo.value = null
    clearToken()
    uni.removeStorageSync(USER_KEY)
  }

  return {
    token, userInfo, isLoggedIn, userId, nickname, avatar,
    initFromStorage, loginBySms, fetchProfile, sendCode, logout
  }
})
