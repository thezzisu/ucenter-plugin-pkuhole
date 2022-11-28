<template>
  <template v-if="delta">
    <NAlert :title="`${delta} ${$t('hole-deleted')}`" type="error">
      <template #icon>
        <component :is="renderIcon(mdiInformation)" />
      </template>
      <NSpace>
        <NButton v-for="hole in deletedHoles" :key="hole" type="error">
          <RouterLink :to="`/hole/recover/${hole}`" target="_blank">
            <code>#{{ hole }}</code>
          </RouterLink>
        </NButton>
      </NSpace>
    </NAlert>
    <NScrollbar x-scrollable>
      <div class="deletions-container">
        <DeletionItemLoader
          v-for="hole in deletedHoles"
          :key="hole"
          :pid="hole"
        />
      </div>
    </NScrollbar>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NAlert, NSpace, NButton, NScrollbar } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiInformation } from '@mdi/js'
import DeletionItemLoader from './DeletionItemLoader.vue'

const props = defineProps<{
  up: string
  down: string
}>()

const up = computed(() => +props.up)
const down = computed(() => +props.down)
const delta = computed(() => up.value - down.value - 1)
const deletedHoles = computed(() =>
  Array(delta.value)
    .fill(0)
    .map((_, i) => i + down.value + 1)
)
</script>

<style>
.deletions-container {
  @apply grid gap-2 mb-2 p-2;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: minmax(320px, 1fr);
}
</style>
