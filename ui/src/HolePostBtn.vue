<template>
  <AutoBtn i18n-key="post-hole" :icon="mdiSend" @click="show = true" />
  <NModal v-model:show="show">
    <NCard
      style="width: 600px"
      :title="$t('post-hole')"
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
          <AsyncBtn :task="doPost" type="primary">
            {{ $t('post-hole') }}
          </AsyncBtn>
        </NSpace>
      </NSpace>
    </NCard>
  </NModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NInput, NSpace, NModal, NSwitch } from 'naive-ui'
import { mdiSend } from '@mdi/js'
import AsyncBtn from '@ucenter/ui/src/components/AsyncBtn.vue'
import AutoBtn from './AutoBtn.vue'
import { client, options } from './api'
import { useRouter } from 'vue-router'

const show = ref(false)
const text = ref('')
const router = useRouter()

async function doPost() {
  const resp = await client.post.$post
    .body({ text: text.value })
    .query(options.value)
    .fetch()
  if (resp.code === 0) {
    const href = router.resolve(`/hole/${resp.data}`).href
    window.open(href, '_blank')
  } else {
    throw new Error((resp as unknown as { msg: string }).msg)
  }
}
</script>
