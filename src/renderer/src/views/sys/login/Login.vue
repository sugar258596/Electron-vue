<template>
  <div>
    <Button type="primary" @click="showModal">Open Modal with async logic</Button>
    <BaseModal v-model:open="open" :title="'标题'" @headle-ok="headleOK">
      <template #default>
        <Form :model="formState" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <form-item v-for="v in formLogin" :key="v.field" :label="v.lable" :name="v.field" :rules="v.rules">
            <Input v-model:value="formState[v.field]" />
          </form-item>
        </Form>
      </template>
    </BaseModal>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { Button, Form, FormItem, Input } from 'ant-design-vue'
import { BaseModal } from '@/components/Modal/index'

import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const open = ref<boolean>(true);
const showModal = () => {
  open.value = true;
};

interface FormState {
  username: string;
  password: string;
}

const formState = reactive<FormState>({
  username: '123',
  password: '123456'
});

const formLogin = reactive([
  {
    field: 'username',
    lable: '用户名',
    rules: [
      {
        required: true,
        validator: (_, value) => {
          console.log(value);
          if (value.length < 6) {
            return Promise.reject('123')
          }
          if (value.length > 10) {
            return Promise.reject("Two inputs don't match!");
          }
          return Promise.resolve()
        }
      }
    ]
  }, {
    field: 'password',
    lable: '密码',
  }
])


const headleOK = () => {
  userStore.login(formState)
  console.log(userStore.getToken);

}


</script>


<style lang="scss" scoped></style>