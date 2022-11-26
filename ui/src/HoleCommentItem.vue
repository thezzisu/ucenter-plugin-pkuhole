<template>
  <NCard class="shadow">
    <template #header>
      <code>{{ comment.cid }}</code>
    </template>
    <template #header-extra>
      <NSpace>
        <NTag :type="props.comment.islz ? 'error' : 'default'">
          {{ props.comment.name }}
          <template #icon>
            <component :is="renderIcon(mdiAccount)" />
          </template>
        </NTag>
      </NSpace>
    </template>
    <article
      class="p-2 whitespace-pre-wrap max-h-128 overflow-auto"
      v-html="props.comment.text"
    ></article>
    <template #footer>
      <NSpace>
        <NTag>
          {{ formatTs(props.comment.timestamp) }}
          <template #icon>
            <component :is="renderIcon(mdiClock)" />
          </template>
        </NTag>
      </NSpace>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NTag, NSpace } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiAccount, mdiClock } from '@mdi/js'
import type { IComment } from '../../lib'
import { formatTs } from './utils'

const props = defineProps<{
  comment: IComment
}>()
</script>
