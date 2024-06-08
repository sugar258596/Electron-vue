<template>
  <div>
    我的
    <Button @click="goHome">首页</Button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Button } from 'ant-design-vue';
const router = useRouter()

const goHome = () => {
  router.push('/')
}

</script>
<style lang="scss" scoped></style>