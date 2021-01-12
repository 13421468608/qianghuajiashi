import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { formatTime } from '../common/method/formatTime';
import { TIME_TYPE } from '../common/enum/module'

interface TimeModuleReturn {
    fmtTime: ComputedRef<string>;
    destroy: () => void;
}

interface TimeModuleArg {
    type: TIME_TYPE;
    number: number;
    callBack: () => void;
}

interface Timing<T> { [key: number]: T; }

/**
 * 时间模块
 * @param arg 定时器回调函数， 清理定时器使用函数抛出的 destroy 方法
 */
export default function timeModule(arg?: TimeModuleArg):TimeModuleReturn {
    let time:Ref<Date> = ref(new Date())
    
    let timing:Timing<TIME_TYPE> = {}
    timing[TIME_TYPE.HOUR] = 0
    timing[TIME_TYPE.MIN] = 0
    timing[TIME_TYPE.SECOND] = 0

    let interval:number = setInterval(() => {
        time.value = new Date()
        
        if (arg && arg.type) {
            timing[arg.type] += 1
            if (timing[arg.type] >= arg.type * arg.number) {
                arg.callBack()
                timing[arg.type] = 0
            }
        }
    }, 1000)

    const fmtTime: ComputedRef<string> = computed((): string => {
        return formatTime(time.value)
    })

    function destroy () {
        clearInterval(interval)
        interval = 0
    }

    return {
        fmtTime,
        destroy
    }
}