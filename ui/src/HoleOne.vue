<template>
  <div class="w-full grid grid-cols-1 gap-4 p-16 pt-2 <lg:p-2">
    <HoleItem v-if="hole" :hole="hole" />
    <NAlert v-else-if="hole === null" :title="$t('hole-deleted')" type="error">
      <template #icon>
        <component :is="renderIcon(mdiInformation)" />
      </template>
      <NButton type="error">
        <RouterLink :to="`/hole/recover/${$props.pid}`">
          <code>#{{ props.pid }}</code>
        </RouterLink>
      </NButton>
    </NAlert>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoadingBar, useNotification, NAlert, NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiInformation } from '@mdi/js'
import { client, formatErr, options } from './api'
import type { IHole } from '../..'
import HoleItem from './HoleItem.vue'

const props = defineProps<{
  pid: string
}>()

const { t } = useI18n()
const loadingBar = useLoadingBar()
const notification = useNotification()
const hole = ref<IHole | null>()

async function load() {
  loadingBar.start()
  try {
    const pid = +props.pid
    const resp = await client.getone.$get
      .query({ pid, ...options.value })
      .fetch()
    hole.value = resp.data ?? null
    loadingBar.finish()
  } catch (err) {
    notification.error({
      title: t('error'),
      description: await formatErr(err),
      duration: 2000
    })
    loadingBar.error()
  }
}

load()
</script>
