import {createRouter, createWebHistory} from "vue-router";
import Main from "@/components/pages/MainPage";
import AboutPage from "@/components/pages/AboutPage";
import PostsPage from "@/components/pages/PostsPage";
import PostPage from "@/components/pages/PostPage";
import PostsPageWithStore from "@/components/pages/PostsPageWithStore";
import PostsPageWithComposition from "@/components/pages/PostsPageWithComposition";

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
    },
    {
        path: '/store',
        component: PostsPageWithStore
    },
    {
        path: '/composition',
        component: PostsPageWithComposition
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;