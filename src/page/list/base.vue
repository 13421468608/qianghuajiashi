<template>
	<card>
		<good-type></good-type>
	</card>
	<card>
		<good-specs></good-specs>
	</card>
	<card>
		<factory></factory>
	</card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import goodType from '@/components/goods/goodType.vue'
import goodSpecs from '@/components/goods/goodSpecs.vue'
import factory from '@/components/goods/factory.vue'
export default defineComponent({
	name: 'listBase',
	components: {
		goodType,
		goodSpecs,
		factory
	},
	setup() {
		

		return {}
	}
});
</script>

<style scoped>

</style>