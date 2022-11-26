import { createClient } from 'typeful-fetch'
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
