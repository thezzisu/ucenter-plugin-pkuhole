<template>
  <template v-if="delta">
    <NAlert :title="`${delta} ${$t('hole-deleted')}`" type="error">
      <template #icon>
        <component :is="renderIcon(mdiInformation)" />
      </template>
      <NSpace>
        <NButton v-for="hole in deletedHoles" :key="hole" type="error">
          <RouterLink :to="`/hole/recover/${hole}`">
            <code>#{{ hole }}</code>
          </RouterLink>
        </NButton>
      </NSpace>
    </NAlert>
  </template>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { NAlert, NSpace, NButton } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiInformation } from '@mdi/js'

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
