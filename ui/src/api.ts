import { HandlerFetchError } from 'typeful-fetch'
import { createResolvedClient } from '@ucenter/ui/src/utils'
import { useLocalStorage } from '@vueuse/core'
import type { HoleDescriptor } from '../..'
import { computed } from 'vue'

export const holeToken = useLocalStorage('hole-token', '')
export const holeProxy = useLocalStorage('hole-proxy', '')
export const anonymousMode = useLocalStorage('hole-anonymous', true)
export const options = computed(() => ({
  token: anonymousMode.value ? undefined : holeToken.value,
  proxy: holeProxy.value
}))

export const client = createResolvedClient<HoleDescriptor>('/hole')

export async function formatErr(err: unknown) {
  try {
    if (err instanceof Error) {
      if (err instanceof HandlerFetchError) {
        const { message } = await err.response.json()
        return message
      }
      return err.message
    }
    return `${err}`
  } catch (err) {
    return `${err}`
  }
}
