<script setup lang="ts">
import UserLoginPage from "./pages/UserLoginPage.vue";
import BasicLayout from "./layouts/BasicLayout.vue";
import {loginStatus} from "./globals/LoginStatus.ts";
import UserRegisterPage from "./pages/UserRegisterPage.vue";
</script>

<template>
  <basic-layout v-if="loginStatus === 1"/>
  <UserLoginPage v-if="loginStatus === 0"/>
  <UserRegisterPage v-if="loginStatus === 2"/>
</template>

<style scoped>

</style>
