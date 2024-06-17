<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2">
    <div v-for="v in videoList.arr" :key="v" class="h-70 bor-rd-2 shadow">
      <div class="flex flex-col full bor-rd-2">
        <BasicVideo :video="v"></BasicVideo>
        <BasicTitle :video="v"></BasicTitle>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { useLayoutStore } from '@/store/modules/layout'
import { BasicVideo, BasicTitle } from './src'

const videoList = reactive<{
  arr: any[]
}>({
  arr: []
})

const userLaout = useLayoutStore()

onMounted(() => {
  userLaout.apiVideoList()
})
watch(
  () => userLaout.getVideo,
  (n) => {
    videoList.arr = n
  },
  {
    deep: true
  }
)
</script>
<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>
