<template>
  <layout-header class="bg-white! p-inline-10!">
    <div class="h-full flex justify-between">
      <div class="flex gap-5">
        <div class="h-full">
          <BaseSvg :src="blbl" :alt="'图标'"></BaseSvg>
        </div>
        <div class="flex gap-3">
          <template v-for="v in headerList" :key="v.id">
            <div class="cursor cursor-pointer" @click="headActive(v.id)">
              <span
                class="py-2 mx-2 color-black font-black relative before:absolute before:content-empty before:bottom-0 before:left-0 before:h-2px before:bg-pink-500 before:w-0"
                :class="[v.id == active ? 'avation ' : '']">
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
import { ref, watch } from 'vue'
import { LayoutHeader, Input } from 'ant-design-vue'
import { BaseSvg } from '@/components/Svg'
import { blbl } from '@/assets/svg'

import { useLayoutStore } from '@/store/modules/layout'

import { headerList } from './data'

import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const userLayout = useLayoutStore()
const active = ref(1)

const search = ref('')

watch(
  () => route,
  (n) => {
    headerList.forEach((list) => {
      if (list.title == n.meta.title) {
        active.value = list.id
      }
    })
  },
  {
    immediate: true
  }
)

const headActive = (id: number) => {
  active.value = id
  if (id == 4) {
    router.push({
      path: '/hot'
    })
  } else if (id == 1) {
    router.push({
      path: '/',
    })
  } else if (id == 2) {
    router.push({
      path: '/anime'
    })
  }
}

// 回车事件
const pressEnter = () => {
  userLayout.searchVideoList(search.value)
}
</script>
<style lang="scss" scoped>
.avation {
  --at-apply: color-pink-500;

  &::before {
    transition: all 0.2s ease-in-out;
    --at-apply: color-pink-500 w-full;
  }
}
</style>
