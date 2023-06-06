import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Form from "../views/Form.vue";

Vue.use(VueRouter);

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "基础表单",
    component: Form,
  },
  {
    path: "/SchemaFormDemo",
    name: "配置表单",
    component: () => import("../views/SchemaFormDemo.vue"),
  },
  {
    path: "/SchemaRenderFormDemo",
    name: "渲染函数配置表单",
    component: () => import("../views/SchemaRenderFormDemo.vue"),
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

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
