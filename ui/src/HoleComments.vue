<template>
  <template v-if="loading">
    <NSpace vertical>
      <NSkeleton height="40px" width="33%" />
      <NSkeleton text :repeat="3" />
      <NSkeleton height="40px" />
    </NSpace>
  </template>
  <template v-else>
    <CommentItem
      v-for="comment in comments"
      :key="comment.cid"
      :comment="comment"
    />
    <NCard :title="$t('no-comment')" v-if="!comments.length" />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNotification, NSpace, NSkeleton, NCard } from 'naive-ui'
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
const loading = ref(false)

async function load() {
  if (loading.value) return
  loading.value = true
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
  loading.value = false
}

load()

defineExpose({
  load
})
</script>
