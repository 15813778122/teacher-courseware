import Vue from "vue";
import VueRouter from "vue-router";
import Login from '@/views/login';//就相当于 ./src/views/login/index.vue ;如果你的组件名就是index.vue可以忽略不写
import Loyout from '@/views/Loyout';
//引入子组件
// 布局组件
import Home from '@/views/home'
import Member from '@/views/member'
import Supplier from '@/views/supplier'
import Goods from '@/views/goods'
import Staff from '@/views/staff'


Vue.use(VueRouter);
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}


//components:一般是放子组件(很小的、复用的组件；轮播图组件、按钮组件、头部组件、底部组件)
//views：路由引入的，大一点，页面组件，没有复用
//container：大一点的复用组件
// components(小组件) -> container(次组件) -> views(大组件)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login //路由用到的组件，我都统一放在views里面;
  }, {
    path: '/',
    name: 'loyout',
    component: Loyout, //路由用到的组件，我都统一放在views里面;
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {//元信息设置：显示面包屑文字；是否需要鉴权
          title: '首页'
        }
      }, {
        path: '/member',
        name: 'member',
        component: Member,
        meta: { title: '会员管理' }
      }, {
        path: '/supplier',
        name: 'supplier',
        component: Supplier,
        meta: { title: '供应商管理' }
      }, {
        path: '/goods',
        name: 'goods',
        component: Goods,
        meta: { title: '商品管理' }
      }, {
        path: '/staff',
        name: 'staff',
        component: Staff,
        meta: { title: '员工管理' }
      }
    ]
  }
];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});



export default router;