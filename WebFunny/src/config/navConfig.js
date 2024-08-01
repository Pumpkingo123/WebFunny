import { BarChartOutline, BugOutline, FileTrayFullOutline } from '@vicons/ionicons5'
import { renderIcon } from '../utils/renderIcon.js'

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
                barItems: [
                    { label: '概览', key: 'dmgl' },
                    { label: '错误列表', key: 'cwlb' },
                    { label: '版本分析', key: 'bbfx' },
                    { label: '待错误处理', key: 'dcwcl' },
                    { label: '处理概览', key: 'clgl' },
                ]
            },
            {
                label: '接口错误',
                key: 'jkcw',
                route: '/httpError',
                barItems: [
                    { label: '概览', key: 'jkgl' },
                    { label: '接口请求报错', key: 'qqbc' },
                    { label: '版本分析', key: 'bbfx' },
                    { label: '待错误处理', key: 'dcwcl' },
                ]
            },
            {
                label: '静态资源错误',
                key: 'jtzy',
                route: '/resourceError',
                barItems: [
                    { label: '资源加载报错', key: 'jzbc' }
                ]
            },
        ],
    },
];

export default categoryConfig;

