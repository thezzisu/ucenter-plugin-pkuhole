<template>
  <div class="w-full grid grid-cols-1 gap-4 p-16 pt-2 <lg:p-2">
    <NAlert type="info">{{ $t('recover-alert') }}</NAlert>
    <template v-if="result">
      <HoleItemMain :hole="result.data ?? {}">
        <template #action>
          <NSpace>
            <NButton @click="doCopy">
              <template #icon>
                <component :is="renderIcon(mdiClipboardOutline)" />
              </template>
              {{ $t('copy-hole-id') }}
            </NButton>
            <NButton @click=";(result?.comments ?? []).reverse()">
              <template #icon>
                <component :is="renderIcon(mdiSwapVertical)" />
              </template>
              {{ $t('reverse') }}
            </NButton>
          </NSpace>
        </template>
      </HoleItemMain>
      <HoleComments :comments="result.comments ?? []" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  useLoadingBar,
  useNotification,
  NAlert,
  NSpace,
  NButton
} from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { useClipboard } from '@vueuse/core'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiClipboardOutline, mdiSwapVertical } from '@mdi/js'
import { client, formatErr } from './api'
import HoleItemMain from './HoleItemMain.vue'
import HoleComments from './HoleComments.vue'

const props = defineProps<{
  pid: string
}>()

const { t } = useI18n()
const loadingBar = useLoadingBar()
const clipboard = useClipboard()
const notification = useNotification()

function doCopy() {
  clipboard.copy('#' + props.pid)
  notification.success({
    title: t('success'),
    description: `ID: #${props.pid}`,
    duration: 2000
  })
}

type RecoverResult = NonNullable<
  Awaited<ReturnType<typeof client['recover']['$get']['fetch']>>
>

const result = ref<RecoverResult>()

async function load() {
  loadingBar.start()
  try {
    const pid = +props.pid
    const resp = await client.recover.$get.query({ pid }).fetch()
    if (!resp) throw new Error(t('failed-to-recover'))
    result.value = resp
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
