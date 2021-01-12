<template>
	<module-header
		title="厂家"
		sub-title="厂家列表"
	>
		<div class="operation">
			<a-button type="primary" @click="showFactoryModal('新增')">新增</a-button>
		</div>
		<a-table
			:columns="factoryColumns"
			:data-source="factoryList"
			:scroll="{ x: 580, y: 800 }"
			rowKey="id" size="small"
		>
			<template #action="{ record }">
				<a-button type="primary" class="table-action action-buttom" size="small"
					@click="updataFactory(record)">
					修改
				</a-button>
				<a-button class="action-buttom" @click="deleteFactory(record)" size="small">删除</a-button>
			</template>
		</a-table>
	</module-header>

    <a-modal
        class="factory-modal"
        width="300px"
		:title="`${factoryTitlt}厂家`"
		cancelText="取消"
		okText="确认"
		v-model:visible="factoryVisible"
		:confirm-loading="factoryConfirmLoading"
		@cancel="factoryModalCancel"
		@ok="factoryModalOk"
	>
		<a-form layout="horizontal"
			ref="factoryRef"
			:model="factoryFrom"
			:rules="rules"
		>
			<a-form-item name="factoryName">
				<a-input class="factory-input" v-model:value="factoryFrom.factoryName"
					placeholder="请输入厂家名称">
				</a-input>
                <a-input class="factory-input" v-model:value="factoryFrom.factoryPhone"
					placeholder="请输入厂家号码">
				</a-input>
                <a-input class="factory-input" v-model:value="factoryFrom.position"
					placeholder="请输入厂家位置">
				</a-input>
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted, createVNode } from 'vue'
import GoodModule from '@/module/goodModule'
import { message, Modal } from 'ant-design-vue'
import { Factory, FactoryFrom } from '@/common/interface/index'

import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    name: 'FactoryDom',
    setup() {
        const goodModule = GoodModule.getEntity()
        const factoryList = goodModule.factoryList

        async function init() {
			await goodModule.getFactoryList()
		}

		onMounted(init)

        const factoryColumns: Ref<Array<any>> = ref([
            { title: '厂家名称', dataIndex: 'factoryName', key: 'factoryName' },
            { title: '号码', dataIndex: 'factoryPhone', key: 'factoryPhone' },
            { title: '位置', dataIndex: 'position', key: 'position' },
            { title: '修改时间', width: 200, dataIndex: 'updated_at', key: 'updated_at' },
			{ title: '操作', width: 180, dataIndex: 'action', key: 'action', fixed: 'right', slots: { customRender: 'action' } },
        ])

        let factoryVisible: Ref<boolean> = ref(false)
        let factoryTitlt: Ref<string> = ref('新增')
		let factoryConfirmLoading: Ref<boolean> = ref(false)
        let factoryRef: Ref<any | null> = ref(null)
        let updataId: string = ''
        let rules = ref({
			spaceName: [
				{ required: true, message: '请输入厂家名称', trigger: 'blur' }
			]
		})
		let factoryFrom: Ref<FactoryFrom> = ref({
            factoryName: '',
            factoryPhone: '',
            position: ''
		})

        function showFactoryModal(title: string) {
			factoryTitlt.value = title
			factoryVisible.value = true
        }
        
        async function factoryModalOk() {
			factoryConfirmLoading.value = true
			try {
				await factoryRef.value.validate()
				if (!updataId) await goodModule.addFactory(factoryFrom.value); // 新增
				else await goodModule.updataFactory(updataId, factoryFrom.value); // 修改
				// 刷新数据
				await init()
                factoryVisible.value = false
                factoryFrom.value = {
					factoryName: '',
                    factoryPhone: '',
                    position: ''
				}
				message.success(`${factoryTitlt.value}成功`)
			} catch(e) {
				console.log(e)
			}
			updataId = ''
			factoryConfirmLoading.value = false
        }
        
        function factoryModalCancel() {
			factoryTitlt.value = ''
			updataId = ''
			factoryVisible.value = false
        }
        
        function updataFactory(record: Factory) {
			factoryFrom.value = {
                factoryName: record.factoryName,
                factoryPhone: record.factoryPhone,
                position: record.position
			}
			updataId = record.id
			showFactoryModal('修改')
        }
        
        function deleteFactory(record: Factory) {
			Modal.confirm({
				title: `确定删除厂家：${record.factoryName}`,
				icon: createVNode(ExclamationCircleOutlined),
				content: '删除之后不可还原',
				okText: '确认',
				okType: 'danger',
				cancelText: '取消',
				onOk: async () => {
					try {
						await goodModule.deleteFactory(record.id)
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
            factoryColumns,
            factoryList,
            factoryVisible,
            factoryTitlt,
            factoryConfirmLoading,
            factoryRef,
            factoryFrom,
            showFactoryModal,
            rules,
            factoryModalCancel,
            factoryModalOk,
            updataFactory,
            deleteFactory
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
.factory-modal .ant-form-item {
    margin-bottom: 0 !important;
}
.factory-input {
    width: 252px;
}
.action-buttom {
	font-size: 12px;
}
</style>