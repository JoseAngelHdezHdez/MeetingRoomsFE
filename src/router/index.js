import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/meeting',
            name: 'meeting',
            component: () => import('../views/MeetingView.vue')
        },
        {
            path: '/meetings/:id',
            name: 'meetings',
            component: () => import('../views/MeetingsView.vue')
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Error404',
            component: () => import('../views/NotFoundView.vue'),
        },
    ]
})

export default router;