;(function () {
    // 组件模板中，必须包含有且只有一个根元素
    const template = `<div id="#app">
            <!--头部导航区域-->
            <app-navbar></app-navbar>
        
        <!--核心区域:分左右两边-->
            <div class="container-fluid">
            <div class="row">
            
            <!--左边菜单栏区域-->
            <app-leaf></app-leaf>
            
            <!--右边主页面区域: 分上下两个区域
                <app-home>
                    <h1 slot="dashboard" class="page-header">{{title}}</h1>
                </app-home>
                -->
                <!--配置路由渲染组件出口-->
                <keep-alive>
                    <router-view>
                        <h1 slot="dashboard" class="page-header">{{title}}</h1>
                    </router-view>
                </keep-alive>
            </div>
            </div>
    </div>
    `

    window.App = {
        template,
        data () {
            return {
                title: '仪表盘'
            }
        },
        components: {
            AppNavbar, // 等价于 AppNavbar: AppNavbar
            AppLeaf, // AppLeaf: AppLeaf
            AppHome
        } 
    }
})()