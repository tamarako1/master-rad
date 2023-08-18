import Vue from "vue";
import VueRouter from "vue-router";
import ButtonComponent from "../components/ButtonComponent.vue";
import SetDirection from "../components/SetDirection.vue";
import HomeComponent from "../components/HomeComponent.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: HomeComponent },
  { path: "/buttons", component: ButtonComponent },
  { path: "/direction", component: SetDirection },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
