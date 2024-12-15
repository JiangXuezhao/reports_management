<template>
  <el-container style="min-height: 100vh">
    <el-header style="text-align: center; font-size: 20px; padding: 20px;">
      <i style="padding-left: 10px;">Teacher Grade Management</i>
      <el-button type="danger" style="margin-bottom: 5px; margin-left: 20px" @click="logout" >exit</el-button>
    </el-header>
    <el-main>
      <el-form style="margin-left: 25%; width: 50%" :model="filterForm" :rules="filterRules" ref="filterFormRef" label-width="120px">
        <el-form-item label="Student Name" prop="semester">
          <el-select v-model="filterForm.studentName" placeholder="Please choose student name">
            <el-option label="Joe" value="Joe"></el-option>
            <el-option label="Jay" value="Jay"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Student ID" prop="course">
          <el-select v-model="filterForm.studentID" placeholder="Please choose student id">
            <el-option label="101122" value="101122"></el-option>
            <el-option label="101123" value="101123"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="filterStudents">Filter Students</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="studentList" stripe style="width: 100%">
        <el-table-column prop="studentID" label="Student ID"></el-table-column>
        <el-table-column prop="studentName" label="Student Name"></el-table-column>
        <el-table-column prop="progressGrade" label="Progress Grade">
          <template #default="scope">
            <el-input v-model="scope.row.progressGrade" placeholder="Input progress grade" :rules="gradeRules">
              <template #suffix>
                <el-icon v-if="!isGradeValid(scope.row.progressGrade)" name="warning-filled" style="color: red;"></el-icon>
              </template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="finalGrade" label="Final Grade">
          <template #default="scope">
            <el-input v-model="scope.row.finalGrade" placeholder="Input final grade" :rules="gradeRules">
              <template #suffix>
                <el-icon v-if="!isGradeValid(scope.row.finalGrade)" name="warning-filled" style="color: red;"></el-icon>
              </template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template #default="scope">
            <el-button type="primary" @click="submitGrades" style="margin-top: 20px;">提交成绩</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { ElMessage, ElForm, ElTable, ElIcon, ElDialog } from 'element-plus';
import store from '@/store';
import router from "@/router";

const gradeRules = ref([
  { required: true, message: 'Grade cannot be null', trigger: 'blur' },
  {
    validator: (rule: any, value: string, callback: any) => {
      const grade = parseFloat(value);
      if (isNaN(grade) || grade < 0 || grade > 100) {
        callback(new Error('Grades must be the number 0-100'));
      } else {
        callback();
      }
    },
    trigger: 'blur'
  }
]);

const gradeHistoryDialogVisible = ref(false);

let studentList = computed(() => store.getters.getStudentList);

const filterForm = computed(() => store.getters.getFilterForm);

const courseList = computed(() => store.getters.getCourseList);

const getGradeHistoryByStudentId = (studentId: string) => {
  const student = studentList.value.find(student => student.studentID === studentId);
  return student?.gradeHistory || [];
};

onMounted(() => {
  const initialStudentList = [{"studentID": "101122", "studentName": "Joe", "progressGrade": "", "finalGrade": "", teacher: 'Marry'},
    {
      studentID: '101123',
      studentName: 'Jay',
      studentPRGrade: '',
      studentFRGrade: '',
      teacher: 'Marry',
    },
    {
      studentID: '101124',
      studentName: 'Tom',
      studentPRGrade: '0',
      studentFRGrade: '0',
      teacher: 'Bob',
    },
    {
      studentID: '101125',
      studentName: 'Alice',
      studentPRGrade: '0',
      studentFRGrade: '0',
      teacher: 'Bob',
    },];
  localStorage.setItem('studentList', JSON.stringify(initialStudentList));

  const storedFilterForm = localStorage.getItem('filterForm');
  console.log(115, storedFilterForm);
  if (storedFilterForm) {
    store.commit('SET_FILTER_FORM', JSON.parse(storedFilterForm));
  }
});

const filterStudents = () => {
  store.dispatch('filterStudents');
  localStorage.setItem('filterForm', JSON.stringify(filterForm.value));
};

const showGradeHistory = (studentId: string) => {
  const gradeHistoryList = getGradeHistoryByStudentId(studentId);
  gradeHistoryDialogVisible.value = true;
};

const submitGrades = () => {
  try {
    const hasInvalidGrade = studentList.value.some(student => {
      return!isGradeValid(student.progressGrade) ||!isGradeValid(student.finalGrade);
    });
    if (hasInvalidGrade) {
      ElMessage.error('Please input all student grades.');
      return;
    }
    store.dispatch('submitGrades');
    ElMessage.success('Grades submit successfully');
  } catch (error) {
    ElMessage.error('Grades submit failure');
  }
};

const isGradeValid = (grade: string) => {
  const numGrade = parseFloat(grade);
  return!isNaN(numGrade) && numGrade >= 0 && numGrade <= 100;
};

const logout = () => {
  router.push('/login');
};
</script>

<style scoped>
.el-header {
  background-color: #409EFF;
  color: white;
}
</style>