<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	name: "App",
	components: {},
})

</script>

<style>
#components-layout-demo-basic {
	box-sizing: border-box;
    padding: 10px;
	height: 100vh;
	color: #303030;
}
#components-layout-demo-basic > .ant-layout:last-child {
	margin: 0;
	border-radius: 10px;
	box-shadow: 2px 2px 8px 1px rgba(0, 0, 0, 0.4);
}
#components-layout-demo-basic .ant-layout-header {
	height: 60px;
	background: #f2f2f2;
	padding: 15px;
	border-radius: 0 10px 10px 0;
	line-height: 0;
}
#components-layout-demo-basic .ant-layout-sider {
	height: 100vh;
	text-align: center;
	background: #fbfbfb;
	height: 100%;
	-moz-user-select:none; /*火狐*/
	-webkit-user-select:none; /*webkit浏览器*/
	-ms-user-select:none; /*IE10*/
	-khtml-user-select:none; /*早期浏览器*/
	user-select:none;
}
#components-layout-demo-basic .ant-layout-sider:first-child {
	background: #4c4f50;
	border-radius: 10px 0 0 10px;
	color: #fff;
}
#components-layout-demo-basic .ant-layout-content {
	position: relative;
	background: #f3f3f3;
	padding: 20px 15px;
	overflow: auto;
}
#components-layout-demo-basic > .ant-layout {
	margin-bottom: 48px;
	height: 100%;
	border-radius: 0 10px 10px 0;
}
.ant-layout.ant-layout-has-sider > .ant-layout, .ant-layout.ant-layout-has-sider > .ant-layout-content {
	border-radius: 0 10px 10px 0;
}
.ant-divider-horizontal {
	background: #e2e2e2 !important;
}
.ant-divider-horizontal {
	margin: 0 !important;
	font-size: 0 !important;
}
.ant-divider-vertical {
	margin: 0 !important;
	font-size: 0 !important;
}
.ant-divider-vertical.sider-divider {
	height: 100%;
}
.ant-page-header-content {
    padding: 0 !important;
}
.fl {
	display: flex;
	align-content: center;
}
.ant-form-item {
	margin-bottom: 15px !important;
}

.ant-form-item:last-child {
	margin-bottom: 0 !important;
}
</style>
