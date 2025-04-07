import { RouteRecordRaw } from "vue-router";
import MainLayout from "../components/layout/MainLayout.vue";

// 基础路由
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../views/Home.vue"),
      },
      {
        path: "examples",
        name: "Examples",
        redirect: "/examples/table",
        children: [
          {
            path: "table",
            name: "TableExample",
            component: () => import("../views/examples/TableExample.vue"),
          },
          {
            path: "form",
            name: "FormExample",
            component: () => import("../views/examples/FormExample.vue"),
          },
          {
            path: "chart",
            name: "ChartExample",
            component: () => import("../views/examples/ChartExample.vue"),
          },
        ],
      },
      {
        path: "about",
        name: "About",
        component: () => import("../views/About.vue"),
      },
    ],
  },
  // 使用新的布局的页面
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Home.vue"), // 临时使用Home页面
  },
  // TODO: 在此处添加更多路由
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

export default routes;
