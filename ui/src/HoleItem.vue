<template>
  <HoleItemMain :hole="props.hole" ref="target">
    <template #action>
      <NSpace>
        <NButton
          tag="a"
          :href="`https://pkuhelper.pku.edu.cn/hole/##${hole.pid}`"
          target="_blank"
        >
          <template #icon>
            <component :is="renderIcon(mdiOpenInNew)" />
          </template>
          {{ $t('view-in-pkuhelper') }}
        </NButton>
        <NButton @click="comments?.load()">
          <template #icon>
            <component :is="renderIcon(mdiRefresh)" />
          </template>
          {{ $t('reload') }}
        </NButton>
        <NButton @click="doCopy">
          <template #icon>
            <component :is="renderIcon(mdiClipboardOutline)" />
          </template>
          {{ $t('copy-hole-id') }}
        </NButton>
        <NButton @click="comments?.reverse()">
          <template #icon>
            <component :is="renderIcon(mdiSwapVertical)" />
          </template>
          {{ $t('reverse') }}
        </NButton>
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
import { NButton, NSpace, NScrollbar, useNotification } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
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
