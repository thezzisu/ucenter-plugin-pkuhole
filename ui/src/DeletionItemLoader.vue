<template>
  <template v-if="recover.isLoading.value">
    <NSpace vertical>
      <NSkeleton height="40px" width="33%" />
      <NSkeleton text :repeat="3" />
      <NSkeleton height="40px" />
    </NSpace>
  </template>
  <HoleItemMain
    v-else-if="recover.state.value"
    :hole="recover.state.value.data"
  />
  <NAlert v-else type="error">
    <template #icon>
      <component :is="renderIcon(mdiInformation)" />
    </template>
    <p>
      <code>#{{ props.pid }} {{ $t('failed-to-recover') }}</code>
    </p>
  </NAlert>
</template>

<script setup lang="ts">
import { useAsyncState } from '@vueuse/core'
import { NSpace, NSkeleton, NAlert } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiInformation } from '@mdi/js'
import { client } from './api'
import HoleItemMain from './HoleItemMain.vue'

const props = defineProps<{
  pid: number
}>()

const recover = useAsyncState(
  async () => {
    const result = await client.recover.$get
      .query({ pid: props.pid, noComments: true })
      .fetch()
    return result
  },
  null,
  { immediate: true }
)
</script>
