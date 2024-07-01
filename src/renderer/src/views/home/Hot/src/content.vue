<template>
  <div class="mt-3 grid-2-5">
    <div class="content max-h-45 w-full" v-for="v in 2" :key="v">
      <div class="flex gap-2 full cursor-pointer">
        <div class="bg-rose-2 flex-grow-4"></div>
        <div class="flex-grow-5 py-1">
          <div class="flex flex-col justify-between h-full">
            <div class="hover:color-blue-300 font-700 text-3.5">
              深度|| 南北归一！三百年史诗的最动情吟唱！
            </div>
            <div class="t-3">
              <span class="p-.8 bg-orange-200 bg-op-70 c-red-600 bor-rd-1">5万点赞</span>
              <div class="flex items-center gap-1 my-2">
                <div class="h-5 w-5 opacity-50"><BaseSvg :src="up" /></div>
                <span class="hover:color-blue-300">蜡笔小新</span>
              </div>
              <div class="flex gap-2 items-center">
                <div class="flex items-center gap-1">
                  <div class="h-5 w-5 opacity-70 bg-zinc"><BaseSvg :src="bofan" /></div>
                  <span>48.8万</span>
                </div>
                <div class="flex items-center gap-1">
                  <div class="h-5 w-5 opacity-70 bg-zinc"><BaseSvg :src="xiaoxi" /></div>
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
import { BaseSvg } from '@/components/Svg'
import { up, bofan, xiaoxi } from '@/assets/svg'
</script>
<style lang="scss" scoped>
.content {
  aspect-ratio: 2/1;
}
</style>
