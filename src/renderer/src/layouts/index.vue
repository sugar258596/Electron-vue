<template>
  <Layout class="w-full h-full">
    <LayoutSider />
    <Layout class="h-100vh">
      <LayoutHeader />
      <LayoutContent />
    </Layout>
  </Layout>
</template>
<script lang="ts" setup>
import { Layout } from 'ant-design-vue'
import LayoutSider from '@/layouts/defult/sider/index.vue'
import LayoutHeader from '@/layouts/defult/header/index.vue'
import LayoutContent from '@/layouts/defult/content/index.vue'
</script>
<style lang="scss" scoped></style>