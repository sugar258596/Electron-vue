<template>
  <div class="xl:h-25vw lg:h-30vw md:h-40vw h-140   ">
    <div class="flex flex-col gap-8 items-stretch full">
      <div class=" w-full h-full">
        <div class="full flex gap-3">
          <div class="bor-rd-3 aspect-ratio-1.8 scale" v-for="v in 3 " :key="v">
            <div class=" relative w-full h-full cursor-pointer bg-gray-300 bg-opacity-90 "
              :class="v == 1 ? 'target' : ''">
              <div class="absolute top-0 left-0 w-full h-full p-1.6 ">
                <div class="bor-rd-3 full">
                  <img src="@/assets/音柱.avif" class="image-cover" alt="">
                </div>
                <div class="absolute bottom-3 left-5">
                  <span class=" color-white user-none">鬼灭之刃 住训练篇</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full h-full min-h-20 max-h-30">
        <div class="w-full h-full color-gray-600">
          <div class="flex items-center gap-3 h-full">
            <div class="h-full min-h-20 max-h-35  aspect-ratio-2.5 bor-rd-4" v-for="v in itemList" :key="v.id">
              <div class="w-full h-full   p-3" :class="v.color">
                <div class="flex flex-col full gap-2">
                  <div class="text-5 font-600 color-black">
                    <span class=" hover:c-cyan cursor-pointer">{{ v.title }} ></span>
                  </div>
                  <div class="full flex   gap-4  ">
                    <div class="flex justify-center flex-col gap-3" v-for="v2 in v.textArr" :key="v2.id">
                      <div class="text-3 cursor-pointer" v-for="v3 in v2.arr" :key="v3?.id">
                        <span class="hover:color-blue"> {{ v3?.text }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="full">
        <div class="flex justify-between">
          <div class="flex-center ">
            <div class="text-8">
              <BaseIcon icon="icon-xihuan1"></BaseIcon>
            </div>
            <div class="font-700 text-5 cursor-pointer">
              <span class="hover:color-red-300">猜你想追</span>
            </div>
          </div>
          <div class="bor-1-zinc p-1 bor-rd-2 m-5 hover:bg-gray-100 hover:b-red">
            <div class="flex-center">
              <div class="text-4">
                <BaseIcon icon="icon-xihuan"></BaseIcon>
              </div>
              <div class="cursor-pointer">
                <span class="color-zinc">我的追番</span>
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
import { itemList } from './date'


</script>
<style lang="scss" scoped>
.scale {
  &:hover {
    transform: scale(1.05);
  }

  transition: all 0.09s ease-in-out;
}


.target {
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background-image: conic-gradient(transparent, rgb(82, 218, 248), transparent 20%);
    animation: rotate 4s linear infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(1turn);
  }
}
</style>