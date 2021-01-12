<template>
    <div class="fl header-dom">
        <div class="title">{{ selSecondaryMenu.title }}</div>
        <now-time class="time-dom"></now-time>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MenuModule from '@/module/menuModule'
import nowTime from '@/components/time.vue';

export default defineComponent({
    name: 'headerDom',
    components: { nowTime },
    setup() {
        const menuModule = MenuModule.getEntity()
        let selSecondaryMenu = menuModule.selSecondaryMenu
        return {
            selSecondaryMenu
        }
    }
});
</script>

<style scoped>
.header-dom {
    height: 100%;
}
.title {
    height: 100%;
    line-height: 30px;
    margin-right: auto;
}
.time-dom {
    height: 100%;
    line-height: 30px;
}
</style>