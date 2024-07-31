<script setup>
import barConfig from '../config/barConfig';
import { useMenuStore } from '../stores/menuStore';

const menuStore = useMenuStore();
const activeKey = ref(barConfig.dmcw[0].key);
const indicatorRef = ref(null);
const activeConfig = ref(barConfig[menuStore.activeItem]);

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

onMounted(() => {
	const defaultTab = document.querySelector('.active-tab');
	console.log('11',menuStore.activeItem)
	if (defaultTab) {
		indicatorRef.value.style.transition = 'none';
		updateIndicatorPosition(defaultTab);
		getComputedStyle(indicatorRef.value).left;
		indicatorRef.value.style.transition = 'left 0.3s ease, width 0.3s ease';
	}
});
</script>

<template>
	<div class="rounded-cs w-full h-2 bg-white relative">
		<div class="border-b-0.5 border-b-black-500 h-1.5">
			<div v-for="item in activeConfig"
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
