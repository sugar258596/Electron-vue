<template>
  <layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (collapsed = !collapsed)" />
    <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
  </layout-header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutHeader } from 'ant-design-vue'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';

const collapsed = ref<boolean>(false);
</script>
<style lang="scss" scoped></style>