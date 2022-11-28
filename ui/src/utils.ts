import { ref } from 'vue'

export function formatTs(ts: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Date(1000 * +ts).toLocaleString()
}

export const deletionOnly = ref(false)
