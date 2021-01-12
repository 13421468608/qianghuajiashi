import type { FeatureList } from '@/common/interface/index'
/**
 * 图标
 */
import {
	FormOutlined,
	UnorderedListOutlined,
	AppstoreOutlined,
	CarryOutOutlined,
    OrderedListOutlined,
    ApartmentOutlined
} from '@ant-design/icons-vue';

export const baseMenu: Array<FeatureList> = [
    {
        icon: AppstoreOutlined,
        title: '首页',
        id: '0',
        path: '/dashboard'
    },
    {
        icon: FormOutlined,
        title: '添加商品',
        id: '1',
        path: '/addGoods'
    },
    {
        icon: UnorderedListOutlined,
        title: '商品列表',
        id: '2',
        path: '/listGoods'
    },
    {
        icon: CarryOutOutlined,
        title: '新建订单',
        id: '3',
        path: '/addOrders'
    },
    {
        icon: OrderedListOutlined,
        title: '订单列表',
        id: '4',
        path: '/listOrders'
    },
    {
        icon: ApartmentOutlined,
        title: '基础信息',
        id: '5',
        path: '/listBase'
    }
    
]