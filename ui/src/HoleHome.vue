<template>
  <HoleListView :loader="loader" detect-deletion />
</template>

<script setup lang="ts">
import HoleListView from './HoleListView.vue'
import { client, options } from './api'

async function loader(page: number) {
  const resp = await client.list.$get.query({ page, ...options.value }).fetch()
  return resp.data
}
</script>
