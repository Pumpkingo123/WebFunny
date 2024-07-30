const categoryConfig = [
	{
		label: '首页',
		key: 'homePage',
	},
	{
		label: '概览',
		key: 'overView',
		children: [
			{
				label: '流量数据',
				key: 'llsj',
			},
			{
				label: '健康状况',
				key: 'jkzk',
			},
		],
	},
	{
		label: '错误',
		key: 'error',
		children: [
			{
				label: '代码错误',
				key: 'dmcw',
			},
			{
				label: '接口错误',
				key: 'jkcw',
			},
			{
				label: '静态资源错误',
				key: 'jtzy',
			},
		],
	},
];

export default categoryConfig;