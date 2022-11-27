<template>
  <NButton
    v-bind="props.btnProps"
    @click="emit('click')"
    :circle="!greaterOrEqualLg"
  >
    <template #icon>
      <component :is="renderIcon(props.icon)" />
    </template>
    <template v-if="greaterOrEqualLg">
      {{ $t(props.i18nKey) }}
    </template>
  </NButton>
</template>

<script setup lang="ts">
import { NButton, ButtonProps } from 'naive-ui'
import { renderIcon } from '@ucenter/ui/src/utils'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const breakpoints = useBreakpoints(breakpointsTailwind)
const greaterOrEqualLg = breakpoints.greaterOrEqual('lg')

const props = defineProps<{
  i18nKey: string
  icon: string
  btnProps?: ButtonProps & { [key: string]: any }
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>
