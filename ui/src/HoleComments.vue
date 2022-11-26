<template>
  <CommentItem
    v-for="comment in props.comments"
    :key="comment.cid"
    :comment="comment"
  />
  <NCard :title="$t('no-comment')" v-if="!comments.length" />
</template>

<script setup lang="ts">
import { NCard } from 'naive-ui'
import type { IComment } from '../../lib'
import CommentItem from './HoleCommentItem.vue'

const props = defineProps<{
  comments: IComment[]
}>()
</script>
