<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";

const route = useRoute();
const editContent = ref({
  editKey: route.query.editKey as string | '',
  editName: route.query.editName as string | '',
  currentValue: route.query.currentValue as string | '',
})
const onSubmit = (values: any) => {
  //TODO 将editKey、editName、currentValue提交到后台
  console.log('submit',values);
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