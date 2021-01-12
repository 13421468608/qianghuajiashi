import { reactive, ref } from 'vue'
import { useRouter } from "vue-router";
// import getUUid from '@/common/method/uuid'
import deepClone from '@/common/method/deepClone'
import { baseMenu } from '@/common/base'

// 类型
import type { Ref } from 'vue'
import type { FeatureList } from '@/common/interface/index'

/**
 * 菜单模块
 */
export default class MenuModule {
    constructor() {
        // this.goPath(this.mainMenu[5])
    }

    public showLock: Ref<boolean> = ref(false)

    public isInit: boolean = true

    /**
     * MenuModule 实例对象
     */
    static entity:MenuModule | null = null 
    /**
     * 获取单例
     */
    static getEntity(): MenuModule {
        if (MenuModule.entity === null) {
            MenuModule.entity = new MenuModule()
        }
        return MenuModule.entity
    }

    private router = useRouter(); // vue 路由

    public mainMenu: Array<FeatureList> = reactive(baseMenu)        // 主菜单列表

    public secondaryMenu: Array<FeatureList> = reactive([])         // 二级菜单列表

    public selSecondaryMenu: Ref<FeatureList> = ref({ icon: '', title: '', id: '-1', path: '' })         // 当前选中的二级菜单

    public secondaryMenuId: Ref<string> = ref('')                   // 当前选中的二级菜单Id

    /**
     * 主菜单点击
     * @param item 菜单对象
     */
    public goPath (item: FeatureList): void {
        // 一级菜单是唯一的，需要检索一下是否已经打开了
        if (this.secondaryMenu.map(i => i.id).indexOf(item.id) >= 0) {
            this.secondaryGoPath(item)
        } else {
            let data: FeatureList = deepClone(item)
            // 将菜单加入二级列表
            this.secondaryMenu.push(data);
            localStorage.setItem('secondaryMenu', JSON.stringify(this.secondaryMenu))
            // 执行点击
            this.secondaryGoPath(data)
        }
    }

    /**
     * 二级菜单点击
     * @param item 菜单对象
     */
    public secondaryGoPath (item: FeatureList): void {
        localStorage.setItem('selSecondaryMenu', JSON.stringify(item))
        localStorage.setItem('secondaryMenuId', item.id)
        this.secondaryMenuId.value = item.id
        this.selSecondaryMenu.value = item
        this.router.push(`${item.path}`);
    }

    /**
     * 移除菜单
     * @param id 要删除的菜单ID
     */
    public closeSecondary (id: string) {
        const index: number = this.secondaryMenu.findIndex(secondary => {
            return secondary && secondary.id === id
        })

        this.secondaryMenu.splice(index, 1); // 删除选中项

        if (this.secondaryMenu.length !== 0) {
            if (this.secondaryMenuId.value === id) {
                this.secondaryGoPath(this.secondaryMenu[0])
            }
        } else {
            this.selSecondaryMenu.value = {
                icon: '',
                title: '',
                id: '-1',
                path: '/index'
            }
            this.secondaryMenuId.value = ''
            this.router.push('/index');
            
            localStorage.setItem('selSecondaryMenu', JSON.stringify({
                icon: '',
                title: '',
                id: '-1',
                path: '/index'
            }))
            localStorage.setItem('secondaryMenuId', '')
        }
        localStorage.setItem('secondaryMenu', JSON.stringify(this.secondaryMenu))
    }

    /**
     * 本地缓存获取二级菜单列表
     */
    getMenuStorage() {
        if (this.isInit) {
            this.isInit = false
            const secondaryMenu = JSON.parse(localStorage.getItem('secondaryMenu') || '[]')
            const selSecondaryMenu = JSON.parse(localStorage.getItem('selSecondaryMenu') || "{\"icon\":\"\",\"title\":\"\",\"id\":\"-1\",\"path\":\"/index\"}")
            const secondaryMenuId = localStorage.getItem('secondaryMenuId') || ''
            
            this.secondaryMenu.push(...secondaryMenu)
            this.selSecondaryMenu.value = selSecondaryMenu
            this.secondaryMenuId.value = secondaryMenuId

            if (secondaryMenuId !== '') {
                this.secondaryGoPath(selSecondaryMenu)
            }
        }
    }
}