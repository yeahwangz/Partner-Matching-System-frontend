<script setup lang="ts">
import {ref} from "vue";
import myAxios from "../config/AxiosConfig.ts";
import {useRouter} from "vue-router";
import {Toast} from "vant";

const teamName = ref('')
const profile = ref('')
const router = useRouter()
const onSubmit = () => {
  myAxios.post('/user/createNewTeam',{
    teamName: teamName.value,
    profile: profile.value
  })
  Toast.success('创建队伍成功')
  router.replace('/team')
}
</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="teamName"
          name="队伍名"
          label="队伍名"
          placeholder="请填写队伍名"
          :rules="[{ required: true, message: '请填写队伍名' }]"
      />
      <van-field
          v-model="profile"
          name="队伍简介"
          label="队伍简介"
          placeholder="请填写队伍简介"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>