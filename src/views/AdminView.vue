<template>
  <el-container style="min-height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1', '2', '3']" style="min-height: 100%; overflow: hidden; padding:0"
               background-color="rgb(48, 65, 86)" text-color="#fff" active-text-color="rgb(255, 255, 255, 0.5)"
               class="sidebar-menu">
        <el-menu-item index="1-1" @click="currentPage = 'register'">Add Student</el-menu-item>
        <el-menu-item index="2-1" @click="currentPage = 'assignList'">Assign Student</el-menu-item>
        <el-menu-item index="2-1" @click="currentPage = 'studentList'">Student List</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="background-color: #409EFF; text-align: right; font-size: 12px; height: 60px; padding-top: 20px;">
        <i class="el-icon-user-solid"></i>
        <i style="font-size: large; padding-left: 10px;">Welcome，{{ profile.name || 'user' }}</i>
        <el-button type="danger" style="margin-left: 10px; margin-bottom: 5px" @click="logout" >exit</el-button>
      </el-header>

      <el-main>
        <add-student v-if="currentPage === 'register'"></add-student>
        <assign-student v-if="currentPage === 'assignList'"></assign-student>
        <student-status-list v-if="currentPage === 'studentList'"></student-status-list>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import StudentStatusList from "@/components/admin/studentStatusList.vue";
import addStudent from '@/components/admin/addStudent.vue';
import AssignStudent from "@/components/admin/assignStudent.vue";
import router from "@/router";

const hover = ref(false);
const currentPage = ref('');
const profile = ref({
  name: '',
});

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

const logout = () => {
  router.push('/login');
};
</script>

<style scoped>
</style>