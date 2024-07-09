<template>
  <div class=" fixed right-13 bottom-30 z-999  text-6 bg-light-400 hover:bg-stone-200  bor-rd-10" @click="handleBackTop"
    v-show="isShow">
    <BaseIcon icon="icon-back-top"></BaseIcon>
  </div>
</template>

<script setup lang="ts">

import { BaseIcon } from "@/components/Svg";

defineProps({
  isShow: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits<{
  backTop: []
}>()

const handleBackTop = () => {
  emits('backTop')
}
</script>

<style lang="scss" scoped></style>
