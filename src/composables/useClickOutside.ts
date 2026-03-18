import { onMounted, onUnmounted, type Ref } from 'vue'

export function useClickOutside(el: Ref<HTMLElement | null>, callback: () => void) {
  const handler = (e: MouseEvent) => {
    if (el.value && !el.value.contains(e.target as Node)) callback()
  }
  onMounted(() => document.addEventListener('click', handler))
  onUnmounted(() => document.removeEventListener('click', handler))
}
