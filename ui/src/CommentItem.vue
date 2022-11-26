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
    <article class="p-2" v-html="props.comment.text"></article>
    <template #footer>
      <code>
        {{ formatTs(props.comment.timestamp) }}
        {{ props.comment.tag }}
        {{ props.comment.islz ? 'lz' : '' }}
      </code>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NTag, NIcon, NSpace } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiAccount } from '@mdi/js'
import type { IComment } from '../..'
import { formatTs } from './utils'

const props = defineProps<{
  comment: IComment
}>()
</script>
