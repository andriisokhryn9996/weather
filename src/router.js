import {createRouter, createWebHistory} from 'vue-router'

import weatherRouter from '@/modules/weather/router'

import Main from "@/view/Main.vue";

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main,
    },
    ...weatherRouter
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})


export default router