<template>
  <div>
    <Button type="primary" @click="showModal">Open Modal with async logic</Button>
    <BaseModal v-model:open="open" :title="'标题'">
      <template #default>
        <div class="p-5 bg-blue">内容</div>
      </template>
    </BaseModal>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { Button } from 'ant-design-vue'

import { BaseModal } from '@/components/Modal/index'

const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
</script>


<style lang="scss" scoped></style>