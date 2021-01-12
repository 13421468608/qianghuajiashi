<template>
	<a-card class="login-pupop">
		<h2 class="login-title">登陆到强华家私后台</h2>
		<a-form layout="horizontal"
			ref="loginRef"
			:model="loginFrom"
			:rules="rules"
		>
			<a-form-item name="phone">
				<a-input class="login-input" v-model:value="loginFrom.phone" placeholder="请输入手机号码">
					<template #prefix><UserOutlined style="color:rgba(0,0,0,.25)"/></template>
				</a-input>
			</a-form-item>
			<a-form-item name="password">
				<a-input class="login-input" v-model:value="loginFrom.password" type="password" placeholder="请输入密码">
					<template #prefix><LockOutlined style="color:rgba(0,0,0,.25)"/></template>
				</a-input>
			</a-form-item>
			<a-form-item>
				<a-button
					type="primary"
					@click="logining"
					:disabled="loginFrom.phone === '' || loginFrom.password === ''"
					:loading="isLogining"
				>
					登陆
				</a-button>
			</a-form-item>
		</a-form>
	</a-card>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import UserModule from '@/module/UserModule'
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue'

import { LoginFrom } from '@/common/interface/user'

import { Card } from 'ant-design-vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

export default defineComponent({
	name: 'LoginPage',
	data() {
		return {
			rules: {
				phone: [
					{ required: true, message: '请输入手机号码', trigger: 'blur' },
					{ min: 11, max: 11, message: '请输入11位的手机号码', trigger: 'blur' }
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
					{ min: 6, message: '密码不得少于6位', trigger: 'blur' }
				]
			}
		}
	},
	components: {
		UserOutlined,
		LockOutlined,
		aCard: Card
	},
	setup() {
		const userModule: UserModule = UserModule.getEntity()
		const loginFrom: LoginFrom = userModule.loginFrom
		const router = useRouter() // vue 路由
		let loginRef: Ref<any | null> = ref(null)
		let isLogining: Ref<boolean> = ref(false)

		async function logining () {
			isLogining.value = true
			try {
				await loginRef.value.validate()
				await userModule.logining();
				message.success('登陆成功，正在跳转到首页', 2, () => {
					router.push('/index');
					isLogining.value = false
				})
			} catch(e) {
				console.log(e)
				isLogining.value = false
			}
			
		}
		
		return {
			loginFrom,
			logining,
			loginRef,
			isLogining
		}
	}
});
</script>

<style scoped>
.login-pupop {
	width: 380px;
	height: 260px;
	text-align: center;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
.login-title {
	font-size: 24px;
	color: #3c3c3c;
	margin-bottom: 20px;
}
.login-input {
	width: 328px;
}
</style>
