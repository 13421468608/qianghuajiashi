<template>
	<module-header
		title="商品规格"
		sub-title="商品规格列表"
	>
		<div class="operation">
			<a-button type="primary" @click="showGoodSpecsModal('新增')">新增</a-button>
		</div>
		<a-table
			:columns="specsColumns"
			:data-source="goodSpecsList"
			:scroll="{ x: 580, y: 800 }"
			rowKey="id" size="small"
		>
			<template #action="{ record }">
				<a-button type="primary" class="table-action action-buttom" size="small"
					@click="updataGoodSpecs(record)">
					修改
				</a-button>
				<a-button class="action-buttom" @click="deleteGoodSpecs(record)" size="small">删除</a-button>
			</template>
		</a-table>
	</module-header>

    <a-modal
        class="good-specs-modal"
        width="300px"
		:title="`${goodSpecsTitlt}规格`"
		cancelText="取消"
		okText="确认"
		v-model:visible="goodSpecsVisible"
		:confirm-loading="goodSpecsConfirmLoading"
		@cancel="goodSpecsModalCancel"
		@ok="goodSpecsModalOk"
	>
		<a-form layout="horizontal"
			ref="goodSpecsRef"
			:model="goodSpecsFrom"
			:rules="rules"
		>
			<a-form-item name="specsName">
				<a-input class="good-specs-input" v-model:value="goodSpecsFrom.specsName"
					placeholder="请输入规格名称">
				</a-input>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted, createVNode } from 'vue'
import GoodModule from '@/module/goodModule'
import { message, Modal } from 'ant-design-vue'
import { GoodSpecs, GoodSpecsFrom } from '@/common/interface/index'

import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name: 'GoodSpecsDom',
    setup() {
        const goodModule = GoodModule.getEntity()
        const goodSpecsList = goodModule.goodSpecsList

        async function init() {
			await goodModule.getGoodSpecsList()
		}

		onMounted(init)

        const specsColumns: Ref<Array<any>> = ref([
            { title: '规格名称', dataIndex: 'specsName', key: 'specsName' },
            { title: '修改时间', width: 200, dataIndex: 'updated_at', key: 'updated_at' },
			{ title: '操作', width: 180, dataIndex: 'action', key: 'action', fixed: 'right', slots: { customRender: 'action' } },
        ])

        let goodSpecsVisible: Ref<boolean> = ref(false)
        let goodSpecsTitlt: Ref<string> = ref('新增')
		let goodSpecsConfirmLoading: Ref<boolean> = ref(false)
        let goodSpecsRef: Ref<any | null> = ref(null)
        let updataId: string = ''
        let rules = ref({
			spaceName: [
				{ required: true, message: '请输入规格名称', trigger: 'blur' }
			]
		})
		let goodSpecsFrom: Ref<GoodSpecsFrom> = ref({
			specsName: ''
		})

        function showGoodSpecsModal(title: string) {
			goodSpecsTitlt.value = title
			goodSpecsVisible.value = true
        }
        
        async function goodSpecsModalOk() {
			goodSpecsConfirmLoading.value = true
			try {
				await goodSpecsRef.value.validate()
				if (!updataId) await goodModule.addGoodSpecs(goodSpecsFrom.value); // 新增
				else await goodModule.updataGoodSpecs(updataId, goodSpecsFrom.value); // 修改
				// 刷新数据
				await init()
				goodSpecsVisible.value = false
				goodSpecsFrom.value = {
					specsName: ''
				}
				message.success(`${goodSpecsTitlt.value}成功`)
			} catch(e) {
				console.log(e)
			}
			updataId = ''
			goodSpecsConfirmLoading.value = false
        }
        
        function goodSpecsModalCancel() {
			goodSpecsTitlt.value = ''
			updataId = ''
			goodSpecsVisible.value = false
        }
        
        function updataGoodSpecs(record: GoodSpecs) {
			goodSpecsFrom.value = {
				specsName: record.specsName
			}
			updataId = record.id
			showGoodSpecsModal('修改')
        }
        
        function deleteGoodSpecs(record: GoodSpecs) {
			Modal.confirm({
				title: `确定删除规格：${record.specsName}`,
				icon: createVNode(ExclamationCircleOutlined),
				content: '删除之后不可还原',
				okText: '确认',
				okType: 'danger',
				cancelText: '取消',
				onOk: async () => {
					try {
						await goodModule.deleteGoodSpecs(record.id)
						// 刷新数据
						await init()
						message.success('已删除')
					} catch(e) {
						console.log(e)
					}
				}
			});
		}
        
        return {
            specsColumns,
            goodSpecsList,
            goodSpecsVisible,
            goodSpecsTitlt,
            goodSpecsConfirmLoading,
            goodSpecsRef,
            goodSpecsFrom,
            showGoodSpecsModal,
            rules,
            goodSpecsModalCancel,
            goodSpecsModalOk,
            updataGoodSpecs,
            deleteGoodSpecs
        }
    }
});
</script>

<style scoped>
.page-header {
	padding: 15px 0;
}
.table-action {
	margin-right: 10px;
}
.operation {
	margin-bottom: 15px;
}
.good-specs-modal .ant-form-item {
    margin-bottom: 0 !important;
}
.good-specs-input {
    width: 252px;
}
.action-buttom {
	font-size: 12px;
}
</style>