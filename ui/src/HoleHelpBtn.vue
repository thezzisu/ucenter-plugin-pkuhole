<template>
  <AutoBtn i18n-key="help" :icon="mdiHelp" @click="show = true" />
  <NModal v-model:show="show">
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
import { ref } from 'vue'
import { NCard, NModal } from 'naive-ui'
import { mdiHelp } from '@mdi/js'
import HoleHelp from './HoleHelp.vue'
import AutoBtn from './AutoBtn.vue'

const show = ref(false)
</script>
