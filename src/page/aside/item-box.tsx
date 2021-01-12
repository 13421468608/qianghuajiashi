import { defineComponent, reactive } from 'vue';
import type { PropType } from 'vue';
import type { FeatureList } from '@/common/interface/index'

import { Tooltip } from "ant-design-vue"
import { AppstoreOutlined } from '@ant-design/icons-vue';
import './aside.css'

export default defineComponent({
    props: {
        boxData: {
            type: Object as PropType<FeatureList>,
            default: {
                id: '-1',
                title: '首页',
                icon: AppstoreOutlined
            }
        },
    },
    components: { 
        ATooltip: Tooltip
    },
    setup(props) {

        function getPopupContainer(trigger:any):Element {
            return trigger.parentElement;
        }
        
        if (props && props.boxData) {
            let boxData:FeatureList = reactive(props.boxData)

            const content = <p class="aside-tooltip">{boxData.title}</p>

            return () => (
                <a-tooltip placement="top" title={content} get-popup-container={getPopupContainer} >
                    { <boxData.icon class="aside-icon" /> }
                </a-tooltip>
            )
        } else {
            return <></>
        }
    }
})
