<template>
  <div class="h-20 bg-blue">头部</div>
  <RouterView>
    <template #default="{ Component, route }">
      <transition mode="out-in" appear>
        <keep-alive>
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </template>
  </RouterView>
</template>

<script setup lang="ts">

</script>
<style lang="scss" scoped></style>