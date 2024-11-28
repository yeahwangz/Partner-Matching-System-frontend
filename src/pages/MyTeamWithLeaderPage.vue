<script setup lang="ts">
import {onMounted, ref} from "vue";
import myAxios from "../config/AxiosConfig.ts";
import {TeamToRecommendType} from "../models/TeamToRecommendType";
import {Dialog} from "vant";

const checked = ref(false);
const currentPage = ref(1);
const pageNum = ref(1)
const theEveryPageSize = 4
const myTeamWithLeaderList = ref<TeamToRecommendType[]>([])

const getMyTeamWithLeaderOnePage = async () => {
  const resPageNum = await myAxios.get('/user/myTeamWithLeaderPageNum',{
    params: {
      everyPageSize: theEveryPageSize
    }
  })
  pageNum.value = resPageNum.data.data

  const res = await myAxios.get('/user/myTeamWithLeaderOnePage',{
    params: {
      nowPage: currentPage.value,
      everyPageSize: 4
    }
  })
  myTeamWithLeaderList.value = res.data.data
}

const isNone = ref(false)
onMounted(async () => {
  const resPageNum = await myAxios.get('/user/myTeamWithLeaderPageNum',{
    params: {
      everyPageSize: theEveryPageSize
    }
  })
  pageNum.value = resPageNum.data.data

  const res = await myAxios.get('/user/myTeamWithLeaderOnePage',{
    params: {
      nowPage: currentPage.value,
      everyPageSize: 4
    }
  })
  myTeamWithLeaderList.value = res.data.data
  if (myTeamWithLeaderList.value.length === 0){
    isNone.value = true
  }
})

const exitTheTeam = (myTeamWithLeader: TeamToRecommendType) => {
  /*show.value = true*/
  Dialog.confirm({
    title: '退出队伍',
    message:
        '请确定是否退出该队伍',
  })
      .then(() => {
        // on confirm
        myAxios.get('/user/leaderExitTeam',{
          params: {
            teamId: myTeamWithLeader.id
          }
        })
        history.go(0);
      })
      .catch(() => {
        // on cancel
      })
}

/*const changeTheTeamLeader = (myTeamWithLeader: TeamToRecommendType) => {}*/

const deleteTheTeam = (myTeamWithLeader: TeamToRecommendType) => {
  Dialog.confirm({
    title: '解散队伍',
    message:
        '请确定是否解散该队伍',
  })
      .then(() => {
        myAxios.get('/user/deleteTeam',{
          params: {
            teamId: myTeamWithLeader.id
          }
        })
        history.go(0)
      })
      .catch(() => {})
}
</script>

<template>
  <van-pagination v-if="checked === false" v-model="currentPage" @change="getMyTeamWithLeaderOnePage"
                  :page-count="pageNum" mode="simple" />
  <div>
    <van-empty v-if="isNone === true" description="无匹配队伍" />
    <van-card
        v-for="myTeamWithLeader in myTeamWithLeaderList"
        :key="myTeamWithLeader.id"
        :desc="myTeamWithLeader.profile || '该队伍还没有填写简介'"
        :title="myTeamWithLeader.teamName"
        :thumb="myTeamWithLeader.avatarUrl || 'src/assets/01geek.jpg'"
    >
      <template #tags>
        <van-tag plain type="danger"
                 v-for="tag in JSON.parse(myTeamWithLeader.tags)"
                 :key="tag"
                 style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="small" @click="exitTheTeam(myTeamWithLeader)">退出队伍</van-button>
<!--        <van-button size="small" @click="changeTheTeamLeader(myTeamWithLeader)">转让队长</van-button>-->
        <van-button size="small" @click="deleteTheTeam(myTeamWithLeader)">解散队伍</van-button>
        <!--   <van-button size="small" @click="alterTheTeam(myTeamWithLeader)">修改队伍</van-button>-->
      </template>

    </van-card>
  </div>
</template>

<style scoped>

</style>