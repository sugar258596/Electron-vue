<template>
  <layout-content class="mx-2 my-3 p-3 bg-white bor-rd-3 overflow-overlay backTop" @scroll="handleScroll" ref="content">
    <RouterView></RouterView>
    <ResetLayouts v-if="reset"></ResetLayouts>
    <BackTop @back-top="handleBackTop" :is-show="isShow"></BackTop>
    <LayoutFooter></LayoutFooter>
  </layout-content>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutContent } from 'ant-design-vue'
import { ResetLayouts, BackTop } from '@/layouts/defult/compents'
import LayoutFooter from '../footer/index.vue'
import { easeInOutQuad } from '@/utils/is';

defineProps({
  reset: {
    type: Boolean,
    default: true
  }
})
const content = ref()
const isShow = ref(false)

const handleScroll = () => {
  const el = content.value.$el;
  const scrollTop = el.scrollTop;
  isShow.value = scrollTop > 50 ? true : false;
}


const handleBackTop = () => {
  const el = content.value.$el;
  const start = el.scrollTop;
  const change = 0 - start; // 目标位置是0，起始位置是start
  const duration = 500; // 动画持续时间，毫秒
  let startTime = 0;

  const animateScroll = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const increment = easeInOutQuad(progress, start, change, duration);
    el.scrollTop = increment;
    if (progress < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      el.scrollTop = 0; // 确保滚动结束时的位置是0
    }
  };

  window.requestAnimationFrame(animateScroll);
}



</script>
<style lang="scss" scoped>
/* 宽 */
::-webkit-scrollbar {
  width: 4px;
}

/* 轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 滑块 */
::-webkit-scrollbar-thumb {
  cursor: pointer;
  border-radius: 50rem;
  padding-inline: 2px;
  background: rgba(0, 0, 0, 0.3);
}

/* 指向鼠标时的滑块 */
::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

.backTop {
  transition: all 0.3s ease;
}
</style>
