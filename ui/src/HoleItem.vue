<template>
  <HoleItemMain :hole="props.hole" ref="target">
    <template #action>
      <NSpace>
        <AutoBtn
          i18n-key="view-in-pkuhelper"
          :icon="mdiOpenInNew"
          :btn-props="{
            tag: 'a',
            href: `https://pkuhelper.pku.edu.cn/hole/##${hole.pid}`,
            target: '_blank'
          }"
        />
        <AutoBtn
          i18n-key="reload"
          :icon="mdiRefresh"
          @click="comments?.load()"
        />
        <AutoBtn
          i18n-key="copy-hole-id"
          :icon="mdiClipboardOutline"
          @click="doCopy"
        />
        <AutoBtn
          i18n-key="reverse"
          :icon="mdiSwapVertical"
          @click="comments?.reverse()"
        />
        <HoleReplyBtn :pid="+hole.pid" @reply="comments?.load()" />
      </NSpace>
    </template>
  </HoleItemMain>
  <template v-if="props.embed">
    <template v-if="showComments">
      <NScrollbar x-scrollable>
        <div class="comments-container">
          <HoleCommentsLoader :pid="hole.pid" ref="comments" />
        </div>
      </NScrollbar>
    </template>
  </template>
  <template v-else>
    <HoleCommentsLoader :pid="hole.pid" ref="comments" />
  </template>
</template>

<script setup lang="ts">
import { NSpace, NScrollbar, useNotification } from 'naive-ui'
import {
  mdiOpenInNew,
  mdiRefresh,
  mdiClipboardOutline,
  mdiSwapVertical
} from '@mdi/js'
import { useClipboard, useIntersectionObserver } from '@vueuse/core'
import type { IHole } from '../..'
import HoleCommentsLoader from './HoleCommentsLoader.vue'
import { onUnmounted, ref } from 'vue'
import HoleItemMain from './HoleItemMain.vue'
import { useI18n } from 'vue-i18n'
import HoleReplyBtn from './HoleReplyBtn.vue'
import AutoBtn from './AutoBtn.vue'

const props = defineProps<{
  hole: IHole
  embed?: boolean
}>()

const { t } = useI18n()
const clipboard = useClipboard()
const notification = useNotification()

function doCopy() {
  clipboard.copy('#' + props.hole.pid)
  notification.success({
    title: t('success'),
    description: `ID: #${props.hole.pid}`,
    duration: 2000
  })
}

const target = ref(null)
const comments = ref<InstanceType<typeof HoleCommentsLoader> | null>(null)
const showComments = ref(false)

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      showComments.value = true
      stop()
    }
  }
)

onUnmounted(() => {
  stop()
})
</script>

<style>
.comments-container {
  @apply grid gap-2 mb-2 p-2;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-auto-flow: column;
  grid-auto-columns: minmax(320px, 1fr);
}
</style>
