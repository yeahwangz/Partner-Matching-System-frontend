<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
import {getUserInfoService} from "../services/UserInfoService.ts";
import {getCurrentUserInfo, setCurrentUserInfo} from "../classes/UserInfoClass.ts";
import myAxios from "../config/AxiosConfig.ts";
import {UserType} from "../models/UserType";

const route = useRoute();
const editContent = ref({
  editKey: route.query.editKey as string | '',
  editName: route.query.editName as string | '',
  currentValue: route.query.currentValue as string | '',
})
const onSubmit = async () => {
  await getUserInfoService()
  const nowUserInfo: UserType = getCurrentUserInfo()
  const res = await myAxios.post('/user/edit/userInfo',{
    id: nowUserInfo.id,
    [editContent.value.editKey]: editContent.value.currentValue,
  })
  console.log("前后端均修改成功",res)
  if (res.data.data && res.data.code === 0){
    setCurrentUserInfo(res.data.data)
    editContent.value.currentValue = res.data.data[editContent.value.editKey]
  }
};

</script>

<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editContent.currentValue"
          :name="editContent.editKey"
          :label="editContent.editName"
          :placeholder="`请输入${editContent.editName}`"
          :rules="[{ required: true, message: '请填写用户名' }]"
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