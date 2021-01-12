import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import UserModule from '@/module/UserModule'
import {
	Index,
	Login,
	Dashboard,
	AddGoods,
	AddOrders,
	ListGoods,
	ListOrders,
	DefaultPage,
	ListBase,
} from './importPage'

const routes: Array<RouteRecordRaw> = [
	{
		name: 'login',
		path: '/login',
		component: Login
	},
	{
		name: 'index',
		path: '/index',
		component: Index,
		children: [
			{
				name: 'defaultPage',
				path: '/index/',
				component: DefaultPage,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'dashboard',
				path: '/dashboard',
				component: Dashboard,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'addGoods',
				path: '/addGoods',
				component: AddGoods,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'addOrders',
				path: '/addOrders',
				component: AddOrders,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'listGoods',
				path: '/listGoods',
				component: ListGoods,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'listOrders',
				path: '/listOrders',
				component: ListOrders,
				meta: {
					keepAlive: true
				}
			},
			{
				name: 'listBase',
				path: '/listBase',
				component: ListBase,
				meta: {
					keepAlive: true
				}
			}
		]
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

const userModule = UserModule.getEntity()

router.beforeEach((to, from, next) => {
	// 判断登陆状态
	if (to.name === 'login') next()
	else {
		if (userModule.userInfo.token) {
			next()
		} else {
			next('login')
		}
	}
})

export default router


