<template>
  <NCard
    :bordered="false"
    class="sticky top-0 z-1 bg-transparent backdrop-blur backdrop-filter border-b shadow"
  >
    <template #header>
      <RouterLink to="/hole">
        {{ $t('hole-welcome') }}
      </RouterLink>
    </template>
    <template #header-extra>
      <NSpace class="!flex-row-reverse">
        <HoleHelpBtn />
        <HoleSettingsBtn />
        <HoleSearchBtn />
        <HolePostBtn v-if="holeLoggedIn" />
      </NSpace>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NSpace } from 'naive-ui'
import HoleSearchBtn from './HoleSearchBtn.vue'
import HoleSettingsBtn from './HoleSettingsBtn.vue'
import HoleHelpBtn from './HoleHelpBtn.vue'
import HolePostBtn from './HolePostBtn.vue'
import { holeLoggedIn } from './api'
</script>
