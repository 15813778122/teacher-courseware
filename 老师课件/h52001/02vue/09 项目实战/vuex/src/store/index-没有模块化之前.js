import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);



//new一个vuex实例，调用里面的Store方法。里面配置相关数据即可
export default new Vuex.Store({//V和S都是大写字母
  //类似vue里面的data，用于存数据的地方，公共的状态(数据)就放在这里
  //调用方式:this.$store.state.count(没有模块化) this.$store.state.home.count(有模块化，模块名字是home)
  state: {
    count: 1
  },

  //类似vue里面的计算属性computed,这里只有getter方法
  //调用方式：this.$store.getters.num
  getters: {
    desc(state) {
      if (state.count < 60 && state.count >= 0) {
        return '不及格'
      } else if (state.count >= 60 && state.count < 80) {
        return '良好'
      } else if (state.count >= 80 && state.count <= 100) {
        return '秀儿'
      };
    }
  },


  //类似我们vue里面的methods，存普通方法，这里的方法就是对state里面的状态进行增删改查
  //调用方式:this.$store.commit('方法名',payload)  payload是形参，只提供一个形参名(提交载荷)
  //常见用法：是在actions里面调用commit方法： context.commit('方法名') commit('方法名')
  //将count数量加1:传参：提交载荷
  //this.$store.commit('increment',5)
  mutations: {
    increment(state, n) {//state指的就是上面的state对象
      state.count += n;
    },
    //将count数量减1
    decrement(state) {
      state.count--;
    }
  },

  //类似vue里面的methods，存方法的，复杂逻辑或异步代码就写在这里，一般我们不会在组件直接调用commit方法来触发mutations里面的方法;而是同actions的方法来触发mutations方法，从而改变state
  //调用方式：this.$store.dispatch('方法名',payload)
  actions: {
    //this.$store.dispatch('addNum',5)
    addNum(context, n) {//context==store
      context.commit('increment', n);
    },

    //解构得到commit方法，就可以直接调用
    // cutNum({ commit, state }) {
    cutNum({ commit }) {
      commit('decrement');
      // console.log(state);
    }
  }
});
