<template>
  <Modal v-model:open="openModel" :title="title" @ok="headleOK" @cancel="headleClose">
    <slot></slot>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watchEffect, unref, watch } from 'vue'
import { Modal } from 'ant-design-vue'

import { baseProps } from './porps'

defineOptions({ name: "BaseMoal" })

const props = defineProps(baseProps)

const emits = defineEmits([
  'update:open',
  "headleOk",
  "headleClose"
])


const openModel = ref(false)


const headleOK = () => {
  console.log('ok');
  emits('headleOk')
}

const headleClose = () => {
  emits('headleClose')
}

watch(() => unref(openModel), (v) => {
  emits('update:open', v)
})

watchEffect(() => {
  openModel.value = props.open
})


</script>
<style lang="scss" scoped></style>