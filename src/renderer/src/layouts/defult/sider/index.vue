<template>
  <layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <div class="h-16 w-full py-2">
      <img class="image-contain" src="@/assets/electron.svg" alt="" srcset="" />
    </div>
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

      <menu-item key="4">
        <span @click="collapsed = !collapsed">按钮</span>
      </menu-item>
    </Menu>
  </layout-sider>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { LayoutSider, Menu, MenuItem } from 'ant-design-vue'
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons-vue'
const selectedKeys = ref<string[]>(['1'])
const collapsed = ref<boolean>(false)

onMounted(() => {
  window.onresize = () => {
    const screenWidth = window.innerWidth
    screenWidth < 768 ? (collapsed.value = true) : (collapsed.value = false)
  }
})
</script>
<style lang="scss" scoped></style>
