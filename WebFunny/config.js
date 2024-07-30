import { BarChartOutline, BugOutline, FileTrayFullOutline } from '@vicons/ionicons5'
import { renderIcon } from './src/utils/renderIcon.js'

const categoryConfig = [
    {
        label: '首页',
        key: 'homePage',
        icon: renderIcon(BarChartOutline),
		route: '/main',  
    },
    {
        label: '概览',
        key: 'overView',
        icon: renderIcon(FileTrayFullOutline), 
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
        icon: renderIcon(BugOutline), 
        children: [
            {
                label: '代码错误',
                key: 'dmcw',
				route: '/jsError',
            },
            {
                label: '接口错误',
                key: 'jkcw',
				route: '/httpError',
            },
            {
                label: '静态资源错误',
                key: 'jtzy',
				route: '/resourceError',
            },
        ],
    },
];

export default categoryConfig;
