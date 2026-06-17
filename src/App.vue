<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user'
import { useTabStore } from '@/store/tab'

onLaunch(() => {
  console.log('App Launch - 味真足')
  // 启动时尝试恢复登录态
  useUserStore().initFromStorage()
})

onShow(() => {
  console.log('App Show')
  const pages = getCurrentPages()
  const route = pages.length ? `/${pages[pages.length - 1].route}` : '/pages/index/index'
  useTabStore().setActiveTab(route)
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* 全局样式 - 红色调外卖风格 */
@import '@/styles/variables.scss';

page {
  background: $bg;
  color: $text;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Helvetica Neue", "Microsoft YaHei", sans-serif;
}

view, text, button, input, textarea { box-sizing: border-box; }

/* 隐藏滚动条 */
::-webkit-scrollbar { display: none; }
* { scrollbar-width: none; -ms-overflow-style: none; }

/* Vant 主题色覆盖 */
:root {
  --van-primary-color: #FF4B33;
  --van-button-primary-background: #FF4B33;
  --van-button-primary-border-color: #FF4B33;
  --van-tabbar-item-active-color: #FF4B33;
  --van-nav-bar-icon-color: #FFFFFF;
  --van-nav-bar-title-text-color: #FFFFFF;
}

/* H5 下隐藏原生 tabbar，使用页面内自定义 GlobalTabbar */
/* #ifdef H5 */
uni-tabbar.uni-tabbar-bottom,
.uni-placeholder {
  display: none !important;
  height: 0 !important;
  overflow: hidden !important;
}
/* #endif */
</style>
