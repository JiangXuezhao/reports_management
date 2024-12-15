import { createRouter, createWebHistory } from 'vue-router';
import Login from '@/views/Login.vue';
import AdminView from "@/views/AdminView.vue";
import StudentView from "@/views/StudentView.vue";
import TeacherView from "@/views/TeacherView.vue";
import Teachers from "@/views/Teachers.vue";

const routes = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/student',
        name: 'student',
        component: StudentView,
    },
    {
        path: '/teacher',
        name: 'teacher',
        component: Teachers,
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;
