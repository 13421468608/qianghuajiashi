<template>
	<div :class="{ 'window-lock': showLock }">
		<slot></slot>
	</div>
	<div class="lock-operation" v-if="showLock">
		<div class="locked-box">
			<div class="lock-time-dom">{{ nowTime }}</div>
			<p class="locked-dom" v-show="formatLockTime !== ''">{{ formatLockTime }} 锁的屏</p>
			<UnlockOutlined class="unlock-icon" @click="unlock"/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, watch } from 'vue'
import MenuModule from '@/module/menuModule'
import timeModule from '@/module/timeModule';
import { TIME_TYPE } from '@/common/enum/module'
import { forumFormatDate } from '@/common/method/formatTime';

import {
	UnlockOutlined
} from '@ant-design/icons-vue';

export default defineComponent({
	name: 'WindowLock',
	components: {
		UnlockOutlined
	},
	setup() {
		const menuModule: MenuModule = MenuModule.getEntity()
		let showLock: Ref<boolean> = menuModule.showLock
		let nowTime: Ref<string> = ref('')
		let lockTimeDestroy: Function = Function.prototype;
		let showTime: number = new Date().getTime()
		let formatLockTime: Ref<string> = ref('')

		function unlock () {
			showLock.value = false
		}

		watch(showLock, (newValues) => {
			if (!newValues) {
				// 销毁定时器
				lockTimeDestroy()
			} else {
				// 设置倒计时
				let { destroy, fmtTime } = timeModule({
					type: TIME_TYPE.SECOND,
					number: 1,
					callBack: (): void => {
						nowTime.value = fmtTime.value
						formatLockTime.value = forumFormatDate(showTime);
					}
				})
				showTime = new Date().getTime()
				formatLockTime.value = forumFormatDate(showTime);
				nowTime.value = fmtTime.value
				lockTimeDestroy = destroy
			}
		})

		return {
			showLock,
			formatLockTime,
			nowTime,
			unlock
		}
	}
});
</script>

<style scoped>
.window-lock {
	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-ms-filter: blur(5px);
	-o-filter: blur(5px);
	filter: blur(5px);
	filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
}
.lock-operation {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background: rgba(0,0,0,.1);
	text-align: center;
	-moz-user-select:none; /*火狐*/
	-webkit-user-select:none; /*webkit浏览器*/
	-ms-user-select:none; /*IE10*/
	-khtml-user-select:none; /*早期浏览器*/
	user-select:none;
}
.locked-box {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 100%;
	height: 200px;
}
.lock-time-dom {
	width: 100%;
	font-size: 30px;
	color: rgb(253, 175, 36);
	color: rgb(41, 194, 49);
	color: #1890ff;
	margin: 0 auto 20px;
	line-height: 40px;
}
.locked-dom {
	width: 100%;
	font-size: 20px;
	color: rgb(253, 175, 36);
	color: rgb(41, 194, 49);
	color: #1890ff;
	line-height: 20px;
	margin: 0 auto 40px;
}
.unlock-icon {
	width: 40px;
	height: 40px;
	font-size: 40px;
}

.unlock-icon:hover {
	color: #1890ff;
}
</style>