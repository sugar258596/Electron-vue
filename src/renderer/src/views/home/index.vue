<template>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 2xl:grid-cols-6  gap-2">
    <div v-for="v in 100 " :key="v" class="h-70  bor-rd-2 shadow">
      <div class="full h-50  bor-rd-2">
        <div class="full bg-blue relative">
          <div class="absolute bottom-1 left-0 px-2 flex justify-between w-full text-3 color-white">
            <div class="flex gap-2">
              <div>
                <span>5W</span>
              </div>
              <div>
                <span> 100W </span>
              </div>
            </div>
            <div>
              <span>11:02</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'

onMounted(() => {
  getData()
})

const getData = () => {
  axios.get('/api/video').then(res => {
    console.log(res)
  })
}


</script>
<style lang="scss" scoped>
.shadow {
  box-shadow: 0 0 5px rgba(0, 0, 0, .1);
}
</style>