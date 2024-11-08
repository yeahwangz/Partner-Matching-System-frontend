<script setup lang="ts">
import {useRouter} from "vue-router";
import {currentUserInfo} from "../classes/UserInfoClass.ts";

const router = useRouter()
const toEdit = (editKey: string | string[], editName: string | string[] ,currentValue: string | string[] | undefined) => {
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
  <van-cell title="用户名" is-link :value="currentUserInfo.userName" @click="toEdit('userName', '用户名' , currentUserInfo.userName)" />
  <van-cell title="账号" :value="currentUserInfo.userAccount"/>
  <van-cell title="头像" is-link :value="currentUserInfo.avatarUrl" @click="toEdit('avatarUrl', '头像' , currentUserInfo.avatarUrl)" >
    <template #value>
      <img :src="currentUserInfo.avatarUrl" alt="头像" style="width: 40px; height: 40px; border-radius: 50%;" />
    </template>
  </van-cell>
  <van-cell title="性别" is-link v-if="currentUserInfo.gender == 1" value="男" @click="toEdit('gender', '性别' ,  '1')"/>
  <van-cell title="性别" is-link v-else-if="currentUserInfo.gender == 0" value="女" @click="toEdit('gender', '性别' ,  '0')"/>
  <van-cell title="性别" is-link v-else value="" @click="toEdit('gender', '性别' ,  '')"/>
  <van-cell title="电话" is-link :value="currentUserInfo.phone" @click="toEdit('phone', '电话号码' , currentUserInfo.phone)"/>
  <van-cell title="邮箱" is-link :value="currentUserInfo.email" @click="toEdit('email', '邮箱' , currentUserInfo.email)"/>
  <van-cell v-if="currentUserInfo.userRole === 0"  title="角色" value="普通用户"/>
  <van-cell v-if="currentUserInfo.userRole === 1"  title="角色" value="管理员"/>
  <van-cell title="标签" is-link :value="currentUserInfo.tags" @click="toEdit('tags', '标签' , currentUserInfo.tags)"/>
  <van-cell title="账号创建时间" :value="currentUserInfo.createTime.toString()" />
  <van-cell title="个人简介" is-link :value="currentUserInfo.profile" @click="toEdit('profile', '个人简介' , currentUserInfo.profile)"/>

</template>

<style scoped>

</style>