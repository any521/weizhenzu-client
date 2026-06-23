import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from '@/api'
import type { CartVO, CartItemVO } from '@/types/api'

export interface AddCartPayload {
  merchantId: number
  dishId: number
  specId?: number
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartVO | null>(null)
  const loading = ref(false)

  const items = computed(() => cart.value?.items || [])
  const merchantId = computed(() => cart.value?.merchantId)
  const merchantName = computed(() => cart.value?.merchantName || '')
  const totalCount = computed(() => items.value.reduce((s, i) => s + i.quantity, 0))
  const totalTypes = computed(() => items.value.length)
  const totalAmount = computed(() => Number(cart.value?.totalAmount || 0))
  const deliveryFee = computed(() => Number(cart.value?.deliveryFee || 0))
  const packingFee = computed(() => Number(cart.value?.packingFee || 0))
  const payAmount = computed(() => Number(cart.value?.payAmount || 0))
  const minOrderAmount = computed(() => Number(cart.value?.minOrderAmount || 0))
  const reachMinAmount = computed(() => cart.value?.reachMinAmount ?? totalAmount.value >= minOrderAmount.value)

  /** 用于菜品详情/商家详情回显当前数量 */
  const qtyMap = computed(() => {
    const map: Record<string, number> = {}
    items.value.forEach((item) => {
      map[`${item.dishId}-${item.specId || ''}`] = item.quantity
    })
    return map
  })

  function getQty(dishId: number, specId?: number) {
    return qtyMap.value[`${dishId}-${specId || ''}`] || 0
  }

  async function fetchCart(showLoading = false) {
    loading.value = true
    try {
      cart.value = await getCart()
    } catch (e) {
      console.error('获取购物车失败', e)
    } finally {
      loading.value = false
    }
  }

  async function addItem(payload: AddCartPayload) {
    await addToCart(payload)
    await fetchCart()
  }

  async function changeQty(cartItemId: number, quantity: number) {
    if (quantity <= 0) {
      await removeCartItem(cartItemId)
    } else {
      await updateCartItem(cartItemId, { quantity })
    }
    await fetchCart()
  }

  async function remove(itemId: number) {
    await removeCartItem(itemId)
    await fetchCart()
  }

  async function clear() {
    await clearCart()
    cart.value = null
  }

  return {
    cart,
    loading,
    items,
    merchantId,
    merchantName,
    totalCount,
    totalTypes,
    totalAmount,
    deliveryFee,
    packingFee,
    payAmount,
    minOrderAmount,
    reachMinAmount,
    qtyMap,
    getQty,
    fetchCart,
    addItem,
    changeQty,
    remove,
    clear,
  }
})
