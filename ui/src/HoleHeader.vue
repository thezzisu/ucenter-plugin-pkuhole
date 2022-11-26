<template>
  <NCard :bordered="false">
    <template #header> Welcome to PKUHole! </template>
    <template #header-extra>
      <NSpace>
        <NButton @click="searchModal = true">
          <template #icon>
            <component :is="renderIcon(mdiMagnify)" />
          </template>
          {{ $t('search') }}
        </NButton>
        <NButton @click="settingsModal = true">
          <template #icon>
            <component :is="renderIcon(mdiCog)" />
          </template>
          {{ $t('settings') }}
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
import { mdiMagnify, mdiCog } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { anonymousMode, holeToken } from './api'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const dialog = useDialog()
const { t } = useI18n()

const searchModal = ref(false)
const searchValue = ref('')
function doSearch(e: KeyboardEvent | MouseEvent) {
  if (e instanceof KeyboardEvent && e.key !== 'Enter') return
  if (Number.isSafeInteger(+searchValue.value)) {
    dialog.info({
      title: t('tips'),
      content: t('search-pid-tips'),
      positiveText: t('goto-hole'),
      negativeText: t('do-search'),
      onPositiveClick: () => {
        router.push({ path: `/hole/${searchValue.value}` })
      },
      onNegativeClick: () => {
        router.push({
          path: '/hole/search',
          query: { keywords: searchValue.value }
        })
      }
    })
  } else {
    router.push({
      path: '/hole/search',
      query: { keywords: searchValue.value }
    })
  }
}

const settingsModal = ref(false)
</script>
