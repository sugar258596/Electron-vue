<template>
  <layout-sider class="h-100vh" v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="h-8 m-8 bg-bluegray" />
    <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <menu-item key="1">
        <user-outlined />
        <span>nav 1</span>
      </menu-item>
      <menu-item key="2">
        <video-cameraOutlined />
        <span>nav 2</span>
      </menu-item>
      <menu-item key="3">
        <span>nav 3</span>
      </menu-item>
    </Menu>
  </layout-sider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LayoutSider, Menu, MenuItem } from 'ant-design-vue'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue';
const selectedKeys = ref<string[]>(['1']);
const collapsed = ref<boolean>(false);
</script>
<style lang="scss" scoped></style>