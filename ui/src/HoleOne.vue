<template>
  <div class="w-full grid grid-cols-1 gap-4 p-16">
    <HoleItem v-if="hole" :hole="hole" />
    <HoleComments :pid="props.pid" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoadingBar, useNotification } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { client } from './api'
import type { IHole } from '../..'
import HoleItem from './HoleItem.vue'
import HoleComments from './HoleComments.vue'

const props = defineProps<{
  pid: string
}>()

const { t } = useI18n()
const loadingBar = useLoadingBar()
const notification = useNotification()
const hole = ref<IHole>()

async function loadHole() {
  loadingBar.start()
  try {
    const pid = +props.pid
    const resp = await client.getone.$get.query({ pid }).fetch()
    hole.value = resp.data
    loadingBar.finish()
  } catch (err) {
    notification.error({
      title: t('error'),
      description: `${err}`
    })
    loadingBar.error()
  }
}

loadHole()
</script>
