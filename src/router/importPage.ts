/**
 * 页面
 */
import { defineAsyncComponent } from 'vue'

export const Index = defineAsyncComponent(() => import("@/index.vue"))
export const Login = defineAsyncComponent(() => import("@/page/login/login.vue"))
export const Dashboard = defineAsyncComponent(() => import("@/page/index/dashboard.vue"))
export const AddGoods = defineAsyncComponent(() => import("@/page/add/goods.vue"))
export const AddOrders = defineAsyncComponent(() => import("@/page/add/orders.vue"))
export const ListBase = defineAsyncComponent(() => import("@/page/list/base.vue"))
export const ListGoods = defineAsyncComponent(() => import("@/page/list/goods.vue"))
export const ListOrders = defineAsyncComponent(() => import("@/page/list/orders.vue"))
export const DefaultPage = defineAsyncComponent(() => import("@/page/default.vue"))
