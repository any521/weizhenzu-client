import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTabStore = defineStore('tab', () => {
  const activeTab = ref('/pages/index/index')

  function setActiveTab(path: string) {
    activeTab.value = path
  }

  return { activeTab, setActiveTab }
})
