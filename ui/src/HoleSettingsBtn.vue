<template>
  <AutoBtn i18n-key="settings" :icon="mdiCog" @click="show = true" />
  <NModal v-model:show="show">
    <NCard
      style="width: 600px"
      :title="$t('settings')"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <NSpace vertical>
        <NInput
          v-model:value="holeToken"
          type="text"
          :placeholder="$t('hole-token')"
        />
        <NInput
          v-model:value="holeProxy"
          type="text"
          :placeholder="$t('hole-proxy')"
        />
        <div class="grid grid-cols-2 gap-4">
          <div>{{ $t('anonymous-mode') }}</div>
          <div class="flex justify-end">
            <NSwitch v-model:value="anonymousMode" />
          </div>
          <div>{{ $t('deletion-only') }}</div>
          <div class="flex justify-end">
            <NSwitch v-model:value="deletionOnly" />
          </div>
        </div>
      </NSpace>
    </NCard>
  </NModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCard, NInput, NSpace, NModal, NSwitch } from 'naive-ui'
import { mdiCog } from '@mdi/js'
import { anonymousMode, holeToken, holeProxy } from './api'
import { deletionOnly } from './utils'
import AutoBtn from './AutoBtn.vue'

const show = ref(false)
</script>
