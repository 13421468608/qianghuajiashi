<template>
	<card style="padding: 20px 10px;">
		<a-form
			ref="goodRef"
			:model="goodFrom"
			:rules="rules"
			:label-col="labelCol"
			:wrapper-col="wrapperCol"
		>
			<a-form-item ref="goodName" label="家私名称" name="goodName">
				<a-input v-model:value="goodFrom.goodName" placeholder="请输入家私名称"/>
			</a-form-item>

			<a-form-item label="商品类型" name="goodTypeId">
				<a-select v-model:value="goodFrom.goodTypeId" placeholder="请选择商品类型">
					<a-select-option :value="0" disabled>请选择商品类型</a-select-option>
					<a-select-option :value="item.id" v-for="item in goodTypeList" :key="item.id">{{ item.typeName }}</a-select-option>
				</a-select>
			</a-form-item>

			<a-form-item label="商品规格" name="goodSpecsId">
				<a-select v-model:value="goodFrom.goodSpecsId" placeholder="请选择商品规格">
					<a-select-option :value="0" disabled>请选择商品规格</a-select-option>
					<a-select-option :value="item.id" v-for="item in goodSpecsList" :key="item.id">{{ item.specsName }}</a-select-option>
				</a-select>
			</a-form-item>

			<a-form-item ref="price" label="售价" name="price">
				<a-input v-model:value="goodFrom.price" placeholder="请输入价格（元）"/>
			</a-form-item>

			<a-form-item ref="factoryId" label="厂家" name="factoryId">
				<a-select v-model:value="goodFrom.factoryId" placeholder="请选择厂家">
					<a-select-option :value="0" disabled>请选择厂家</a-select-option>
					<a-select-option :value="item.id" v-for="item in factoryList" :key="item.id">{{ item.factoryName }}</a-select-option>
				</a-select>
			</a-form-item>

			<a-form-item ref="buyingPrice" label="进货价" name="buyingPrice">
				<a-input v-model:value="goodFrom.buyingPrice" placeholder="请输入价格（元）"/>
			</a-form-item>

			<a-form-item label="商品说明" name="explain">
				<a-textarea v-model:value="goodFrom.explain" />
			</a-form-item>

			<a-form-item label="商品图片" name="image">
				<a-textarea v-model:value="goodFrom.image" />
			</a-form-item>
			
			<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
				<a-button type="primary" @click="onSubmit">
					创建商品
				</a-button>
				<a-button style="margin-left: 10px;" @click="resetForm">
					重置
				</a-button>
			</a-form-item>
		</a-form>
	</card>
</template>


<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import GoodModule from '@/module/goodModule'

import { GoodFrom } from '@/common/interface/index'
import { message } from 'ant-design-vue'

export default defineComponent({
	name: 'addGoods',
	data() {
		return {
			labelCol: { span: 4 },
			wrapperCol: { span: 12 },
		};
	},
	setup() {
		const goodModule = GoodModule.getEntity()
		const goodTypeList = goodModule.goodTypeList
		// let goodSpecsList: Ref<GoodSpecs[]> = ref([])
		const goodSpecsList = goodModule.goodSpecsList
		const factoryList = goodModule.factoryList

		let goodLoading: Ref<boolean> = ref(false)
		let goodRef: Ref<any | null> = ref(null)


		if (factoryList.value.length === 0) {
			goodModule.getFactoryList()
		}

		if (goodTypeList.value.length === 0) {
			goodModule.getGoodTypeList()
		}

		if (goodSpecsList.value.length === 0) {
			goodModule.getGoodSpecsList()
		}


		let rules = ref({
			goodName: [
				{ required: true, message: '请输入家私名称', trigger: 'blur' }
			],
			buyingPrice: [
				{ required: true, message: '请输入进货价', trigger: 'blur' },
				{ min: 1, max: 9, message: '价格不合理', trigger: 'blur' },
			],
			price: [
				{ required: true, message: '请输入售价', trigger: 'blur' },
				{ min: 1, max: 9, message: '价格不合理', trigger: 'blur' },
			],
			goodTypeId: [{ required: true, type: 'number', message: '请选择商品类型', trigger: 'change' }],
			goodSpecsId: [{ required: true, type: 'number', message: '请选择商品规格', trigger: 'change' }]
		})

		let goodFrom: Ref<GoodFrom> = ref({
			goodName: '',
			goodTypeId: 0,
			goodSpecsId: 0,
			factoryId: 0,
			price: '',
			buyingPrice: '',
			explain: '',
			image: ''
		})

		async function onSubmit() {
			console.log(goodFrom.value)
			goodLoading.value = true
			try {
				await goodRef.value.validate()
				await goodModule.addGood(goodFrom.value) // 新增
				goodFrom.value = {
					goodName: '',
					goodTypeId: 0,
					goodSpecsId: 0,
					factoryId: 0,
					price: '',
					buyingPrice: '',
					explain: '',
					image: ''
				}
				message.success(`新增成功`)
			} catch(e) {
				console.log(e)
			}
			goodLoading.value = false
		}

		function resetForm() {
			
		}
		
		return {
			rules,
			goodFrom,
			onSubmit,
			resetForm,
			goodTypeList,
			goodSpecsList,
			factoryList,
			goodRef,
			goodLoading
		}
	}
});
</script>

<style scoped>
#description {
	height: 200px;
}
</style>