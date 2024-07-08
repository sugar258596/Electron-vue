<template>
  <div ref="resetButton"
    class="reset fixed right-13 bottom-15 z-999 p-2 bor-rd-10 cursor-pointer bg-light-400 hover:bg-stone-200"
    @click="handleResetClick">
    <BaseSvg :src="reset" :alt="'重置'"></BaseSvg>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { BaseSvg } from "@/components/Svg"
import { reset } from '@/assets/svg'
import { useLayoutStore } from '@/store/modules/layout'

const userLaout = useLayoutStore()

const resetButton = ref<HTMLDivElement>()
const resetTime = ref<NodeJS.Timeout>()
const isResetting = ref(false)
const animationDuration = ref(500)

// 重置按钮点击事件
const handleResetClick = () => {
  if (!resetButton.value) return
  if (isResetting.value) return
  isResetting.value = true
  resetButton.value.classList.add('rotate-once')
  resetButton.value.style.animationDuration = `${animationDuration.value}ms`
  nextTick(() => {
    resetTime.value = setTimeout(() => {
      resetButton.value?.classList.remove('rotate-once')
      isResetting.value = false
    }, animationDuration.value)
  })
  userLaout.apiVideoList(true)
}
</script>

<style lang="scss" scoped>
.reset {
  box-shadow: 0 0 10px #ccc;
  transition: all 0.3s;
  // 禁止被选中
  user-select: none;
  // 禁止鼠标右键
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
}

.rotate-once {
  animation: rotate-once 0.5s linear;
}

@keyframes rotate-once {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
