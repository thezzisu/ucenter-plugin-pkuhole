<template>
  <div class="w-full grid grid-cols-1 gap-4 p-16 <lg:p-2">
    <NAlert type="info">{{ $t('recover-alert') }}</NAlert>
    <template v-if="result">
      <HoleItemMain :hole="result.data ?? {}">
        <!-- Actions -->
      </HoleItemMain>
      <HoleComments :comments="result.comments ?? []" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoadingBar, useNotification, NAlert } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { client } from './api'
import HoleItemMain from './HoleItemMain.vue'
import HoleComments from './HoleComments.vue'

const props = defineProps<{
  pid: string
}>()

const { t } = useI18n()
const loadingBar = useLoadingBar()
const notification = useNotification()

type RecoverResult = NonNullable<
  Awaited<ReturnType<typeof client['recover']['$get']['fetch']>>
>

const result = ref<RecoverResult>()

async function load() {
  loadingBar.start()
  try {
    const pid = +props.pid
    const resp = await client.recover.$get.query({ pid }).fetch()
    if (!resp) throw new Error('Unable to recover')
    result.value = resp
    loadingBar.finish()
  } catch (err) {
    notification.error({
      title: t('error'),
      description: `${err}`
    })
    loadingBar.error()
  }
}

load()
</script>
