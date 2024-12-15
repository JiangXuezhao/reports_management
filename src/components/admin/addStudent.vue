<template>
  <el-container style="min-height: 100vh">
    <el-main>
      <div style="width:50%; margin-left:25%;">
        <el-form :model="studentForm" :rules="studentRules" ref="studentFormRef" label-width="120px">
          <el-form-item label="Student Name" prop="studentName">
            <el-input v-model="studentForm.studentName" placeholder="Please input student name"></el-input>
          </el-form-item>
          <el-form-item label="Student ID" prop="studentId">
            <el-input v-model="studentForm.studentId" placeholder="Please input student number"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addStudent">add student</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="studentList" style="width: 100%">
        <el-table-column prop="studentName" label="Student Name"></el-table-column>
        <el-table-column prop="studentId" label="Student Number"></el-table-column>
        <el-table-column label="Operation">
          <template #default="scope">
            <el-button type="danger" @click="removeStudent(scope.$index)">Delete Student</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage, ElForm, ElTable } from 'element-plus';

interface StudentForm {
  studentName: string;
  studentId: string;
}

interface StudentRules {
  studentName: { required: boolean; message: string; trigger: string };
  studentId: { required: boolean; message: string; trigger: string };
}

interface AssignmentRules {
  student: { required: boolean; message: string; trigger: string };
  teacher: { required: boolean; message: string; trigger: string };
}

const studentForm = ref<StudentForm>({
  studentName: '',
  studentId: '',
});

const studentRules = ref<StudentRules>({
  studentName: { required: true, message: 'Student Name cannot be null', trigger: 'blur' },
  studentId: { required: true, message: 'Student ID cannot be null', trigger: 'blur' },
});

// 学生表单引用
const studentFormRef = ref<InstanceType<typeof ElForm>>();

// 学生列表数据
const studentList = ref<StudentForm[]>([]);

const addStudent = () => {
  try {
    studentFormRef.value.validate();
    studentList.value.push({...studentForm.value });
    ElMessage.success('Student add successfully');
    studentForm.value = {
      studentName: '',
      studentId: '',
    };
  } catch (error) {
    ElMessage.error('Student add failure. Please check form');
  }
};

const removeStudent = (index: number) => {
  studentList.value.splice(index, 1);
};

</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: white;
}
</style>