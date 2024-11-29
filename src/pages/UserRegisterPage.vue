<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../config/AxiosConfig.ts";
import {useRouter} from "vue-router";
import {setLoginStatus} from "../globals/LoginStatus.ts";

const router = useRouter()
const username = ref('');
const password = ref('');
const onSubmit = () => {
  myAxios.post('/user/register', {
    userAccount: username.value,
    userPassword: password.value,
    checkPassword: password.value
  })
  router.replace('/login')
};

const onClickLeft = () => {
  setLoginStatus(0)
  router.push('/login')
}
</script>

<template>
  <van-nav-bar
      title="注册"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
  />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="注册用户名"
          label="注册用户名"
          placeholder="注册用户名"
          :rules="[{ required: true, message: '请填写注册用户名' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="注册密码"
          label="注册密码"
          placeholder="注册密码"
          :rules="[{ required: true, message: '请填写注册密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>