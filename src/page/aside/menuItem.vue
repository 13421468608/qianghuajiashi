<template>
    <div :class="['menu-item', activeId === menuData.id ? 'active' : '' ]" @click="goPath(menuData)">
        <p>{{ menuData.title }}</p>
        <span>{{ menuData.title }}</span>
        <StopFilled  class="close" @click.stop="closeItem(menuData.id)"/>
    </div>
    <a-divider v-if="!lastIndex"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuModule from '@/module/menuModule'

import type { PropType } from 'vue';
import type { FeatureList } from '@/common/interface/index'

import {
	StopFilled
} from '@ant-design/icons-vue';

export default defineComponent({
	name: '',
    components: { StopFilled },
    props: {
        menuData: {
            type: Object as PropType<FeatureList>,
            default: {
                id: '-1',
                title: '主页',
                icon: 'none'
            }
        },
        lastIndex: {
            type: Boolean,
            default: false
        }
    },
	setup() {
        const menuModule = MenuModule.getEntity()
        const activeId = menuModule.secondaryMenuId
        const goPath = function (item: FeatureList): void {
            menuModule.secondaryGoPath(item)
        }
        const closeItem = function (id: string): void {
            menuModule.closeSecondary(id)
        }

        return {
            activeId,
            goPath,
            closeItem
        }
	}
});
</script>

<style scoped>
.menu-item {
    position: relative;
    height: 60px;
    text-align: left;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
}
.menu-item p {
    line-height: 24px;
    width: 100%;
}
.menu-item span {
    font-size: 12px;
    line-height: 16px;
}
.menu-item.active {
    background: #cecece;
}
.menu-item .close {
    position: absolute;
    top: 15px;
    right: 15px;
    font-size: 12px;
    width: 12px;
    height: 12px;
}
.menu-item .close:hover {
    color: #1890ff;
}

</style>