<template>
  <LayoutFooter>
    <div ref="footer">
      <div class="flex flex-center gap-2" v-show="show">
        <div class="w-2.5 h-2.5 bg-black bor-rd-10 dot" v-for="v in 4" :key="v"></div>
      </div>
    </div>
  </LayoutFooter>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { LayoutFooter } from 'ant-design-vue'
import { useLayoutStore } from '@/store/modules/layout'

const userLayout = useLayoutStore()

const footer = ref<HTMLDivElement>()
const show = ref(false)

watch(
  () => userLayout.getShow,
  (n) => {
    show.value = n
  }
)

onMounted(() => {
  if (!footer.value) return
  observer.observe(footer.value)
})

const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
  entries.forEach((entrie: IntersectionObserverEntry) => {
    if (entrie.isIntersecting && !userLayout.getFirst) {
      userLayout.apiVideoList()
    } else {
    }
  })
})
</script>
<style lang="scss" scoped>
.dot {
  animation: wavy 0.8s ease-in infinite alternate;
  &:nth-child(2) {
    animation-delay: 0.15s;
  }
  &:nth-child(3) {
    animation-delay: 0.25s;
  }
  &:nth-child(4) {
    animation-delay: 0.35s;
  }
}
@keyframes wavy {
  to {
    transform: translateY(0) scale(0);
  }

  from {
    transform: translateY(150%) scale(1);
  }
}
</style>
