import { ref, onMounted, onUnmounted, Ref } from 'vue'

// elementRef 目标元素
export default (elementRef: Ref<null | HTMLElement>) => {
  // 定义一个状态表示是否在元素外点击
  const isClickOutside = ref(false)
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  // Hook 被注册时开启监听
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  // Hook 被注销时移除监听
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
  // 把状态传递给父级组件
  return isClickOutside
}
