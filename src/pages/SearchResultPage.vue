<script setup lang="ts">

import {useRoute} from "vue-router";
import {ref} from "vue";

const route = useRoute()
const {tags} = route.query
const mockUser = {
  id: 12345,
  userName: '01geek',
  userAccount: '12314',
  profile: '一名精神小伙，目前还有头发，谢谢大家，阿爸爸阿爸爸阿巴阿巴阿巴',
  avatarUrl: 'src/assets/01geek.jpg',
  gender: 0,
  phone: '13113113111',
  email: '592342843721987@xzcxzczxcz.com',
  userRole: 0,
  planetCode: '1234',
  tags: tags,
  createTime: new Date(),
}

const userList = ref([mockUser])
/*const end = () => {
console.log(route.query.tags)
}*/


</script>

<template>
<!--  <van-button plain hairline type="primary" @click="end">get</van-button>-->
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.userName"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 8px">
        {{tag}}
      </van-tag>
    </template>
  </van-card>

</template>

<style scoped>

</style>