/**
 * 商品类型模块
 */
import { Ref, ref } from 'vue'
import {
    Good, GoodFrom,
    GoodType, GoodTypeFrom,
    GoodSpecs, GoodSpecsFrom,
    Factory, FactoryFrom,
} from '@/common/interface/index'
import { AjaxResponse, Page } from '@/common/interface/server'
import { SERVER_NAME } from '@/common/enum/module'
import server from '@/server/baseServer'
import goodServer from '@/server/goodServer'

export default class GoodTypeModule {
    /**
     * GoodTypeModule 实例对象
     */
    static entity:GoodTypeModule | null = null 
    /**
     * 获取单例
     */
    static getEntity(): GoodTypeModule {
        if (GoodTypeModule.entity === null) {
            GoodTypeModule.entity = new GoodTypeModule()
        }
        return GoodTypeModule.entity
    }

    /**
     * 商品
     */
    public goodList: Ref<Good[]> = ref([])

    public async getGoodList({ pageNum, pageSize }: Page) {
        const ajaxResponse: AjaxResponse<Good[]> = await goodServer.http<Good[]>(SERVER_NAME.GOOD_LIST, { pageNum, pageSize })
        this.goodList.value = ajaxResponse.data
        return ajaxResponse.data
    }

    public async addGood(goodFrom: GoodFrom) {
        await goodServer.http<Good[]>(SERVER_NAME.ADD_GOOD, goodFrom)
    }

    public async updataGood(id: string, goodFrom: GoodFrom) {
        await goodServer.http<Good[]>(SERVER_NAME.UPDATA_GOOD, { id, ...goodFrom })
    }

    public async deleteGood(id: string) {
        await goodServer.http<Good[]>(SERVER_NAME.DELETE_GOOD, { id })
    }

    /**
     * 商品类型
     */
    public goodTypeList: Ref<GoodType[]> = ref([])

    public async getGoodTypeList() {
        const ajaxResponse: AjaxResponse<GoodType[]> = await server.http<GoodType[]>(SERVER_NAME.GOODTYPE_LIST)
        this.goodTypeList.value = ajaxResponse.data
        return ajaxResponse.data
    }

    public async addGoodType({ typeName, goodSpecs }: GoodTypeFrom) {
        await server.http<GoodType[]>(SERVER_NAME.ADD_GOODTYPE, {
            typeName,
            goodSpecs: goodSpecs.join(',')
        })
    }

    public async updataGoodType(id: string, { typeName, goodSpecs }: GoodTypeFrom) {
        await server.http<GoodType[]>(SERVER_NAME.UPDATA_GOODTYPE, { id, ...{
            typeName,
            goodSpecs: goodSpecs.join(',')
        } })
    }

    public async deleteGoodType(id: string) {
        await server.http<GoodType[]>(SERVER_NAME.DELETE_GOODTYPE, { id })
    }

    /**
     * 规格
     */
    public goodSpecsList: Ref<GoodSpecs[]> = ref([])

    public async getGoodSpecsList() {
        const ajaxResponse: AjaxResponse<GoodSpecs[]> = await server.http<GoodSpecs[]>(SERVER_NAME.GOODSPECS_LIST)
        this.goodSpecsList.value = ajaxResponse.data
        return ajaxResponse.data
    }

    public async addGoodSpecs(goodSpecsFrom: GoodSpecsFrom) {
        await server.http<GoodSpecs[]>(SERVER_NAME.ADD_GOODSPECS, goodSpecsFrom)
    }

    public async updataGoodSpecs(id: string, goodSpecsFrom: GoodSpecsFrom) {
        await server.http<GoodSpecs[]>(SERVER_NAME.UPDATA_GOODSPECS, { id, ...goodSpecsFrom })
    }

    public async deleteGoodSpecs(id: string) {
        await server.http<GoodSpecs[]>(SERVER_NAME.DELETE_GOODSPECS, { id })
    }


    /**
     * 厂家
     */
    public factoryList: Ref<Factory[]> = ref([])

    public async getFactoryList() {
        const ajaxResponse: AjaxResponse<Factory[]> = await server.http<Factory[]>(SERVER_NAME.FACTORY_LIST)
        this.factoryList.value = ajaxResponse.data
        return ajaxResponse.data
    }

    public async addFactory(factoryFrom: FactoryFrom) {
        await server.http<Factory[]>(SERVER_NAME.ADD_FACTORY, factoryFrom)
    }

    public async updataFactory(id: string, factoryFrom: FactoryFrom) {
        await server.http<Factory[]>(SERVER_NAME.UPDATA_FACTORY, { id, ...factoryFrom })
    }

    public async deleteFactory(id: string) {
        await server.http<Factory[]>(SERVER_NAME.DELETE_FACTORY, { id })
    }
}