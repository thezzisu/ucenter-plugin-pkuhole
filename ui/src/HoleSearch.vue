<template>
  <HoleListView :loader="loader">
    <template #header>
      <NCard>
        <template #header>
          Search result for {{ $route.query.keywords }}
        </template>
      </NCard>
    </template>
  </HoleListView>
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'
import { useRoute } from 'vue-router'
import HoleListView from './HoleListView.vue'
import { client, options } from './api'

const route = useRoute()

async function loader(page: number) {
  const resp = await client.search.$get
    .query({ page, keywords: `${route.query.keywords}`, ...options.value })
    .fetch()
  return resp.data
}
</script>
