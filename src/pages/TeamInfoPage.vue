<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import myAxios from "../config/AxiosConfig.ts";
import {TeamToRecommendType} from "../models/TeamToRecommendType";

const route = useRoute()
const teamToRecommendInfo = JSON.parse(<string>route.query.RouterTeamToRecommend)
const router = useRouter()
const joinTheTeam = (teamToRecommendInfo: TeamToRecommendType) => {
  myAxios.get('/user/joinTeam',{
    params: {
      teamId: teamToRecommendInfo.id
    }
  })
  router.replace('/team')
}
</script>

<template>
  <div v-if="teamToRecommendInfo">
    <van-cell-group inset>
      <van-cell title="队伍名" :value="teamToRecommendInfo.teamName" />
      <van-cell title="队伍简介" :value="teamToRecommendInfo.profile" />
      <van-cell title="队伍标签" :value="teamToRecommendInfo.tags" />
      <van-cell title="队伍头像" is-link :value="teamToRecommendInfo.avatarUrl"  >
        <template #value>
          <img :src="teamToRecommendInfo.avatarUrl" alt="头像" style="width: 40px; height: 40px; border-radius: 50%;" />
        </template>
      </van-cell>
      <van-cell title="当前成员" :value="teamToRecommendInfo.currentMember" />
      <van-cell title="允许最大成员数" :value="teamToRecommendInfo.maxMemberNum" />
    </van-cell-group>
    <van-button type="primary" @click="joinTheTeam(teamToRecommendInfo)">加入该队伍</van-button>
  </div>
</template>

<style scoped>

</style>