<template>
  <div>
    <h3>Assign Students</h3>
    <el-select v-model="selectionQuery.student" placeholder="Search" style="width: 180px; margin-bottom: 20px;">
      <el-option label="Joe" value="Joe"></el-option>
      <el-option label="Jay" value="Jay"></el-option>
      <el-option label="Tom" value="Tom"></el-option>
      <el-option label="Alice" value="Alice"></el-option>
    </el-select>

    <el-button type="primary" @click="handleSelectionFilter" style="margin-left: 10px;">筛选</el-button>

    <el-table :data="filterList" stripe style="width: 100%">
      <el-table-column prop="studentID" label="ID"></el-table-column>
      <el-table-column prop="studentName" label="Name"></el-table-column>
      <el-table-column prop="teacher" label="Teacher">
        <template #default="scope">
          <el-select v-model="scope.row.teacher" placeholder="Choose Teacher">
            <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name" :value="teacher">
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Operation">
        <template #default="scope">
          <el-button type="primary" @click="saveGrades(scope.row)">Confirm</el-button>
<!--          <el-button type="success" >Confirmed</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

interface Student {
  studentID: string;
  studentName: string;
  teacher: {
    id: string;
    name: string;
  };
  isConfirm: boolean;
}

interface Teacher {
  id: string;
  name: string;
}

const selectionQuery = ref({
  student: 'Joe'
});
let selectionList = ref([] as Student[]);
let filterList = ref([] as Student[]);
const teacherList = ref<Teacher[]>([
  { id: 'T001', name: 'Marry' },
  { id: 'T002', name: 'Bob' },
  { id: 'T003', name: 'Nick' },
]);

onMounted(() => {
  fetchSelectionData();
});

const fetchSelectionData = async () => {
  try {
    selectionList.value = [
      {
        studentID: '101122',
        studentName: 'Joe',
        teacher: { id: 'T001', name: 'Marry' },
        isConfirm: false
      },
      {
        studentID: '101123',
        studentName: 'Jay',
        teacher: { id: 'T001', name: 'Marry' },
        isConfirm: false
      },
      {
        studentID: '101124',
        studentName: 'Tom',
        teacher: { id: 'T002', name: 'Bob' },
        isConfirm: false
      },
      {
        studentID: '101125',
        studentName: 'Alice',
        teacher: { id: 'T002', name: 'Bob' },
        isConfirm: false
      }
    ];
    filterList.value = selectionList.value
  } catch (error) {
    ElMessage.error('Fetch Student Information failed. Please Try again later.');
  }
};

const handleSelectionFilter = () => {
  filterList.value = selectionList.value.filter((student) => {
    return student.studentName === selectionQuery.value.student;
  })
};

const saveGrades = (student: Student) => {
  ElMessage.success('Assign Successfully');
  student.isConfirm = true;
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