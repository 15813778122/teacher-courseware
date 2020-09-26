import router from '@/router';
import loginApi from '@/api/login';
import store from "./store";//vuex存储库
/*
权限校验：
通过router路由前置钩子函数 beforeEach() ，
在跳转路由前进行拦截判断是否已经登录，
如果已登录，则进行路由跳转，如果没有则回到登录页
*/

/*
 前置路由钩子函数
 to ：即将要进入的目标路由对象
 from ：当前导航正要离开的路由对象
 next : 调用该方法，进入目标路由
*/
router.beforeEach(async (to, from, next) => {
    // console.log(to, from);
    // next();

    //1.即将进入的路由需不需要守卫
    if (to.path == '/login') {
        //是登陆页，不需要守卫(洗手间)
        next();//可以进入下一步，可以进入目标路由
    } else {
        //非登陆页，需要进行路由守卫==路由拦截
        //2.有没有token(听课证)
        // let token = localStorage.getItem('jinfeng-mms-token');
        let token = store.state.user.token;
        if (token == null || token == '') {
            //没有token(没有听课证)
            next('/login');//跳转到登陆页
        } else {
            //有token(有听课证)
            try {
                let p = await store.dispatch('GetUserInfo');
                if (p.flag) {
                    //验证token，通过
                    next();
                } else {
                    next('/login');
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
});