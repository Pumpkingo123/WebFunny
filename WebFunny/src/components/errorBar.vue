<script setup>
import categoryConfig from '../config/navConfig';
import { useMenuStore } from '../stores/menuStore';

const menuStore = useMenuStore();
const indicatorRef = ref(null);
const errorConfig = categoryConfig.find(config => config.key === 'error');
const activeConfig = ref(errorConfig.children.find(child => child.key === menuStore.activeItem));
const activeKey = ref(null);

// 更新指示器位置的函数
const updateIndicatorPosition = (element) => {
	const rect = element.getBoundingClientRect();
	const parentRect = element.parentElement.getBoundingClientRect();
	const newLeft = rect.left - parentRect.left;
	indicatorRef.value.style.left = `${newLeft}px`;
	indicatorRef.value.style.width = `${rect.width}px`;
};

const handleMenuChange = (key, event) => {
	activeKey.value = key;
	updateIndicatorPosition(event.target);
};

onMounted(async () => {
    activeKey.value = activeConfig.value.barItems[0].key;
	await nextTick();
	const defaultTab = document.querySelector('.active-tab');
	if (defaultTab) {
		indicatorRef.value.style.transition = 'none';
		updateIndicatorPosition(defaultTab);
		indicatorRef.value.style.transition = 'left 0.3s ease, width 0.3s ease';
	}
});
</script>

<template>
	<div class="rounded-cs w-full h-2 bg-white relative">
		<div class="border-b-0.5 border-b-black-500 h-1.5">
			<div v-for="item in activeConfig.barItems"
				:class="[
					'inline-block text-ssm text-center cursor-pointer mt-[4px] mr-1.5 ml-[3px] relative',
					{ 'text-orange-500 active-tab': item.key === activeKey },
				]"
				@click="handleMenuChange(item.key, $event)"
			>
				{{ item.label }}
			</div>
			<span
				ref="indicatorRef"
				class="absolute top-[13px] left-0 h-[0.8px] bg-orange-500"
				style="transition: left 0.3s ease, width 0.3s ease;"
			></span>
		</div>
	</div>
</template>
