<script setup lang="ts">
import {ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import {getUserInfoService} from "../services/UserInfoService.ts";
import {getCurrentUserInfo, setCurrentUserInfo} from "../classes/UserInfoClass.ts";
import myAxios from "../config/AxiosConfig.ts";
import {UserType} from "../models/UserType";

const router = useRouter()
const route = useRoute()
const editContent = ref({
  editKey: route.query.editKey as string | '',
  editName: route.query.editName as string | '',
  currentValue: route.query.currentValue as string | '',
})
const onSubmit = async () => {
  await getUserInfoService()
  const nowUserInfo: UserType | undefined = getCurrentUserInfo()
  if (nowUserInfo){
    const res = await myAxios.post('/user/edit/userInfo',{
      id: nowUserInfo.id,
      [editContent.value.editKey]: editContent.value.currentValue,
    })
    console.log("前后端均修改成功",res)
    if (res.data.data && res.data.code === 0){
      setCurrentUserInfo(res.data.data)
      editContent.value.currentValue = res.data.data[editContent.value.editKey]
      await router.replace('/user')
    }
  }
};

const afterRead = (file: any) => {
  const formData = new FormData()
  formData.append('file',file.file)
  myAxios.post('/user/upload/userImage',formData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
    const nowAvatarUrl = response.data.data
    const userInfo = getCurrentUserInfo()
    if (userInfo){
      userInfo.avatarUrl=nowAvatarUrl
    }
  }).catch(error => {
    console.log('更新用户头像失败',error)
  })
};

</script>

<template>
  <div v-if="editContent.editKey != 'avatarUrl' && editContent.editKey != 'gender' && editContent.editKey != 'tags' ">
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
  </div>
  <div v-if="editContent.editKey == 'gender' ">
    <van-radio-group v-model="editContent.currentValue">
      <van-radio name="1">男</van-radio>
      <van-radio name="0">女</van-radio>
    </van-radio-group>
    <van-button plain type="primary" @click="onSubmit">提交</van-button>
  </div>
  <div v-if="editContent.editKey == 'avatarUrl' ">
    <van-uploader :after-read="afterRead"/>
  </div>
  <div v-if="editContent.editKey == 'tags' ">

  </div>
</template>

<style scoped>

</style>