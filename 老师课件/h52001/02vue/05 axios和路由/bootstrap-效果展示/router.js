;(function () {
    window.router = new VueRouter({
        // 全局配置 router-link 标签生成的 CSS 类名 
        linkActiveClass: 'active',
        routes: [
            {
                path: '/',
                component: AppHome
            },
            {
                path: '/news',
                component: News,
                children: [
                    {
                        // 当匹配到 /news/sport时,
                        // 组件 Sport 会被渲染在 News 组件中的 <router-view> 组件中
                        path: '/news/sport',
                        component: Sport,
                        children: [
                            {
                                path: '/news/sport/detail/:id' , // :id 是路径变量，占位符
                                component: SportDetail
                            }
                        ]
                    },
                    {
                        // 简写方式 ,等价于 /news/tech 路径, 前面不要有 / , 有 / 就是根路径 啦
                        path: 'tech',
                        component: Tech,
                        children: [
                            {
                                path: '/news/tech/detail/:id',
                                component: TechDetail
                            }
                        ]
                    },
                    {
                        // 默认选择的路径 : /news 后面没有子路径时, redirect 就是重写向到指定路径 下,即体育
                        path: '',
                        redirect: '/news/sport'
                    }
                ]
            },
            {
                path: '/about',
                component: About
            }
        ]
    })
})()