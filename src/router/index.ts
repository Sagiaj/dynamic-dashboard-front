import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "DefaultView",
      component: () => import("@/views/DashboardInline.vue"),
      meta: {
      }
    },
    {
      path: "/inline",
      name: "InlineView",
      component: () => import("@/views/DashboardInline.vue"),
      meta: {
      }
    },
    {
      path: "/lab",
      name: "LabView",
      component: () => import("@/views/DashboardLab.vue"),
      meta: {
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => { 
  return next();
});

export default router;
