<template>
  <HoleListView :loader="loader" detect-deletion />
</template>

<script setup lang="ts">
import HoleListView from './HoleListView.vue'
import { client, token } from './api'

async function loader(page: number) {
  const resp = await client.list.$get
    .query({ page, token: token.value })
    .fetch()
  return resp.data
}
</script>
