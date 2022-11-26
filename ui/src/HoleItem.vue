<template>
  <NCard :segmented="{ content: true }" class="shadow">
    <template #header>
      <RouterLink :to="`/hole/${hole.pid}`">
        <code>{{ hole.pid }}</code>
      </RouterLink>
    </template>
    <template #header-extra>
      <NSpace>
        <NTag>
          {{ props.hole.likenum }}
          <template #icon>
            <component :is="likeIcon" />
          </template>
        </NTag>
        <NTag>
          {{ props.hole.reply }}
          <template #icon>
            <component :is="replyIcon" />
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
    <article class="p-2 whitespace-pre-wrap">{{ props.hole.text }}</article>
    <template #footer>
      <code>
        {{ (Date as any)(+props.hole.timestamp).toLocaleString() }}
        {{ props.hole.tag }}
        {{ props.hole.extra }}
      </code>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NImage, NTag, NIcon, NSpace } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiThumbUp, mdiMessageReply } from '@mdi/js'
import type { IHole } from '../..'
const props = defineProps<{
  hole: IHole
}>()

const likeIcon = renderIcon(mdiThumbUp)
const replyIcon = renderIcon(mdiMessageReply)
</script>
