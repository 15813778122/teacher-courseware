new Vue({//root根组件
    template: '<app></app>',//写了template。就会用模板直接取代<div id="app"></div>
    el: '#app',//template模板的优先级比el模板优先级要高
    components: {//2、注册组件，才能在body里面引用
        // 'app-head': appHead
        // 'appHead': appHead
        app
    },
    //将vuerouter路由器注入到vue实例里面，后期我们就可以在vue实例里面调用路由器的方法，实现路由跳转(编程式导航)
    router
})