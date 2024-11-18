<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../config/AxiosConfig.ts";
import {UserToRecommendType} from "../models/UserToRecommendType";

const checked = ref(false);
const switchLoad = ref(0)

const currentPage = ref(1);
const theEveryPageSize = 4
const pageNum = ref(1)

const UserToRecommendList = ref<UserToRecommendType[]>([])
const searchRecommendUser = async () => {
  switchLoad.value = 1
  if (checked.value === true){
    const res = await myAxios.get('/user/recommend/loveUser')
    UserToRecommendList.value = res.data.data
  }else {
    const resPageNum = await myAxios.get('/user/recommend/normalUserPageNum',{
      params: {
        everyPageSize: theEveryPageSize
      }
    })
    pageNum.value = resPageNum.data.data
    const normalUserOnePage = await myAxios.get('/user/recommend/normalUserOnePage',{
      params: {
        nowPage: currentPage.value,
        everyPageSize: theEveryPageSize
      }
    })
    UserToRecommendList.value = normalUserOnePage.data.data
  }
  switchLoad.value = 0
}

const getNormalUserOnePage = async () => {
  const normalUserOnePage = await myAxios.get('/user/recommend/normalUserOnePage',{
    params: {
      nowPage: currentPage.value,
      everyPageSize: theEveryPageSize
    }
  })
  UserToRecommendList.value = normalUserOnePage.data.data
}

onMounted(async () => {
  const resPageNum = await myAxios.get('/user/recommend/normalUserPageNum',{
    params: {
      everyPageSize: theEveryPageSize
    }
  })
  pageNum.value = resPageNum.data.data
  const normalUserOnePage = await myAxios.get('/user/recommend/normalUserOnePage',{
    params: {
      nowPage: currentPage.value,
      everyPageSize: theEveryPageSize
    }
  })
  UserToRecommendList.value = normalUserOnePage.data.data
})
</script>

<template>
  <div class="content">
    <div>心动模式</div>
    <van-switch v-model="checked" v-if="switchLoad === 0" @click="searchRecommendUser" />
    <van-switch v-model="checked" v-if="switchLoad === 1" @click="searchRecommendUser" loading />

    <van-pagination v-if="checked === false" v-model="currentPage" @change="getNormalUserOnePage"
                    :page-count="pageNum" mode="simple" />

    <div>
      <van-card
          v-for="UserToRecommend in UserToRecommendList"
          :key="UserToRecommend.id"
          :desc="UserToRecommend.profile || '此人还没有填写个人简介'"
          :title="UserToRecommend.userName"
          :thumb="UserToRecommend.avatarUrl || 'src/assets/01geek.jpg'"
      >
        <template #tags>
          <van-tag plain type="danger"
                   v-for="tag in JSON.parse(UserToRecommend.tags)"
                   :key="tag"
                   style="margin-right: 8px; margin-top: 8px">
            {{ tag }}
          </van-tag>
        </template>
      </van-card>
    </div>

  </div>
</template>

<style scoped>
.content {
  overflow-y: auto; /* 当内容超出时，启用滚动 */
}

</style>