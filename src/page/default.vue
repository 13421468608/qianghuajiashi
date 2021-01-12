<template>
    <a-result class="default-dom" sub-title="暂无内容">
        <template #icon>
            <img class="default-img" src="@/assets/default/no-data.svg">
        </template>
    </a-result>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'defaultDom',
    setup() {
        
        return {}
    }
});
</script>

<style scoped>
.default-dom {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    height: 200px;
    padding: 0;

}
.default-img {
    width: 120px;
}
</style>