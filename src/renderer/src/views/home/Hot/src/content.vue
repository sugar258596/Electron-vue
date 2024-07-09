<template>
  <div class="mt-3 grid-1-4 lg:grid-2-5">
    <div class="content max-h-45 w-full" v-for="v in 2" :key="v">
      <div class="flex gap-2 full cursor-pointer">
        <div class="sm:flex-grow-2 md:flex-grow-5 lg:flex-grow-6 min-w-40 bg-rose-2"></div>
        <div class="sm:flex-grow-0 md:flex-grow-3 lg:flex-grow-4 py-1">
          <div class="flex flex-col justify-between h-full w-full">
            <div class="hover:color-blue-300 font-700 text-3.5">
              <span>深度|| 南北归一！三百年史诗的最动情吟唱！ </span>
            </div>
            <div class="t-3">
              <span class="p-.8 bg-orange-200 bg-op-70 c-red-600 bor-rd-1">5万点赞</span>
              <div class="flex items-center my-1">
                <div class="opacity-50">
                  <BaseIcon icon="icon-icon_up" title="播放量" class="text-5" color="#bdbdc3"></BaseIcon>
                </div>
                <div class="flex-center">
                  <span class="hover:color-blue-300">蜡笔小新</span>
                </div>
              </div>
              <div class="flex gap-2 items-center">
                <div class="flex-center  ">
                  <div class="opacity-70 ">
                    <BaseIcon icon="icon-bofang" title="播放量" class="text-4" color="#bdbdc3"></BaseIcon>
                  </div>
                  <span>48.8万</span>
                </div>
                <div class="flex-center ">
                  <div class=" opacity-70  ">
                    <BaseIcon icon="icon-xiaoxi" title="评论数" class="text-4" color="#bdbdc3"></BaseIcon>
                  </div>
                  <span>48.8万</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BaseIcon } from '@/components/Svg'
</script>
<style lang="scss" scoped>
.content {
  aspect-ratio: 2/1;
}
</style>
