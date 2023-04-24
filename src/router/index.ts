import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Form from "../views/Form.vue";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Form",
    component: Form,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/detail",
    name: "Detail",
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/SchemaFormDemo",
    name: "SchemaFormDemo",
    component: () => import("../views/SchemaFormDemo.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
