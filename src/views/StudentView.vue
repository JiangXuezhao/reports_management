<template>
  <el-container style="min-height: 100vh">
    <el-header style="text-align: center; font-size: 20px; padding: 20px;">
      <i style="padding-left: 10px;">Student Report Submission</i>
      <el-button type="danger" style="margin-bottom: 5px; margin-left: 20px" @click="logout" >exit</el-button>
    </el-header>
    <el-main style="margin-top: 2%">
      <el-form style="margin-left: 25%; width: 50%" :model="progressReportForm" :rules="progressReportRules" ref="progressReportFormRef" label-width="120px">
        <el-form-item label="Course Name" prop="courseName">
          <el-input v-model="progressReportForm.courseName" placeholder="Please Input Course Name"></el-input>
        </el-form-item>
        <el-form-item label="Progress Description" prop="progressDescription">
          <el-input type="textarea" v-model="progressReportForm.progressDescription" placeholder="Please Input Progress Description"></el-input>
        </el-form-item>
        <el-form-item label="Progress Report Attachment" prop="progressReportFile">
          <el-upload
              class="upload-demo"
              ref="progressReportUploadRef"
              :on-success="handleProgressReportUploadSuccess"
              :before-upload="beforeProgressReportUpload"
              :limit="1"
              :on-exceed="handleProgressReportUploadExceed"
              :file-list="progressReportFileList"
          >
            <el-button size="small" type="primary">Upload</el-button>
            <div slot="tip" class="el-upload__tip">Only one file can be uploaded, in pdf or docx format</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button  type="primary" @click="submitProgressReport" style="margin-top: 20px; margin-left: 25%; ">Submit Progress Report</el-button>

      <el-divider></el-divider>

      <el-form style="margin-top: 2%; margin-left: 25%; width: 50%" :model="finalReportForm" :rules="finalReportRules" ref="finalReportFormRef" label-width="120px">
        <el-form-item label="Course Name" prop="courseName">
          <el-input v-model="finalReportForm.courseName" placeholder="Please Input Course Name"></el-input>
        </el-form-item>
        <el-form-item label="Final Summary" prop="finalSummary">
          <el-input type="textarea" v-model="finalReportForm.finalSummary" placeholder="Please input final report"></el-input>
        </el-form-item>
        <el-form-item label="Final Report Attachment" prop="finalReportFile">
          <el-upload
              class="upload-demo"
              ref="finalReportUploadRef"
              :on-success="handleFinalReportUploadSuccess"
              :before-upload="beforeFinalReportUpload"
              :limit="1"
              :on-exceed="handleFinalReportUploadExceed"
              :file-list="finalReportFileList"
          >
            <el-button size="small" type="primary">Upload</el-button>
            <div slot="tip" class="el-upload__tip">Only one file can be uploaded, in pdf or docx format</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitFinalReport" style="margin-top: 20px; margin-left: 25%">Submit Final Report</el-button>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { ElMessage, ElForm } from 'element-plus';
import router from "@/router";

interface ProgressReportForm {
  courseName: string;
  progressDescription: string;
  progressReportFile: File | null;
}

interface ProgressReportRules {
  courseName: { required: boolean; message: string; trigger: string };
  progressDescription: { required: boolean; message: string; trigger: string };
}

interface FinalReportForm {
  courseName: string;
  finalSummary: string;
  finalReportFile: File | null;
}

interface FinalReportRules {
  courseName: { required: boolean; message: string; trigger: string };
  finalSummary: { required: boolean; message: string; trigger: string };
}

// 进度报告表单数据
const progressReportForm = ref<ProgressReportForm>({
  courseName: '',
  progressDescription: '',
  progressReportFile: null,
});

const progressReportRules = ref<ProgressReportRules>({
  courseName: { required: true, message: 'Course name cannot be null', trigger: 'blur' },
  progressDescription: { required: true, message: 'Progress description cannot be null', trigger: 'blur' },
});

const progressReportFormRef = ref<InstanceType<typeof ElForm>>();

const progressReportFileList = ref<File[]>([]);

const finalReportForm = ref<FinalReportForm>({
  courseName: '',
  finalSummary: '',
  finalReportFile: null,
});

const finalReportRules = ref<FinalReportRules>({
  courseName: { required: true, message: 'Course name cannot be null', trigger: 'blur' },
  finalSummary: { required: true, message: 'Final Summary cannot be null', trigger: 'blur' },
});

const finalReportFormRef = ref<InstanceType<typeof ElForm>>();

const finalReportFileList = ref<File[]>([]);

const storedProgressReports = ref<ProgressReportForm[]>([]);
const storedFinalReports = ref<FinalReportForm[]>([]);

const handleProgressReportUploadSuccess = (response: any, file: File) => {
  progressReportFileList.value = [file];
  progressReportForm.value.progressReportFile = file;
};

const beforeProgressReportUpload = (file: File) => {
  const isAllowedFormat = ['pdf', 'docx'].includes(file.type.split('/')[1]);
  if (!isAllowedFormat) {
    ElMessage.error('Only one file can be uploaded, in pdf or docx format');
    return false;
  }
  return true;
};

const handleProgressReportUploadExceed = (files: File[], fileList: File[]) => {
  ElMessage.warning('Only one file can be uploaded');
};

const handleFinalReportUploadSuccess = (response: any, file: File) => {
  finalReportFileList.value = [file];
  finalReportForm.value.finalReportFile = file;
};

const beforeFinalReportUpload = (file: File) => {
  const isAllowedFormat = ['pdf', 'docx'].includes(file.type.split('/')[1]);
  if (!isAllowedFormat) {
    ElMessage.error('Only one file can be uploaded, in pdf or docx format');
    return false;
  }
  return true;
};

const handleFinalReportUploadExceed = (files: File[], fileList: File[]) => {
  ElMessage.warning('Only one file can be uploaded');
};

const submitProgressReport = () => {
  try {
    progressReportFormRef.value.validate();
    storedProgressReports.value.push({...progressReportForm.value });
    ElMessage.success('Progress report submit successfully.');
    progressReportForm.value = {
      courseName: '',
      progressDescription: '',
      progressReportFile: null,
    };
    progressReportFileList.value = [];
  } catch (error) {
    ElMessage.error('Progress report submit failure. Please check the form');
  }
};

const submitFinalReport = () => {
  try {
    finalReportFormRef.value.validate();
    storedFinalReports.value.push({...finalReportForm.value });
    ElMessage.success('Final report submit successfully.');
    finalReportForm.value = {
      courseName: '',
      finalSummary: '',
      finalReportFile: null,
    };
    finalReportFileList.value = [];
  } catch (error) {
    ElMessage.error('Final report submit failure. Please check the form');
  }
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