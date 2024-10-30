<script setup lang="ts">
import {useRouter} from "vue-router";

const user = {
  id: 1,
  userName: 'wangz',
  userAccount: '01geek',
  avatarUrl: 'src/assets/vue.svg',
  gender: '男',
  phone: '123112312',
  email: '12345@qq.com',
  createTime: new Date(),
}
const router = useRouter()
const toEdit = (editKey: string | string[], editName: string | string[] ,currentValue: string | string[]) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<template>
  <van-cell title="用户名" is-link :value="user.userName" @click="toEdit('userName', '用户名' , user.userName)" />
  <van-cell title="账号" is-link :value="user.userAccount" @click="toEdit('userAccount', '账号' , user.userAccount)"/>
  <van-cell title="头像" is-link>
    <template #value>
      <img :src="user.avatarUrl" alt="头像" style="width: 40px; height: 40px; border-radius: 50%;" />
    </template>
  </van-cell>
  <van-cell title="性别" is-link />
  <van-cell title="电话" is-link />
  <van-cell title="邮箱" is-link />
  <van-cell title="角色" is-link />
  <van-cell title="标签" is-link />
  <van-cell title="账号创建时间" is-link />

</template>

<style scoped>

</style>