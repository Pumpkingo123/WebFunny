<script setup>
import categoryConfig from '../../config.js'
</script>

<template>
	<div class="fixed top-1.5 h-full">
			<n-layout class="h-full">
				<n-layout-sider :width="165" :native-scrollbar="false">
					<n-menu :options="categoryConfig" />
				</n-layout-sider>
			</n-layout>
	</div>
</template>
