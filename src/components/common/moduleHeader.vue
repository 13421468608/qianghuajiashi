<template>
    <a-page-header
		class="page-header"
		:title="title"
		:sub-title="subTitle"
        @click.stop="isOpen = !isOpen"
	>
        <CaretUpFilled class="herder-icon" v-show="isOpen" @click.stop="isOpen = false"/>
        <CaretDownFilled class="herder-icon" v-show="!isOpen" @click.stop="isOpen = true"/>
    </a-page-header>
    <transition name="slide-fade">
        <div class="content" v-show="isOpen">
            <slot></slot>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'

import {
    CaretDownFilled,
    CaretUpFilled
} from '@ant-design/icons-vue'
export default defineComponent({
    name: 'ModuleHeader',
    components: {
		CaretDownFilled,
        CaretUpFilled
    },
    props: {
        title: {
            type: String,
            default: '标题'
        },
        subTitle: {
            type: String,
            default: '副标题'
        }
    },
    setup() {
        let isOpen:Ref<boolean> = ref(false)
        return {
            isOpen
        }
    }
});
</script>

<style scoped>
.page-header {
	padding: 15px 0;
}
.herder-icon {
    position: absolute;
    top: 21px;
    right: 10px;
    font-size: 22px;
    line-height: 22px;
}
.herder-icon:hover {
    color: #1890ff;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>