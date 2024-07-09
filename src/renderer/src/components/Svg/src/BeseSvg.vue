<template>
  <div class="flex-center p-1 cursor-pointer  ">
    <div class="text-align-center m-a p-x-0.5">
      <span class="anticon">
        <svg class="icon" aria-hidden="true" v-bind="$attrs">
          <use :href="`#${icon}`" :fill="color"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/iconfont/iconfont.js'

defineProps({
  icon: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: 'rgba(0, 0, 0, 0.58)'
  }
})

</script>
<style scoped lang="scss">
.anticon {
  display: inline-flex;
  align-items: center;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
</style>
<style scoped type="text/css">
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>