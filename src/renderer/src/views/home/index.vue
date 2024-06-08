<template>
  <div>
    首页
    <Button @click="goLogin">登录</Button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from 'ant-design-vue';
const router = useRouter()

const goLogin = () => {
  router.push('/my')
}
</script>
<style lang="scss" scoped></style>