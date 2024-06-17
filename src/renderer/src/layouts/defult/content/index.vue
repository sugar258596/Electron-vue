<template>
  <layout-content class="mx-2 my-3 p-3 bg-white bor-rd-3 overflow-overlay">
    <RouterView></RouterView>
    <ResetLayouts v-if="reset"></ResetLayouts>
    <LayoutFooter></LayoutFooter>
  </layout-content>
</template>

<script setup lang="ts">
import { LayoutContent } from 'ant-design-vue'
import { ResetLayouts } from '@/layouts/defult/compents'
import LayoutFooter from '../footer/index.vue'

defineProps({
  reset: {
    type: Boolean,
    default: true
  }
})
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
</style>
