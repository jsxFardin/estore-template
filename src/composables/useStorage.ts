import { ref, watch, type Ref } from 'vue'

/** Reactive value persisted to localStorage (guards against private-mode errors). */
export function useStorage<T>(key: string, initial: T): Ref<T> {
  let stored: T = initial
  try {
    const raw = localStorage.getItem(key)
    if (raw) stored = JSON.parse(raw) as T
  } catch {
    /* ignore */
  }
  const state = ref(stored) as Ref<T>
  watch(
    state,
    (v) => {
      try {
        localStorage.setItem(key, JSON.stringify(v))
      } catch {
        /* ignore */
      }
    },
    { deep: true },
  )
  return state
}
