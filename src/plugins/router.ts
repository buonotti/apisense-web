import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

export const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("../views/Home.vue"),
        meta: {
            title: "Home",
        }
    },
    {
        path: "/galaxies",
        redirect: "/galaxies/all",
        meta: {
            title: "Galaxies",
        }
    },
    {
        path: "/galaxies/all",
        component: () => import("../views/AllGalaxies.vue"),
        meta: {
            title: "All Galaxies",
        }
    },
    {
        path: "/galaxies/filter",
        component: () => import("../views/FilteredGalaxies.vue"),
        meta: {
            title: "Filtered Galaxies",
        }
    },
    {
        path: "/settings",
        component: () => import("../views/Settings.vue"),
        meta: {
            title: "Settings",
        }
    }
];

export const router = createRouter({
                                history: createWebHistory(),
                                routes,
                            });