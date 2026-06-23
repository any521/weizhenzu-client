import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { smsLogin, passwordLogin, sendSmsCode, logout as apiLogout, getUserProfile } from '@/api'
import { getToken, setToken, clearToken, getRefreshToken, setRefreshToken, clearRefreshToken } from '@/utils/request'

const USER_KEY = 'wzz_user_info'

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const refreshToken = ref(getRefreshToken())
  const userInfo = ref<any>(uni.getStorageSync(USER_KEY) || null)

  const isLoggedIn = computed(() => !!token.value)
  const userId = computed(() => userInfo.value?.id)
  const nickname = computed(() => userInfo.value?.nickname || '游客')
  const avatar = computed(() => userInfo.value?.avatar || '')

  function initFromStorage() {
    token.value = getToken()
    refreshToken.value = getRefreshToken()
    userInfo.value = uni.getStorageSync(USER_KEY) || null
  }

  async function loginBySms(phone: string, code: string) {
    const res = await smsLogin(phone, code)
    token.value = res.token || ''
    refreshToken.value = res.refreshToken || ''
    setToken(res.token || '')
    setRefreshToken(res.refreshToken || '')
    // 登录成功后拉取完整资料
    const profile = await fetchProfile()
    return { ...res, ...profile }
  }

  async function loginByPassword(phone: string, password: string) {
    const res = await passwordLogin(phone, password)
    token.value = res.token || ''
    refreshToken.value = res.refreshToken || ''
    setToken(res.token || '')
    setRefreshToken(res.refreshToken || '')
    // 登录成功后拉取完整资料
    const profile = await fetchProfile()
    return { ...res, ...profile }
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
    refreshToken.value = ''
    userInfo.value = null
    clearToken()
    clearRefreshToken()
    uni.removeStorageSync(USER_KEY)
  }

  return {
    token, refreshToken, userInfo, isLoggedIn, userId, nickname, avatar,
    initFromStorage, loginBySms, loginByPassword, fetchProfile, sendCode, logout
  }
})
