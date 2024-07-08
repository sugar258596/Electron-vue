<template>
  <div class="w-12 h-12 fixed right-13 bottom-30 z-999 p-2 bor-rd-10 cursor-pointer bg-light-400 hover:bg-stone-200"
    @click="handleBackTop" v-show="isShow">
    <BaseSvg :src="top" alt="返回顶部"></BaseSvg>
  </div>
</template>

<script setup lang="ts">

import { BaseSvg } from "@/components/Svg";
import { top } from '@/assets/svg'

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
