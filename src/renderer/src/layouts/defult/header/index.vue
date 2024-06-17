<template>
  <layout-header class="bg-white! p-inline-10!">
    <div class="h-full flex justify-between">
      <div class="flex gap-5">
        <div class="h-full ">
          <img class="image-contain" :src="blbl" alt="" srcset="">
        </div>
        <div class="flex gap-3">
          <template v-for="v in headerList " :key="v.id">
            <div class="cursor cursor-pointer " @click="headActive(v.id)">
              <span
                class="py-2 mx-2 color-black font-black relative before:absolute before:content-empty before:bottom-0 before:left-0 before:h-2px before:bg-pink-500 before:w-0"
                :class="[v.id == active ? 'avation' : '']">
                {{ v.title }}
              </span>
            </div>
          </template>
        </div>
      </div>
      <div class="h-full">
        <Input v-model:value="search" placeholder="搜索感兴趣的视频 " allowClear @pressEnter="pressEnter"></Input>
      </div>
    </div>
  </layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutHeader, Input } from 'ant-design-vue'
import { blbl } from '@/assets/svg'

import { headerList } from './data'

const active = ref(1)

const search = ref('')

const headActive = (id: number) => {
  active.value = id
}

// 回车事件
const pressEnter = () => {
  console.log('回车搜索', search.value);

}


</script>
<style lang="scss" scoped>
.avation {
  &::before {
    transition: all 0.2s ease-in-out;
  }

  --at-apply: color-pink-500 before:w-full;
}
</style>