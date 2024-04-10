import { Router, createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/home/index.vue"),
		meta: {
			title: "首页",
		},
	},
];

export const router: Router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
