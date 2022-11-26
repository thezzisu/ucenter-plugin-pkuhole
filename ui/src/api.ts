import { createClient } from 'typeful-fetch'
import { authToken } from '@ucenter/ui/src/api'
import { resolveUrl } from '@ucenter/ui/src/config'
import type { HoleDescriptor } from '../..'

export const client = createClient<HoleDescriptor>(resolveUrl('/hole'), () => {
  return {
    headers: {
      'x-auth-token': authToken.value
    }
  }
})
