<template>
  <AutoBtn
    i18n-key="send-reply"
    :icon="mdiCommentOutline"
    @click="show = true"
  />
  <NModal v-model:show="show">
    <NCard
      style="width: 600px"
      :title="$t('send-reply')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <NSpace vertical>
        <NInput
          v-model:value="text"
          type="textarea"
          :placeholder="$t('hole-text-placeholder')"
        />
        <NSpace>
          <AsyncBtn :task="doReply" type="primary">
            {{ $t('send-reply') }}
          </AsyncBtn>
        </NSpace>
      </NSpace>
    </NCard>
  </NModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NInput, NSpace, NModal, NSwitch } from 'naive-ui'
import { mdiCommentOutline } from '@mdi/js'
import AsyncBtn from '@ucenter/ui/src/components/AsyncBtn.vue'
import AutoBtn from './AutoBtn.vue'
import { client, options } from './api'
import { useRouter } from 'vue-router'

const show = ref(false)
const text = ref('')
const router = useRouter()

const props = defineProps<{
  pid: number
}>()

const emit = defineEmits<{
  (event: 'reply'): void
}>()

async function doReply() {
  const resp = await client.comment.$post
    .body({ text: text.value, pid: props.pid })
    .query(options.value)
    .fetch()
  if (resp.code === 0) {
    emit('reply')
  } else {
    throw new Error((resp as unknown as { msg: string }).msg)
  }
}
</script>
