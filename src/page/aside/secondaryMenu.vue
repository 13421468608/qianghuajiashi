<template>
    <div class="menu-header">
        <a-input-search
            v-model:value="searchValue"
            placeholder="全局搜索"
            style="width: 100%"
            @search="onSearch"
            :loading="searchLoading"
        />
    </div>
    <a-divider/>
	<div class="menu-list" v-if="menuList.length !== 0">
        <menu-item v-for="(item, index) in menuList" :key="item.id"
            :last-index="index + 1 === menuList.length"
            :menuData="item"
        ></menu-item>
        <a-divider/>
    </div>
    <a-result v-else sub-title="请先选择左侧菜单～">
        <template #icon>
            <img class="waixingren" src="@/assets/menu/waixinren.svg">
        </template>
        <template #extra>
            <a-button type="primary">
                搜索
            </a-button>
        </template>
    </a-result>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Ref } from 'vue';
import MenuModule from '@/module/menuModule'

import menuItem from './menuItem.vue';

import timeModule from '@/module/timeModule';
import { TIME_TYPE } from '@/common/enum/module'

export default defineComponent({
	name: 'SecondaryMenu',
	components: {
        menuItem
    },
	setup() {
        const menuModule = MenuModule.getEntity()
        const menuList = menuModule.secondaryMenu
        
        menuModule.getMenuStorage()

        let searchValue: Ref<string> = ref('')
        let searchLoading: Ref<boolean> = ref(false)

        function onSearch(value: string) {
            console.log('use value', value);
            console.log('or use this.value', searchValue.value);
            searchLoading.value = true

            const { destroy: searchDestroy } = timeModule({
                type: TIME_TYPE.SECOND,
                number: 2,
                callBack: (): void => {
                    searchLoading.value = false
                    searchDestroy()
                }
            })
            
        }

		return {
            menuList,
            onSearch,
            searchValue,
            searchLoading
        }
	}
});
</script>

<style scoped>
.menu-header {
    height: 60px;
	padding: 15px;
    text-align: left;
}
.menu-header .time {
    font-size: 16px;
    line-height: 30px;
}
.menu-list {
    height: auto;
    max-height: calc(100% - 60px);
    overflow: auto;
}
.ant-result-info .ant-result-icon > .waixingren {
    width: 120px;
}
</style>