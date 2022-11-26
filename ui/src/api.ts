import { createClient, HandlerFetchError } from 'typeful-fetch'
import { authToken } from '@ucenter/ui/src/api'
import { resolveUrl } from '@ucenter/ui/src/config'
import { useLocalStorage } from '@vueuse/core'
import type { HoleDescriptor } from '../..'
import { computed } from 'vue'

export const holeToken = useLocalStorage('hole-token', '')
export const anonymousMode = useLocalStorage('hole-anonymous', true)
export const token = computed(() =>
  anonymousMode.value ? undefined : holeToken.value
)

export const client = createClient<HoleDescriptor>(resolveUrl('/hole'), () => {
  return {
    headers: {
      'x-auth-token': authToken.value
    }
  }
})

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
