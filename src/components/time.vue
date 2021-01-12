<template>
    <span>{{ fmtTime }}</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import timeModule from '@/module/timeModule';

export default defineComponent({
    name: 'nowTime',
    setup() {
        const { fmtTime } = timeModule()

        return {
            fmtTime
        }
    },
    
});
</script>