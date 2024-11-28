<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../config/AxiosConfig.ts";
import {TeamToRecommendType} from "../models/TeamToRecommendType";
import {useRouter} from "vue-router";

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

const router = useRouter()
const createNewTeam = () => {
  router.push('/createTeam')
}

const clickFooter = (TeamToRecommend: TeamToRecommendType) => {
  router.push({
    path: '/teamInfo',
    query: {
      RouterTeamToRecommend: JSON.stringify(TeamToRecommend)
    }
  })
}

const watchMyTeamWithLeader = () => {
  router.push('/myTeamWithLeaderPage')
}
const watchMyTeamWithMember = () => {
  router.push('/myTeamWithMemberPage')
}
</script>

<template>
  <div class="content">
    <div>心动模式</div>
    <van-switch v-model="checked" v-if="switchLoad === 0" @click="searchRecommendTeam" />
    <van-switch v-model="checked" v-if="switchLoad === 1" @click="searchRecommendTeam" loading />
    <van-button type="primary" @click="createNewTeam">创建队伍</van-button>
    <van-button round type="success" @click="watchMyTeamWithLeader">担任队长的队伍</van-button>
    <van-button round type="success" @click="watchMyTeamWithMember">担任普通成员的队伍</van-button>
    <van-pagination v-if="checked === false" v-model="currentPage" @change="getNormalTeamOnePage"
                    :page-count="pageNum" mode="simple" />
    <div v-if="switchLoad === 0 && TeamToRecommendList.length === 0">
      <van-empty description="无匹配的普通队伍" />
    </div>
    <div v-if="switchLoad === 1 && TeamToRecommendList.length === 0">
      <van-empty description="无匹配的心动队伍" />
    </div>
    <div>
      <van-card
          v-for="TeamToRecommend in TeamToRecommendList"
          :key="TeamToRecommend.id"
          :desc="TeamToRecommend.profile || '该队伍还没有填写简介'"
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
        <template #footer>
          <van-button size="small" @click="clickFooter(TeamToRecommend)">查看详情</van-button>
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