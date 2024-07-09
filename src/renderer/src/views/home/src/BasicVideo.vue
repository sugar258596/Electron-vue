<template>
  <div class="w-full h-50 bg-blue relative">
    <div class="absolute bottom-1 left-0 px-2 flex justify-between w-full text-3 color-white user-none">
      <div class="flex-center gap-2">
        <div class="flex-center">
          <BaseIcon icon="icon-bofang" title="播放量" class="text-4" color="#fff"></BaseIcon>
          <span>{{ video.playCount }}</span>
        </div>
        <div class="flex-center">
          <BaseIcon icon="icon-xiaoxi" title="评论数" class="text-4" color="#fff"></BaseIcon>
          <span> {{ video.commentCount }} </span>
        </div>
      </div>
      <div class="flex-center">
        <span>{{ video.duration }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseIcon } from '@/components/Svg'
import { VideoProps } from './props'

defineProps<VideoProps>()
</script>
<style lang="scss" scoped></style>
