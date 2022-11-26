<template>
  <div class="grid grid-cols-1 gap-2 p-16 pt-2 <lg:p-2">
    <NBackTop />
    <slot name="header"></slot>
    <template v-for="(hole, i) in holes" :key="hole.pid">
      <DeletionDetector
        v-if="props.detectDeletion && i"
        :up="holes[i - 1].pid"
        :down="hole.pid"
      />
      <HoleItem :hole="hole" embed />
    </template>
    <div class="flex justify-center" ref="loader">
      <NButton :loading="loading" @click="loadPage">
        {{ $t('load-more') }}
      </NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLoadingBar, useNotification, NBackTop, NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import type { IHole } from '../../lib'
import HoleItem from './HoleItem.vue'
import DeletionDetector from './DeletionDetector.vue'
import { formatErr } from './api'

const props = defineProps<{
  loader: (page: number) => Promise<IHole[]>
  detectDeletion?: boolean
}>()

const { t } = useI18n()
const loadingBar = useLoadingBar()
const notification = useNotification()
const loadedPages = ref(0)
const loading = ref(false)
const holes = ref<IHole[]>([])
const loader = ref<HTMLElement>()

function appendHoles(newHoles: IHole[]) {
  const lastPid = parseInt(holes.value[holes.value.length - 1]?.pid)
  while (lastPid && newHoles.length) {
    const pid = parseInt(newHoles[0].pid)
    if (pid < lastPid) break
    newHoles.shift()
  }
  holes.value = [...holes.value, ...newHoles]
}

async function loadPage() {
  if (loading.value) return
  loading.value = true
  loadingBar.start()
  try {
    const holes = await props.loader(loadedPages.value + 1)
    appendHoles(holes)
    loadedPages.value++
    loadingBar.finish()
  } catch (err) {
    notification.error({
      title: t('error'),
      description: await formatErr(err),
      duration: 2000
    })
    loadingBar.error()
  }
  loading.value = false
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadPage()
        }
      })
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
  )
  loader.value && observer.observe(loader.value)
})
</script>
