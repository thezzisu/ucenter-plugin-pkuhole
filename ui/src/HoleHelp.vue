<template>
  <div class="flex justify-center text-black pb-2">
    <NButton
      tag="a"
      href="https://blog.zisu.dev/6ff1654c3b2845beb07946a160b28c50"
      target="_blank"
    >
      <template #icon>
        <component :is="renderIcon(mdiHelp)" />
      </template>
      {{ $t('help') }}
    </NButton>
  </div>
  <div class="flex justify-center text-black">
    <NButton
      type="info"
      tag="a"
      href="https://github.com/thezzisu/ucenter-plugin-pkuhole"
      target="_blank"
    >
      <template #icon>
        <component :is="renderIcon(mdiGithub)" />
      </template>
      {{ $t('source-code') }}
    </NButton>
  </div>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { mdiGithub, mdiHelp } from '@mdi/js'
import { renderIcon } from '@ucenter/ui/src/utils'
</script>
