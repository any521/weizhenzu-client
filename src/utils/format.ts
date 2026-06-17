/**
 * 格式化工具
 */
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

dayjs.locale('zh-cn')

/** 格式化金额 (分 → 元) */
export const formatMoney = (cents: number | string | undefined | null, withSymbol = true): string => {
  const n = Number(cents || 0) / 100
  return (withSymbol ? '¥' : '') + n.toFixed(2)
}

/** 格式化时间 */
export const formatTime = (date: string | Date | undefined | null, fmt = 'YYYY-MM-DD HH:mm'): string => {
  if (!date) return ''
  return dayjs(date).format(fmt)
}

/** 相对时间 */
export const fromNow = (date: string | Date | undefined | null): string => {
  if (!date) return ''
  const d = dayjs(date)
  const diff = dayjs().diff(d, 'minute')
  if (diff < 1) return '刚刚'
  if (diff < 60) return `${diff}分钟前`
  if (diff < 1440) return `${Math.floor(diff / 60)}小时前`
  if (diff < 10080) return `${Math.floor(diff / 1440)}天前`
  return d.format('YYYY-MM-DD')
}

/** 手机号脱敏 */
export const maskPhone = (phone: string | undefined | null): string => {
  if (!phone) return ''
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/** 订单状态文案 */
export const orderStatusText = (status: number): string => {
  const map: Record<number, string> = {
    0: '待付款', 1: '待接单', 2: '已接单', 3: '制作中', 4: '待取餐',
    5: '配送中', 6: '已送达', 7: '已完成', 8: '已取消', 9: '退款中', 10: '已退款'
  }
  return map[status] ?? '未知'
}
