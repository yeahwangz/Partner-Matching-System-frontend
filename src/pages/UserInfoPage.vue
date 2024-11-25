<script setup lang="ts">
import {useRoute} from "vue-router";

const route = useRoute()
const userToRecommendInfo = JSON.parse(<string>route.query.RouterUserToRecommend)
</script>

<template>
  <div v-if="userToRecommendInfo">
    <van-cell-group inset>
      <van-cell title="用户名" :value="userToRecommendInfo.userName" />
      <van-cell title="账号" :value="userToRecommendInfo.userAccount" />
      <van-cell title="性别" v-if="userToRecommendInfo.gender === 1" value="男" />
      <van-cell title="性别" v-if="userToRecommendInfo.gender === 0" value="女" />
      <van-cell title="电话" :value="userToRecommendInfo.phone" />
      <van-cell title="邮箱" :value="userToRecommendInfo.email" />
      <van-cell title="标签" :value="userToRecommendInfo.tags" />
      <van-cell title="个人简介" :value="userToRecommendInfo.profile" />
    </van-cell-group>
  </div>
</template>

<style scoped>

</style>