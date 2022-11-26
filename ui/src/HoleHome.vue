<template>
  <div class="grid grid-cols-1 gap-2 p-16 <lg:p-2">
    <NBackTop />
    <HoleItem v-for="hole in holes" :key="hole.pid" :hole="hole" />
    <div class="flex justify-center" ref="loader">
      <NButton :loading="loading" @click="loadPage">Load More</NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useLoadingBar, useNotification, NBackTop, NButton } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { client } from './api'
import type { IHole } from '../..'
import HoleItem from './HoleItem.vue'

const { t } = useI18n()
const loadingBar = useLoadingBar()
const notification = useNotification()
const loadedPages = ref(0)
const loading = ref(false)
const holes = ref<IHole[]>([])
const loader = ref<HTMLElement>()

function appendHoles(newHoles: IHole[]) {
  // TODO: delete duplicated holes
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
    const resp = await client.list.$get
      .query({ page: loadedPages.value + 1 })
      .fetch()
    appendHoles(resp.data)
    loadedPages.value++
    loadingBar.finish()
  } catch (err) {
    notification.error({
      title: t('error'),
      description: `${err}`
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
