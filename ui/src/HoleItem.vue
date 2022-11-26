<template>
  <NCard :segmented="{ content: true }" class="shadow" ref="target">
    <template #header>
      <RouterLink :to="`/hole/${hole.pid}`">
        <code>{{ hole.pid }}</code>
      </RouterLink>
    </template>
    <template #header-extra>
      <NSpace>
        <NTag type="error">
          {{ props.hole.likenum }}
          <template #icon>
            <component :is="renderIcon(mdiStar)" />
          </template>
        </NTag>
        <NTag type="success">
          {{ props.hole.reply }}
          <template #icon>
            <component :is="renderIcon(mdiMessageReply)" />
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
      <NSpace>
        <NTag>
          {{ formatTs(props.hole.timestamp) }}
          <template #icon>
            <component :is="renderIcon(mdiClock)" />
          </template>
        </NTag>
      </NSpace>
    </template>
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
      </NSpace>
    </template>
  </NCard>
  <template v-if="props.embed">
    <template v-if="showComments">
      <NScrollbar x-scrollable>
        <div class="comments-container">
          <HoleComments :pid="hole.pid" ref="comments" />
        </div>
      </NScrollbar>
    </template>
  </template>
  <template v-else>
    <HoleComments :pid="hole.pid" ref="comments" />
  </template>
</template>

<script setup lang="ts">
import { NCard, NImage, NTag, NButton, NSpace, NScrollbar } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import {
  mdiStar,
  mdiMessageReply,
  mdiOpenInNew,
  mdiClock,
  mdiRefresh
} from '@mdi/js'
import { useIntersectionObserver } from '@vueuse/core'
import type { IHole } from '../..'
import { formatTs } from './utils'
import HoleComments from './HoleComments.vue'
import { onUnmounted, ref } from 'vue'

const props = defineProps<{
  hole: IHole
  embed?: boolean
}>()

const target = ref(null)
const comments = ref<InstanceType<typeof HoleComments> | null>(null)
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
