<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../config/AxiosConfig.ts";
import qs from 'qs';
import {UserType} from "../models/UserType";

const route = useRoute()
const {tags} = route.query

const userList = ref<UserType[]>([])

onMounted(async () => {
      try {
        const response = await myAxios.get(`/user/search/tags`, {
          params: {
            tagsList: tags
          },
          paramsSerializer: params => {
            return qs.stringify(params, {indices: false})
          }
        })
        console.log('/user/search/tags',response)
        console.log('here!.........',response.data)
        userList.value = response.data.data
      } catch (error) {
        console.error('/user/search/tags', error)
      }
    }
)

</script>

<template>
  <div v-if="userList.length > 0">
    <van-card
        v-for="user in userList"
        :desc="user.profile || '此人还没有填写个人简介'"
        :title="user.userName"
        :thumb="user.avatarUrl || 'src/assets/01geek.jpg'"
    >
      <template #tags>
        <van-tag plain type="danger"
                 v-for="tag in (user.tags ? JSON.parse(user.tags) : [])"
                 style="margin-right: 8px;margin-top: 8px">
          {{tag}}
        </van-tag>
      </template>
    </van-card>
  </div>
  <div v-else>
    匹配不到任何伙伴
  </div>
</template>

<style scoped>

</style>