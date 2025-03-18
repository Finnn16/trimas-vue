import { createRouter, createWebHistory } from 'vue-router'
import About from '../pages/About.vue'

const routes= [
    {
        path: '/',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router