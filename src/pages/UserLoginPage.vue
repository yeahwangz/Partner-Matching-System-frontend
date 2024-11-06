<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import myAxios from "../config/AxiosConfig.ts";
import {Toast} from "vant";
import {setCurrentUserInfo} from "../classes/UserInfoClass.ts";

const userAccount = ref('');
const userPassword = ref('');
const router = useRouter()
const onSubmit = async () => {
  try {
    const res = await myAxios.post('/user/login',{
      userAccount: userAccount.value,
      userPassword: userPassword.value
    })
    if( res.data.data && res.data.code === 0){
      setCurrentUserInfo(res.data.data)
      await router.replace('/')
    }else{
      Toast('登录失败')
    }
  }catch (error){
    Toast('登录失败')
    console.log('登录失败：',error)
  }
};
const onRegister = () => {
  router.replace('/register')
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

  <van-button type="primary" @click="onRegister">注册</van-button>
</template>

<style scoped>

</style>