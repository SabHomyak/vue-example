import {createRouter, createWebHistory} from "vue-router";
import Main from "@/components/pages/MainPage";
import AboutPage from "@/components/pages/AboutPage";
import PostsPage from "@/components/pages/PostsPage";
import PostPage from "@/components/pages/PostPage";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostsPage
    },
    {
        path: '/about',
        component: AboutPage
    },
    {
        path: '/posts/:id',
        component: PostPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;