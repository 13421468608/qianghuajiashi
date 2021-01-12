<template>
    <card>
        <a-table
			:columns="goodColumns"
			:data-source="goodList"
			:scroll="{ x: 1200, y: 800 }"
			rowKey="id"
		>
            <template #goodType="{ record }">
                {{ record.goodType.typeName }}
            </template>
            <template #goodSpecs="{ record }">
                {{ record.goodSpecs.specsName }}
            </template>
            <template #factory="{ record }">
                {{ record.factory.factoryName }}
            </template>
			<template #action="{ record }">
				<a-button class="table-action" type="primary" size="small"
					@click="updataGood(record)">
					修改
				</a-button>
				<a-button @click="deleteGood(record)" size="small">删除</a-button>
			</template>
		</a-table>
    </card>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import GoodModule from '@/module/goodModule'

export default defineComponent({
    name: 'goodsList',
    setup() {
        const goodModule = GoodModule.getEntity()
        const goodList = goodModule.goodList
        let pageNum: Ref<number> = ref(1)
        let pageSize: Ref<number> = ref(20)
        goodModule.getGoodList({
            pageNum: pageNum.value,
            pageSize: pageSize.value
        })
        // id: number
        // goodName: string
        // goodTypeId: number
        // goodType: GoodType
        // goodSpecsId: number
        // goodSpecs: GoodSpecs
        // factoryId: number
        // factory: Factory
        // price: string
        // buyingPrice: string
        // explain: string
        // image: string
        // createdAt: string
        // updatedAt: string

        const goodColumns: Ref<Array<any>> = ref([
			{ title: '商品名称', dataIndex: 'goodName', key: 'goodName' },
			{ title: '商品类型', dataIndex: 'goodType', key: 'goodType', slots: { customRender: 'goodType' } },
			{ title: '商品规格', dataIndex: 'goodSpecs', key: 'goodSpecs', slots: { customRender: 'goodSpecs' } },
			{ title: '厂家', dataIndex: 'factory', key: 'factory', slots: { customRender: 'factory' } },
			{ title: '售价', dataIndex: 'price', key: 'price' },
            { title: '进货价', dataIndex: 'buyingPrice', key: 'buyingPrice' },
            { title: '商品说明', dataIndex: 'explain', key: 'explain' },
			{ title: '修改时间', dataIndex: 'updated_at', key: 'updated_at' },
			{ title: '操作', width: 180, dataIndex: 'action', key: 'action', fixed: 'right', slots: { customRender: 'action' } },
        ])
        
        function updataGood() {
            
        }
        
        function deleteGood() {
            
        }

        return {
            goodColumns,
            goodList,
            updataGood,
            deleteGood,
        }
    }
});
</script>

<style scoped>
.table-action {
	margin-right: 10px;
}
</style>