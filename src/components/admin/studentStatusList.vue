<template>
  <div>
    <h3>Student Status</h3>
    <el-select v-model="selectionQuery.teacher" placeholder="Filter Teacher" style="width: 180px; margin-bottom: 20px;">
      <el-option label="Marry" value="Marry"></el-option>
      <el-option label="Bob" value="Bob"></el-option>
      <el-option label="Nick" value="Nick"></el-option>
    </el-select>

    <el-button type="primary" @click="handleSelectionFilter" style="margin-left: 10px;">筛选</el-button>

    <el-table :data="filterList" stripe style="width: 100%">
      <el-table-column prop="studentID" label="ID"></el-table-column>
      <el-table-column prop="studentName" label="Name"></el-table-column>
      <el-table-column prop="studentPRGrade" label="Grade of Progress Report"></el-table-column>
      <el-table-column prop="studentFRGrade" label="Grade of Final Report"></el-table-column>
      <el-table-column prop="teacher" label="Teacher"></el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

const selectionQuery = ref({
  teacher: 'Marry'
});
const selectionList = ref([] as {
  studentID: string;
  studentName: string;
  studentPRGrade: string;
  studentFRGrade: string;
  teacher: string;
}[]);

let filterList = ref([] as {
  studentID: string;
  studentName: string;
  studentPRGrade: string;
  studentFRGrade: string;
  teacher: string;
}[]);

onMounted(() => {
  fetchSelectionData();
});

const fetchSelectionData = async () => {
  try {
    selectionList.value = [
      {
        studentID: '101122',
        studentName: 'Joe',
        studentPRGrade: '80',
        studentFRGrade: '80',
        teacher: 'Marry',
      },
      {
        studentID: '101122',
        studentName: 'Joe',
        studentPRGrade: '80',
        studentFRGrade: '80',
        teacher: 'Marry',
      },
      {
        studentID: '101123',
        studentName: 'Jay',
        studentPRGrade: '80',
        studentFRGrade: '80',
        teacher: 'Marry',
      },
      {
        studentID: '101124',
        studentName: 'Tom',
        studentPRGrade: '80',
        studentFRGrade: '80',
        teacher: 'Bob',
      },
      {
        studentID: '101125',
        studentName: 'Alice',
        studentPRGrade: '80',
        studentFRGrade: '80',
        teacher: 'Bob',
      },
      {
        studentID: '101126',
        studentName: 'Joe',
        studentPRGrade: '80',
        studentFRGrade: '80',
        teacher: 'Nick',
      },
    ];
    filterList.value = selectionList.value;
  } catch (error) {
    ElMessage.error('Fetch Student Information failed. Please Try again later.');
  }
};

const handleSelectionFilter = () => {
  filterList.value = selectionList.value.filter((student) => {
    return student.teacher === selectionQuery.value.teacher;
  })
};

</script>

<style scoped>
.search-row {
  margin-bottom: 20px;
}

.el-select {
  width: 100%;
}

strong {
  font-size: 16px;
  color: #575e64;
}
</style>