<template>
  <div class="w-full h-50 bg-blue relative">
    <div class="absolute bottom-1 left-0 px-2 flex justify-between w-full text-3 color-white">
      <div class="flex-center gap-2">
        <div class="flex-center gap-1 h-4">
          <BaseSvg :src="bofan" :alt="'播放量'"></BaseSvg>
          <span>{{ video.playCount }}</span>
        </div>
        <div class="flex-center gap-1 h-4">
          <BaseSvg :src="xiaoxi" :alt="'评论数'"></BaseSvg>
          <span> {{ video.commentCount }} </span>
        </div>
      </div>
      <div>
        <span>{{ video.duration }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseSvg } from '@/components/Svg'
import { bofan, xiaoxi } from '@/assets/svg'
import { VideoProps } from './props'

defineProps<VideoProps>()
</script>
<style lang="scss" scoped></style>
