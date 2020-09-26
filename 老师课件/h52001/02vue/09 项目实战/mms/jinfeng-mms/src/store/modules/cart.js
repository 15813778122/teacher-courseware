//购物车

export default {
    state: {
        //在购物车组件渲染：this.$store.state.cart.cartList
        cartList: []//购物车列表
    },

    mutations: {
        //初始化本地数据
        init(state, data) {
            //初始化数据
            state.cartList = data;
        },

        //添加一个商品到本地
        addGood(state, obj) {
            state.cartList.push(obj);
        },

        //删除一个本地商品数据
        delGood(state, id) {
            state.cartList = state.cartList.filter(item => item.id != id);
        },

        //修改本地商品数据
        putGood(id) {

        },

        //获取一个商品数据
        getGood(id) {

        }
    },

    actions: {
        //发送ajax获取购物车数据列表
        getList({ commit, state }) {
            getCartList.then(rep => {
                commit('init', rep.data);
            })
        },

        //删除id为5的商品
        delItem({ commit, state }, id) {
            delGod(id).then(rep => {//ajax是删除数据库的数据
                if (rep.flag) {
                    commit('delGood', id);//删除state的数据
                }
            });
        },

        //添加新数据
        addItem({ commit, state }, obj) {
            addGod(obj).then(rep => {//发送ajax添加一条新的订单到订单表
                if (rep.flag) {
                    //添加成功
                    commit('addGood', obj);
                }
            })
        }
    }
}