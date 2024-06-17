<template>
  <div class="flex flex-1 flex-col justify-between p-2 color-black-400">
    <div class="text-3.5 line-clamp-2">
      {{ video.title }}
    </div>
    <div class="flex gap-1 text-3 items-center color-zinc-400 user-none">
      <div class="h-4 w-4">
        <BaseSvg :src="up" :alt="'up主'"></BaseSvg>
      </div>
      <div class="flex gap-2 justify-center">
        <span> {{ video.up }}</span>
        <span>{{ video.creTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseSvg } from '@/components/Svg'
import { up } from '@/assets/svg'
import { VideoProps } from './props'
defineProps<VideoProps>()
</script>
<style lang="scss" scoped></style>
