<template>
	<module-header
		title="商品类型"
		sub-title="可以在这里管理商品类型，并设置每个类型的规格"
	>
		<div class="operation">
			<a-button type="primary" @click="showGoodTypeModal('新增')">新增</a-button>
		</div>
		<a-table
			:columns="goodTypeColumns"
			:data-source="goodTypeList"
			:scroll="{ x: 900, y: 800 }"
			rowKey="id" size="small"
		>
			<template #action="{ record }">
				<a-button class="action-buttom table-action" type="primary" size="small"
					@click="updataGoodType(record)">
					修改
				</a-button>
				<a-button class="action-buttom" @click="deleteGoodType(record)" size="small">删除</a-button>
			</template>
		</a-table>
	</module-header>
	
	<a-modal
		:title="`${goodTypeTitlt}商品类型`"
		width="300px"
		cancelText="取消"
		okText="确认"
		v-model:visible="goodTypeVisible"
		:confirm-loading="goodTypeConfirmLoading"
		@cancel="goodTypeModalCancel"
		@ok="goodTypeModalOk"
	>
		<a-form layout="horizontal"
			ref="goodTypeRef"
			:model="goodTypeFrom"
			:rules="rules"
		>
			<a-form-item name="typeName">
				<a-input class="good-type-input" v-model:value="goodTypeFrom.typeName"
					placeholder="请输入类型名称">
				</a-input>
			</a-form-item>
			<a-form-item name="goodSpecs">
				<!-- <a-input class="good-type-input" v-model:value="goodTypeFrom.goodSpecs"
					type="text" placeholder="请输入规格">
				</a-input> -->
				<a-select
					class="good-type-input"
					mode="multiple"
					v-model:value="goodTypeFrom.goodSpecs"
					placeholder="请选择规格"
				>
					<a-select-option v-for="i in goodSpecsList" :key="i.id" :value="i.specsName">
						{{ i.specsName }}
					</a-select-option>
				</a-select>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref, createVNode } from 'vue';
import GoodModule from '@/module/goodModule'
import { message, Modal } from 'ant-design-vue'

import { GoodType, GoodTypeFrom } from '@/common/interface/index'

import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
	name: 'GoodTypeDom',
	setup() {
		/**
		 * 商品类型
		 */
		const goodModule = GoodModule.getEntity()
		const goodTypeList = goodModule.goodTypeList
		const goodSpecsList = goodModule.goodSpecsList
		
		async function init() {
			await goodModule.getGoodTypeList()
		}

		onMounted(init)
		
		const goodTypeColumns: Ref<Array<any>> = ref([
			{ title: '商品类型', dataIndex: 'typeName', key: 'typeName' },
			{ title: '规格', dataIndex: 'goodSpecs', key: 'goodSpecs' },
			{ title: '修改时间', dataIndex: 'updated_at', key: 'updated_at' },
			{ title: '操作', width: 180, dataIndex: 'action', key: 'action', fixed: 'right', slots: { customRender: 'action' } },
		])

		let goodTypeVisible: Ref<boolean> = ref(false)
		let goodTypeConfirmLoading: Ref<boolean> = ref(false)
		let goodTypeRef: Ref<any | null> = ref(null)
		let goodTypeTitlt: Ref<string> = ref('新增')
		let updataId: string = ''
		let goodTypeFrom: Ref<GoodTypeFrom> = ref({
			typeName: '',
			goodSpecs: []
		})
		let rules = ref({
			typeName: [
				{ required: true, message: '请输入类型名称', trigger: 'blur' }
			]
		})
		async function goodTypeModalOk() {
			goodTypeConfirmLoading.value = true
			try {
				await goodTypeRef.value.validate()
				if (!updataId) await goodModule.addGoodType(goodTypeFrom.value) // 新增
				else await goodModule.updataGoodType(updataId, goodTypeFrom.value) // 修改
				// 刷新数据
				await init()
				updataId = ''
				goodTypeVisible.value = false
				goodTypeFrom.value = {
					typeName: '',
					goodSpecs: []
				}
				message.success(`${goodTypeTitlt.value}成功`)
			} catch(e) {
				console.log(e)
			}
			goodTypeConfirmLoading.value = false
		}

		function showGoodTypeModal(title: string) {
			goodTypeTitlt.value = title
			goodTypeVisible.value = true
		}

		function goodTypeModalCancel() {
			goodTypeTitlt.value = ''
			goodTypeFrom.value = {
				typeName: '',
				goodSpecs: []
			}
			updataId = ''
			goodTypeVisible.value = false
		}

		function deleteGoodType(record: GoodType) {
			Modal.confirm({
				title: `确定删除类型：${record.typeName}`,
				icon: createVNode(ExclamationCircleOutlined),
				content: '删除之后不可还原',
				okText: '确认',
				okType: 'danger',
				cancelText: '取消',
				onOk: async () => {
					try {
						await goodModule.deleteGoodType(record.id)
						// 刷新数据
						await init()
						message.success('已删除')
					} catch(e) {
						console.log(e)
					}
				}
			});
		}

		function updataGoodType(record: GoodType) {
			goodTypeFrom.value = {
				typeName: record.typeName,
				goodSpecs: record.goodSpecs.split(',')
			}
			updataId = record.id
			showGoodTypeModal('修改')
		}
		
		return {
			goodTypeColumns,
			goodTypeList,
			goodSpecsList,
			goodTypeVisible,
			goodTypeConfirmLoading,
			goodTypeModalOk,
			showGoodTypeModal,
			goodTypeTitlt,
			goodTypeFrom,
			rules,
			goodTypeRef,
			deleteGoodType,
			updataGoodType,
			goodTypeModalCancel
		}
	}
});
</script>

<style scoped>
.table-action {
	margin-right: 10px;
}
.operation {
	margin-bottom: 15px;
}
.good-type-input {
	width: 252px;
}
.action-buttom {
	font-size: 12px;
}
</style>