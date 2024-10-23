<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

//搜索框
const value = ref('');
const onSearch = (val: string) => {
  if(val.length === 0) items.value = JSON.parse(JSON.stringify(conItems))
  else{
    items.value = JSON.parse(JSON.stringify(conItems))
    let midItems: any=[]
    items.value.forEach((item: any) => {
      if((item.children.filter((item2: any) => item2.id.includes(val))).length > 0){
        item.children=item.children.filter((item2: any) => item2.id.includes(val))
        midItems.push(item)
      }
    })
    items.value=JSON.parse(JSON.stringify(midItems))
  }
}
const onClickButton = () => onSearch(value.value)

const onCancel = () => activeIds.value = []

//多选
const activeIds = ref([]);
const activeIndex = ref(0);
//conItems用于存储提供的所有标签
const conItems = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '年级',
    children: [
      { text: '大一', id: '大一' },
      { text: '大二', id: '大二' },
      { text: '大三', id: '大三' },
      { text: '大四', id: '大四' },
    ],
  },
]
let items = ref(JSON.parse(JSON.stringify(conItems)))

// 移除标签
const doClose = (tag: string) => {
  activeIds.value = activeIds.value.filter(item => {
    return item !== tag;
  })
}

/*路由到匹配结果页*/
const router = useRouter()
const onMatch = () => {
  router.push({
    path: '/search/result',
    query: {
      tags: activeIds.value,
    }
  })
}

</script>

<template>
  <!--  搜索框-->
  <van-search
      v-model="value"
      show-action
      label="标签搜索"
      placeholder="请输入搜索关键词"
      @search="onSearch"
  >
    <template #action>
      <div @click="onClickButton">搜索</div>
    </template>
  </van-search>

  <!-- 已选择可关闭标签 -->
  <van-row gutter="16" style="padding: 0 16px">
    <van-col v-for="tag in activeIds">
      <van-tag closeable size="medium" type="primary" @close="doClose(tag)">
        {{ tag }}
      </van-tag>
    </van-col>
  </van-row>

  <br>

<!--  标签重置按钮-->
  <van-button plain hairline type="primary" @click="onCancel">重置标签</van-button>

  &nbsp;&nbsp;&nbsp;

  <!--  提交标签进行匹配按钮-->
  <van-button plain hairline type="primary" @click="onMatch">开始匹配</van-button>

<!--  分割线-->
  <van-divider />

  <!--  多选-->
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="items"
  />

</template>

<style scoped>

</style>