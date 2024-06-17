<template>
  <div ref="resetButton"
    class="reset fixed right-13 bottom-15 z-999 p-2 bor-rd-10 cursor-pointer bg-light-400 hover:bg-stone-200"
    @click="handleResetClick">
    <img class="image-contain" :src="reset" alt="" srcset="">
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { reset } from '@/assets/svg';

const emits = defineEmits<{
  handleResetClick
}>();


const resetButton = ref<HTMLDivElement>();
const resetTime = ref<NodeJS.Timeout>();
const isResetting = ref(false);
const animationDuration = ref(500);


// 重置按钮点击事件
const handleResetClick = () => {
  if (!resetButton.value) return;
  if (isResetting.value) return;
  isResetting.value = true;
  resetButton.value.classList.add('rotate-once');
  resetButton.value.style.animationDuration = `${animationDuration.value}ms`;
  nextTick(() => {
    resetTime.value = setTimeout(() => {
      resetButton.value?.classList.remove('rotate-once');
      isResetting.value = false;
    }, animationDuration.value);
  });
  emits('handleResetClick')
};
</script>

<style lang="scss" scoped>
.reset {
  box-shadow: 0 0 10px #ccc;
  transition: all 0.3s;
}

.rotate-once {
  animation: rotate-once .5s linear;
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
