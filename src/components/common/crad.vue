<template>
    <div class="card">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Crad',
    setup() {
        
        return {}
    }
});
</script>

<style scoped>
    .card {
        background-color: #FFFFFF;
        width: auto;
        height: auto;
        padding: 0 10px;
        margin-bottom: 20px;
        border-radius: 10px;
    }
    .card:last-child {
        margin-bottom: 0px;
    }
</style>