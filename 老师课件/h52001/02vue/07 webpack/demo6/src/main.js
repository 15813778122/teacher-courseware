//借助完整版的vue就可以编译模板：编译器和运行时功能
// import Vue from 'vue/dist/vue';//写成绝对路径,会自动帮你去node_modules里面找
import Vue from 'vue';//写成绝对路径,会自动帮你去node_modules里面找
import App from './App.vue';//子组件

new Vue({//root根组件
    // el: '#app',
    // template: '<App />',//template是不具备编译功能，是借助vue里面内置的rander函数(编译器)来编译的
    // render: function (h) { //用render直接渲染模板，而且如果你渲染某个组件，就是默认把该组件做成子组件
    //     return h(App)
    // }
    // components: {
    //     App
    // }
    render: h => h(App)
}).$mount('#app');
