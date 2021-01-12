<template>
	<a-avatar
		class="avatar"
		shape="square"
		:size="36"
		:src="avatarImg"
	>
	</a-avatar>

	<ul class="aside">
		<li class="aside-item-box" v-for="item in featureList" :key="item.id" @click="clickItem(item)">
			<item-box :boxData="item"></item-box>
		</li>
	</ul>

	<div class="bottom-icon-box">
		<a-tooltip placement="right">
			<template #title>
				<p class="bottom-tips">锁屏</p>
			</template>
			<LockOutlined class="bottom-icon" @click="windowLock"/>
		</a-tooltip>
		<a-tooltip placement="right">
			<template #title>
				<p class="bottom-tips">退出登陆</p>
			</template>
			<a-popconfirm
				placement="rightBottom"
				title="是否要退出登陆？"
				ok-text="确定"
				cancel-text="点错了"
				@confirm="logout"
			>
				<LogoutOutlined class="bottom-icon" />
			</a-popconfirm>
		</a-tooltip>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuModule from '@/module/menuModule'
import UserModule from '@/module/UserModule'
import { useRouter } from "vue-router";

import type { FeatureList } from '@/common/interface/index'

import {
	LogoutOutlined,
	LockOutlined
} from '@ant-design/icons-vue';
import itemBox from './item-box'
import { Popconfirm, Tooltip } from 'ant-design-vue'

import avatarImg from '@/assets/avatar/avatar1.svg'

export default defineComponent({
	name: 'Aside',
	components: {
		itemBox,
		LogoutOutlined,
		LockOutlined,
		aPopconfirm: Popconfirm,
		ATooltip: Tooltip
	},
	setup() {
		const menuModule = MenuModule.getEntity()
		const featureList = menuModule.mainMenu
		const router = useRouter()
		const clickItem = function (item: FeatureList) {
			menuModule.goPath(item)
		}
		function logout () {
			UserModule.getEntity().logout()
			router.push('/login')
		}
		function windowLock() {
			menuModule.showLock.value = true
		}

		return {
			featureList,
			avatarImg,
			clickItem,
			logout,
			windowLock
		}
	}
});
</script>

<style scoped>
.avatar {
	margin-top: 40px;
	margin-bottom: 10px;
}
.aside {
	padding: 15px 0;
}
.aside-item-box {
	width: 100%;
	padding: 15px 0;
}

.bottom-icon-box {
	position: absolute;
	bottom: 15px;
	right: 0;
	left: 0;
	margin: auto;
	text-align: center;
}
.bottom-icon {
	width: 28px;
    height: 28px;
    font-size: 28px;
	display: block;
	margin: 15px auto;
}
.bottom-icon:hover {
    color: #1890ff;
}
.bottom-tips {
	white-space: nowrap;
	-moz-user-select:none; /*火狐*/
	-webkit-user-select:none; /*webkit浏览器*/
	-ms-user-select:none; /*IE10*/
	-khtml-user-select:none; /*早期浏览器*/
	user-select:none;
	pointer-events: none;
}
</style>