<template>
  <layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
    <RouterView></RouterView>
  </layout-content>
</template>

<script setup lang="ts">
import { LayoutContent } from 'ant-design-vue'

</script>
<style lang="scss" scoped></style>