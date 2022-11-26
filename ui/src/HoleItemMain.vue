<template>
  <NCard :segmented="{ content: true }" class="shadow">
    <template #header>
      <RouterLink :to="`/hole/${hole.pid}`">
        <code>#{{ hole.pid }}</code>
      </RouterLink>
    </template>
    <template #header-extra>
      <NSpace>
        <NTag type="error">
          {{ props.hole.likenum }}
          <template #icon>
            <component :is="renderIcon(mdiStar)" />
          </template>
        </NTag>
        <NTag type="success">
          {{ props.hole.reply }}
          <template #icon>
            <component :is="renderIcon(mdiMessageReply)" />
          </template>
        </NTag>
      </NSpace>
    </template>
    <div class="flex justify-center">
      <NImage
        v-if="hole.url"
        :src="`https://pkuhelper.pku.edu.cn/services/pkuhole/images/${hole.url}`"
        :img-props="{ style: { 'max-height': '128px' } }"
      />
    </div>
    <article class="p-2 whitespace-pre-wrap max-h-128 overflow-auto">
      {{ props.hole.text }}
    </article>
    <template #footer>
      <NSpace>
        <NTag>
          {{ formatTs(props.hole.timestamp) }}
          <template #icon>
            <component :is="renderIcon(mdiClock)" />
          </template>
        </NTag>
      </NSpace>
    </template>
    <template #action>
      <slot name="action"></slot>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NImage, NTag, NButton, NSpace, NScrollbar } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import {
  mdiStar,
  mdiMessageReply,
  mdiOpenInNew,
  mdiClock,
  mdiRefresh
} from '@mdi/js'
import type { IHole } from '../..'
import { formatTs } from './utils'
const props = defineProps<{
  hole: IHole
}>()
</script>
