<template>
  <AutoBtn i18n-key="search" :icon="mdiMagnify" @click="show = true" />
  <NModal v-model:show="show">
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
</template>

<script setup lang="ts">
import {
  NCard,
  NInput,
  NButton,
  NModal,
  NInputGroup,
  useDialog
} from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { mdiMagnify } from '@mdi/js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import AutoBtn from './AutoBtn.vue'

const router = useRouter()
const dialog = useDialog()
const { t } = useI18n()
const show = ref(false)
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
        const href = router.resolve({ path: `/hole/${maybePid}` }).href
        window.open(href, '_blank')
        show.value = false
      },
      onNegativeClick: () => {
        const href = router.resolve({
          path: '/hole/search',
          query: { keywords: search }
        }).href
        window.open(href, '_blank')
        show.value = false
      }
    })
  } else {
    const href = router.resolve({
      path: '/hole/search',
      query: { keywords: search }
    }).href
    window.open(href, '_blank')
    show.value = false
  }
}
</script>
