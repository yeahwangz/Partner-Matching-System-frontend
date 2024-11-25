<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../config/AxiosConfig.ts";
import {TeamToRecommendType} from "../models/TeamToRecommendType";

const checked = ref(false);
const switchLoad = ref(0)

const currentPage = ref(1);
const theEveryPageSize = 4
const pageNum = ref(1)

const TeamToRecommendList = ref<TeamToRecommendType[]>([])
const searchRecommendTeam = async () => {
  switchLoad.value = 1
  if (checked.value === true){
    const res = await myAxios.get('/user/recommend/loveTeam')
    TeamToRecommendList.value = res.data.data
  }else {
    const resPageNum = await myAxios.get('/user/recommend/normalTeamPageNum',{
      params: {
        everyPageSize: theEveryPageSize
      }
    })
    pageNum.value = resPageNum.data.data
    const normalTeamOnePage = await myAxios.get('/user/recommend/normalTeamOnePage',{
      params: {
        nowPage: currentPage.value,
        everyPageSize: theEveryPageSize
      }
    })
    TeamToRecommendList.value = normalTeamOnePage.data.data
  }
  switchLoad.value = 0
}

const getNormalTeamOnePage = async () => {
  const normalTeamOnePage = await myAxios.get('/user/recommend/normalTeamOnePage',{
    params: {
      nowPage: currentPage.value,
      everyPageSize: theEveryPageSize
    }
  })
  TeamToRecommendList.value = normalTeamOnePage.data.data
}

onMounted(async () => {
  const resPageNum = await myAxios.get('/user/recommend/normalTeamPageNum',{
    params: {
      everyPageSize: theEveryPageSize
    }
  })
  pageNum.value = resPageNum.data.data
  const normalTeamOnePage = await myAxios.get('/user/recommend/normalTeamOnePage',{
    params: {
      nowPage: currentPage.value,
      everyPageSize: theEveryPageSize
    }
  })
  TeamToRecommendList.value = normalTeamOnePage.data.data
})
</script>

<template>
  <div class="content">
    <div>心动模式</div>
    <van-switch v-model="checked" v-if="switchLoad === 0" @click="searchRecommendTeam" />
    <van-switch v-model="checked" v-if="switchLoad === 1" @click="searchRecommendTeam" loading />

    <van-pagination v-if="checked === false" v-model="currentPage" @change="getNormalTeamOnePage"
                    :page-count="pageNum" mode="simple" />

    <div>
      <van-card
          v-for="TeamToRecommend in TeamToRecommendList"
          :key="TeamToRecommend.id"
          :desc="TeamToRecommend.profile || '此人还没有填写个人简介'"
          :title="TeamToRecommend.teamName"
          :thumb="TeamToRecommend.avatarUrl || 'src/assets/01geek.jpg'"
      >
        <template #tags>
          <van-tag plain type="danger"
                   v-for="tag in JSON.parse(TeamToRecommend.tags)"
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