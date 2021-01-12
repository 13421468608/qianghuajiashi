<template>
    <div class="illustration">
        <img :src="image">
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import type { Ref } from 'vue';

import man1 from '@/assets/Illustration/man1.svg';
import man2 from '@/assets/Illustration/man1.svg';
import man3 from '@/assets/Illustration/man1.svg';
import man4 from '@/assets/Illustration/man1.svg';
import girl1 from '@/assets/Illustration/girl1.svg';
import girl2 from '@/assets/Illustration/girl2.svg';
import girl3 from '@/assets/Illustration/girl3.svg';
import huaHui from '@/assets/Illustration/huaHui.svg';
import kaFei from '@/assets/Illustration/kaFei.svg';
import qingLvHeCha from '@/assets/Illustration/qingLvHeCha.svg';

import timeModule from '@/module/timeModule';
import { TIME_TYPE } from '@/common/enum/module'

export default defineComponent({
    name: 'Illustration',
    setup() {
        const illustrationList: Array<any> = [man1, man2, man3, man4, girl1, girl2, girl3, huaHui, kaFei, qingLvHeCha]
        let num: Ref<number>  = ref(Math.floor(Math.random() * illustrationList.length + 1))

        // 设置倒计时 1 分钟
        timeModule({
            type: TIME_TYPE.MIN,
            number: 1,
            callBack: (): void => {
                num.value = Math.floor(Math.random() * illustrationList.length + 1)
            }
        })

        let image: any = computed(() => {
            return illustrationList[num.value]
        })

        return {
            image
        }
    }
});
</script>

<style scoped>
.illustration {
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
    width: 100vw;
    height: 100vh;
    pointer-events: none;
    z-index: 2;
    opacity: 0.1;
}
.illustration img {
    position: absolute;
    bottom: 30px;
    right: 30px;
    max-width: 50%;
    max-height: 50%;
}
</style>