<template>
  <HoleListView :loader="loader" detect-deletion>
    <template #header>
      <HoleHeader />
    </template>
  </HoleListView>
</template>

<script setup lang="ts">
import HoleHeader from './HoleHeader.vue'
import HoleListView from './HoleListView.vue'
import { client, token } from './api'

async function loader(page: number) {
  const resp = await client.list.$get.query({ page, token: token.value }).fetch()
  return resp.data
}
</script>
