<template>
  <div class="flex gap-5">
    <div
      class="flex-center relative h-15 px-2 py-3 font-600"
      v-for="v in hotHeader"
      @click="headleClick(v)"
      :key="v.id"
    >
      <div
        class="flex-center gap-2 before:absolute before:content-empty before:bottom-0 before:left-0 before:h-2px before:bg-blue-400 before:w-0 h-full"
        :class="v.id == active ? 'active  ' : ''"
      >
        <div class="flex-center bor-rd-20 icon h-full cursor-pointer" :class="v.color"></div>
        <div
          class="whitespace-nowrap overflow-hidden cursor-pointer hover:color-blue-400 text"
          :title="v.name"
        >
          {{ v.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const active = ref(1)
const hotHeader = reactive([
  {
    id: 1,
    name: '综合热门',
    color: 'bg-rose-500'
  },
  {
    id: 2,
    name: '综合热门',
    color: 'bg-amber-400'
  },
  {
    id: 3,
    name: '综合热门',
    color: 'bg-pink-400'
  },
  {
    id: 4,
    color: 'bg-amber-500',
    name: '综合热门'
  },
  {
    id: 5,
    name: '综合热门 ',
    color: 'bg-sky-400'
  },
  {
    id: 6,
    name: '综合热门',
    color: 'bg-red-400'
  }
])

const headleClick = (v) => {
  active.value = v.id
}
</script>
<style lang="scss" scoped>
.icon {
  aspect-ratio: 1/1;
  white-space: nowrap;
}
.text {
  text-overflow: ellipsis;
  max-width: calc(7 * 1.8ch);
}
.active {
  --at-apply: color-blue-400;
  &::before {
    transition: all 0.2s ease-in-out;
    --at-apply: w-full;
  }
}
</style>
