<template>
  <img
    class="image-contain cursor-pointer"
    v-bind="$attrs"
    loading="lazy"
    :src="src"
    :alt="alt"
    srcset=""
  />
</template>

<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
}>()
</script>
<style lang="scss" scoped></style>
