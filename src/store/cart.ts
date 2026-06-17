import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { MOCK_CART } from '@/mock'

export interface CartItem {
  dishId: number
  name: string
  spec: string
  price: number
  qty: number
}

export const useCartStore = defineStore('cart', () => {
  // 从 Mock 数据初始化购物车
  const items = ref<CartItem[]>(MOCK_CART.items.map((i: any) => ({ ...i })))

  // 总件数
  const totalCount = computed(() => items.value.reduce((s, i) => s + i.qty, 0))
  // 外卖种类数
  const totalTypes = computed(() => items.value.length)
  // 商品总金额
  const totalAmount = computed(() => items.value.reduce((s, i) => s + i.price * i.qty, 0))

  function findItem(dishId: number, spec?: string) {
    return items.value.find(i => i.dishId === dishId && (!spec || i.spec === spec))
  }

  function addOrUpdate(payload: CartItem) {
    const existing = findItem(payload.dishId, payload.spec)
    if (existing) {
      existing.qty += payload.qty
    } else {
      items.value.push({ ...payload })
    }
  }

  function changeQty(dishId: number, delta: number, spec?: string) {
    const item = findItem(dishId, spec)
    if (!item) return
    item.qty += delta
    if (item.qty <= 0) {
      items.value = items.value.filter(i => !(i.dishId === dishId && (!spec || i.spec === spec)))
    }
  }

  function remove(dishId: number, spec?: string) {
    items.value = items.value.filter(i => !(i.dishId === dishId && (!spec || i.spec === spec)))
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    totalCount,
    totalTypes,
    totalAmount,
    addOrUpdate,
    changeQty,
    remove,
    clear
  }
})
