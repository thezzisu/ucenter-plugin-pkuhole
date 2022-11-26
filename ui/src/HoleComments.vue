<template>
  <CommentItem
    v-for="comment in comments"
    :key="comment.cid"
    :comment="comment"
  />
</template>

<script setup lang="ts">
import { h, ref } from 'vue'
import { useLoadingBar, useNotification } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import { client } from './api'
import type { IComment } from '../..'
import CommentItem from './CommentItem.vue'

const { t } = useI18n()
const notification = useNotification()

const props = defineProps<{
  pid: string
}>()

const comments = ref<IComment[]>([])

async function loadComments() {
  try {
    const pid = +props.pid
    const resp = await client.getcomment.$get.query({ pid }).fetch()
    comments.value = resp.data
  } catch (err) {
    notification.error({
      title: t('error'),
      description: `${err}`
    })
  }
}

loadComments()
</script>
