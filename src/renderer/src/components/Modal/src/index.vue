<template>
  <Modal v-model:open="openModel" :title="title" @ok="headleOK" @cancel="headleClose" cancelText="取消" okText="确定"
    v-bind="$attrs" centered>

    <slot></slot>
    <template #[item]="data" v-for="item in Object.keys(omit($slots, 'default'))">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, watchEffect, unref, watch } from 'vue'
import { Modal } from 'ant-design-vue'
import { omit } from 'lodash'


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