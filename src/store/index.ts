import { createStore } from 'vuex';

interface Student {
    studentID: string;
    studentName: string;
    progressGrade: string;
    finalGrade: string;
    teacher: string;
}

interface FilterForm {
    studentID: string;
    studentName: string;
}

interface State {
    filterForm: FilterForm;
    studentList: Student[];
}

const state: State = {
    filterForm: {
        studentID: "",
        studentName: ""
    },
    studentList: [],
};

const mutations = {
    SET_FILTER_FORM(state: State, payload: FilterForm) {
        state.filterForm = payload;
        localStorage.setItem('filterForm', JSON.stringify(payload));
    },
    SET_STUDENT_LIST(state: State, payload: Student[]) {
        state.studentList = payload;
        localStorage.setItem('filterForm', JSON.stringify(payload));
    },
    UPDATE_STUDENT_GRADE(state: State, payload: { studentID: string; progressGrade: string; finalGrade: string }) {
        const studentIndex = state.studentList.findIndex(student => student.studentID === payload.studentID);
        if (studentIndex!== -1) {
            const now = new Date().toISOString();
            state.studentList[studentIndex].progressGrade = payload.progressGrade;
            state.studentList[studentIndex].finalGrade = payload.finalGrade;
        }
        localStorage.setItem('studentList', JSON.stringify(state.studentList));
    },
    CLEAR_STUDENT_GRADES(state: State) {
        state.studentList.forEach(student => {
            student.progressGrade = '';
            student.finalGrade = '';
        });
        localStorage.setItem('studentList', JSON.stringify(state.studentList));
    },
    INITIALIZE_DATA(state: State) {
        const storedFilterForm = localStorage.getItem('filterForm');
        if (storedFilterForm) {
            state.filterForm = JSON.parse(storedFilterForm);
        }
        const storedStudentList = localStorage.getItem('studentList');
        if (storedStudentList) {
            state.studentList = JSON.parse(storedStudentList);
        }
    },
};

const actions = {
    filterStudents({ commit, state }) {
        const filteredStudents = [];
        state.studentList.forEach(student => filteredStudents.push({...student }));
        commit('SET_STUDENT_LIST', filteredStudents);
    },
    submitGrades({ commit }) {
        commit('CLEAR_STUDENT_GRADES');
    },
};

const getters = {
    getStudentList: (state: State) => state.studentList,
    getFilterForm: (state: State) => state.filterForm,
};

export default createStore({
    state,
    mutations,
    actions,
    getters,
});