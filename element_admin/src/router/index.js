/*
 * @Author: your name
 * @Date: 2020-12-13 10:37:58
 * @LastEditors: xiasong
 * @LastEditTime: 2020-12-13 16:29:26
 * @Description:
 * @FilePath: \follow_topfullstack\element_admin\src\router\index.js
 */
import Vue from "vue";
import VueRouter from "vue-router";
import ListArticle from "../views/ListArticle.vue";
import CreateArticle from "../views/CreateArticle.vue";
import EditArticle from "../views/EditArticle.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/articles/index",
  },
  {
    path: "/articles/index",
    name: "list_article",
    component: ListArticle,
  },
  {
    path: "/articles/create",
    name: "create_article",
    component: CreateArticle,
  },
  {
    path: "/articles/:id/edit",
    name: "edit_article",
    component: EditArticle,
  },
  // {
  //   path: "/articles/create",
  //   name: "create_article",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/CreateArticle.vue"),
  // },
];

const router = new VueRouter({
  routes,
});

export default router;
