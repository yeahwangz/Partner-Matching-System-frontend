<script setup lang="ts">
import {onMounted, ref} from "vue";
import {TeamToRecommendType} from "../models/TeamToRecommendType";
import myAxios from "../config/AxiosConfig.ts";
import {Dialog} from "vant";

const checked = ref(false);
const currentPage = ref(1);
const pageNum = ref(1)
const theEveryPageSize = 4
const myTeamWithMemberList = ref<TeamToRecommendType[]>([])

const getMyTeamWithMemberOnePage = async () => {
  const resPageNum = await myAxios.get('/user/myTeamWithMemberOnePage',{
    params: {
      everyPageSize: theEveryPageSize
    }
  })
  pageNum.value = resPageNum.data.data

  const res = await myAxios.get('/user/myTeamWithMemberOnePage',{
    params: {
      nowPage: currentPage.value,
      everyPageSize: 4
    }
  })
  myTeamWithMemberList.value = res.data.data
}

const isNone = ref(false)
onMounted(async () => {
  const resPageNum = await myAxios.get('/user/myTeamWithMemberPageNum',{
    params: {
      everyPageSize: theEveryPageSize
    }
  })
  pageNum.value = resPageNum.data.data

  const res = await myAxios.get('/user/myTeamWithMemberOnePage',{
    params: {
      nowPage: currentPage.value,
      everyPageSize: 4
    }
  })
  myTeamWithMemberList.value = res.data.data
  if (myTeamWithMemberList.value.length === 0){
    isNone.value = true
  }
})

const exitTheTeam = (myTeamWithMember: TeamToRecommendType) => {
  /*show.value = true*/
  Dialog.confirm({
    title: '退出队伍',
    message:
        '请确定是否退出该队伍',
  })
      .then(() => {
        // on confirm
        myAxios.get('/user/normalMemberExitTeam',{
          params: {
            teamId: myTeamWithMember.id
          }
        })
        history.go(0);
      })
      .catch(() => {
        // on cancel
      })
}
</script>

<template>
  <van-pagination v-if="checked === false" v-model="currentPage" @change="getMyTeamWithMemberOnePage"
                  :page-count="pageNum" mode="simple" />
  <div>
    <van-empty v-if="isNone === true" description="无匹配队伍" />
    <van-card
        v-for="myTeamWithMember in myTeamWithMemberList"
        :key="myTeamWithMember.id"
        :desc="myTeamWithMember.profile || '该队伍还没有填写简介'"
        :title="myTeamWithMember.teamName"
        :thumb="myTeamWithMember.avatarUrl || 'src/assets/01geek.jpg'"
    >
      <template #tags>
        <van-tag plain type="danger"
                 v-for="tag in JSON.parse(myTeamWithMember.tags)"
                 :key="tag"
                 style="margin-right: 8px; margin-top: 8px">
          {{ tag }}
        </van-tag>
      </template>
      <template #footer>
        <van-button size="small" @click="exitTheTeam(myTeamWithMember)">退出队伍</van-button>
      </template>
    </van-card>
  </div>
</template>

<style scoped>

</style>