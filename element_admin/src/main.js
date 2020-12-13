/*
 * @Author: your name
 * @Date: 2020-12-13 10:37:58
 * @LastEditors: xiasong
 * @LastEditTime: 2020-12-13 13:35:15
 * @Description:
 * @FilePath: \follow_topfullstack\element_admin\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";

Vue.config.productionTip = false;

import axios from "axios";
Vue.prototype.$http = axios.create({
  baseURL: "http://localhost:3001/api",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
