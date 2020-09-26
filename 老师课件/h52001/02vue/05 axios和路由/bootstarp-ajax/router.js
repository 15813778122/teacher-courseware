//第4步：创建路由实例，配置路由表，建议路径和子组件的关联
let router = new VueRouter({
    //设置高亮样式名,全局设置
    linkActiveClass: 'active',
    routes: [//配置路由规则
        {
            path: '/',//路径
            component: appMain //子组件名
        }, {
            path: '/goodlist',
            component: appNews
        }, {
            path: '/mine',
            component: appMine
        }
    ]
});

window.router = router;