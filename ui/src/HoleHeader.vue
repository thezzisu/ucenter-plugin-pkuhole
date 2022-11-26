<template>
  <NCard :bordered="false" class="sticky top-0 z-1">
    <template #header>
      <RouterLink to="/hole">
        {{ $t('hole-welcome') }}
      </RouterLink>
    </template>
    <template #header-extra>
      <NSpace>
        <NButton @click="searchModal = true">
          <template #icon>
            <component :is="renderIcon(mdiMagnify)" />
          </template>
          <template v-if="greaterOrEqualLg">
            {{ $t('search') }}
          </template>
        </NButton>
        <NButton @click="settingsModal = true">
          <template #icon>
            <component :is="renderIcon(mdiCog)" />
          </template>
          <template v-if="greaterOrEqualLg">
            {{ $t('settings') }}
          </template>
        </NButton>
        <NButton @click="helpModal = true">
          <template #icon>
            <component :is="renderIcon(mdiHelp)" />
          </template>
          <template v-if="greaterOrEqualLg">
            {{ $t('help') }}
          </template>
        </NButton>
      </NSpace>
    </template>
  </NCard>
  <NModal v-model:show="searchModal">
    <NCard
      style="width: 600px"
      :title="$t('search')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <NInputGroup>
        <NInput
          v-model:value="searchValue"
          type="text"
          :placeholder="$t('some-keywords')"
          @keyup="doSearch"
        />
        <n-button type="primary" @click="doSearch">
          <template #icon>
            <component :is="renderIcon(mdiMagnify)" />
          </template>
        </n-button>
      </NInputGroup>
    </NCard>
  </NModal>
  <NModal v-model:show="settingsModal">
    <NCard
      style="width: 600px"
      :title="$t('settings')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <div>
        <NInput
          v-model:value="holeToken"
          type="text"
          :placeholder="$t('hole-token')"
        />
      </div>
      <div class="flex justify-between items-center py-4">
        <div>{{ $t('anonymous-mode') }}</div>
        <n-switch v-model:value="anonymousMode" />
      </div>
    </NCard>
  </NModal>
  <NModal v-model:show="helpModal">
    <NCard
      style="width: 600px"
      :title="$t('help')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <HoleHelp />
    </NCard>
  </NModal>
</template>

<script setup lang="ts">
import {
  NCard,
  NInput,
  NSpace,
  NButton,
  NModal,
  NInputGroup,
  NSwitch,
  useDialog
} from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiMagnify, mdiCog, mdiHelp } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { anonymousMode, holeToken } from './api'
import HoleHelp from './HoleHelp.vue'

const breakpoints = useBreakpoints(breakpointsTailwind)
const greaterOrEqualLg = breakpoints.greaterOrEqual('lg')

const router = useRouter()
const dialog = useDialog()
const { t } = useI18n()

const searchModal = ref(false)
const searchValue = ref('')
function doSearch(e: KeyboardEvent | MouseEvent) {
  if (e instanceof KeyboardEvent && e.key !== 'Enter') return
  const search = searchValue.value.trim()
  const maybePid = search.startsWith('#') ? search.slice(1) : search
  if (Number.isSafeInteger(+maybePid)) {
    dialog.info({
      title: t('tips'),
      content: t('search-pid-tips'),
      positiveText: t('goto-hole'),
      negativeText: t('do-search'),
      onPositiveClick: () => {
        router.push({ path: `/hole/${maybePid}` })
        searchModal.value = false
      },
      onNegativeClick: () => {
        router.push({
          path: '/hole/search',
          query: { keywords: search }
        })
        searchModal.value = false
      }
    })
  } else {
    router.push({
      path: '/hole/search',
      query: { keywords: search }
    })
    searchModal.value = false
  }
}

const settingsModal = ref(false)

const helpModal = ref(false)
</script>
