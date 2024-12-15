<template>
  <div class="login-page">
    <h1 class="page-title">Report Submission</h1>
    <div class="login-container">
      <el-radio-group v-model="role" style="margin-bottom: 20px;">
        <el-radio label="student">Student</el-radio>
        <el-radio label="teacher">Teacher</el-radio>
        <el-radio label="admin">Admin</el-radio>
      </el-radio-group>

      <el-input v-if="role === 'student'" v-model="studentId" placeholder="Please input your studentID"
                style="width: 300px; margin-bottom: 20px;"></el-input>
      <el-input v-if="role === 'teacher'" v-model="teacherId" placeholder="Please input your workID"
                style="width: 300px; margin-bottom: 20px;"></el-input>
      <el-input v-if="role === 'admin'" v-model="adminId" placeholder="Please input your adminID"
                style="width: 300px; margin-bottom: 20px;"></el-input>

      <el-input :type="showPassword? 'text' : 'password'" v-model="password" placeholder="Please Input your password"
                style="width: 300px; margin-bottom: 20px;">
        <template slot="suffix">
          <i class="el-icon-view" @click="togglePasswordVisibility" style="font-size: 18px;"></i>
        </template>
      </el-input>

      <el-button type="primary" @click="login" style="width: 300px;">Login</el-button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const studentId = ref('');
const teacherId = ref('');
const adminId = ref('');
const password = ref('');
const role = ref('student');
const showPassword = ref(false);
const router = useRouter();

onMounted(() => {
  window.addEventListener('wheel', preventScroll, { passive: false });
});

onBeforeUnmount(() => {
  window.removeEventListener('wheel', preventScroll);
});

const login = async () => {
  try {
    let redirectUrl: string | undefined;

    if (role.value === 'student') {
      if (studentId.value === "student" && password.value === "123456") {
        redirectUrl = '/student';
      } else {
        alert('Username or Password Wrong');
      }
    } else if (role.value === 'teacher') {
      if (teacherId.value === "teacher" && password.value === "123456") {
        redirectUrl = '/teacher';
      } else {
        alert('Username or Password Wrong');
      }
    } else if (role.value === 'admin') {
      if (adminId.value === "admin" && password.value === "123456") {
        redirectUrl = '/admin';
      } else {
        alert('Username or Password Wrong');
      }
    }

    if (redirectUrl) {
      await router.push(redirectUrl);
    }

  } catch (error) {
    alert('Login failed. Please Try again later.');
  }
};

const preventScroll = (event: WheelEvent) => {
  event.preventDefault();
};

const togglePasswordVisibility = () => {
  showPassword.value =!showPassword.value;
};

</script>

<style scoped>
html,
body {
  overflow: hidden;
  height: 100%;
}

.login-page {
  background-color: #2a3d66;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 100px;
}

.page-title {
  font-size: 40px;
  font-weight: bold;
  color: white;
  margin-bottom: 0px;
}

.login-container {
  width: 400px;
  margin: 80px auto;
  text-align: center;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  background-color: #f9f9f9;
}

.el-radio-group {
  margin-bottom: 20px;
}

.el-input {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}

.footer-text {
  margin-top: 20px;
  font-size: 14px;
  color: #888;
}

.footer-text a {
  color: #409EFF;
  text-decoration: none;
}

.footer-text a:hover {
  text-decoration: underline;
}
</style>