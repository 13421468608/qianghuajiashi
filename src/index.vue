<template>
	<window-lock>
		<div id="components-layout-demo-basic">
			<a-layout>
				<a-layout-sider width="70">
					<aside-dom></aside-dom>
				</a-layout-sider>
				<a-layout-sider width="250">
					<secondary-menu></secondary-menu>
				</a-layout-sider>
				<a-divider class="sider-divider" type="vertical"/>
				<a-layout>
					<a-layout-header>
						<header-dom></header-dom>
					</a-layout-header>
					<a-divider/>
					<a-layout-content>
						<router-view v-slot="{ Component }">
							<keep-alive>
								<component :is="Component" />
							</keep-alive>
						</router-view>
					</a-layout-content>
				</a-layout>
			</a-layout>

			<illustration></illustration>
		</div>
	</window-lock>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AsideDom from "@/page/aside/aside.vue"
import secondaryMenu from '@/page/aside/secondaryMenu.vue';
import Illustration from '@/components/Illustration.vue';
import windowLock from '@/components/windowLock.vue';
import HeaderDom from '@/page/header/header.vue';

export default defineComponent({
	name: "App",
	components: {
		AsideDom,
		secondaryMenu,
		Illustration,
		HeaderDom,
		windowLock
	},
})
</script>

<style scoped>

</style>
