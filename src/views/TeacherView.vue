<template>
  <el-container style="min-height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2', '3']" style="min-height: 100%; overflow: hidden; padding:0"
               background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="rgb(255, 255, 255, 0.5)"
               class="sidebar-menu">
        <el-menu-item index="1-1" @click="currentPage = 'classList'">Student List</el-menu-item>
        <el-menu-item index="2-1" @click="currentPage = 'scoreList'">Submit Grades</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="background-color: #409EFF;text-align: right; font-size: 12px;height: 60px; padding-top: 20px;">
        <i class="el-icon-user-solid"></i>
        <i style="font-size: large; padding-left: 10px;">Welcome，{{ profile.name || 'user' }}</i>
      </el-header>

      <el-main>
        <div v-if="currentPage === 'classList'">课程信息内容</div>
        <div v-if="currentPage === 'scoreList'">成绩登记内容</div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

const hover = ref(false);
const currentPage = ref('');
const profile = ref({
  name: '',
} as { name: string });

onMounted(() => {
  getUserProfile();
});

const getUserProfile = async () => {
  try {
    console.error('fetch user information');
  } catch (error) {
    console.error('Cannot find user information', error);
  }
};

</script>

<style scoped>
</style>