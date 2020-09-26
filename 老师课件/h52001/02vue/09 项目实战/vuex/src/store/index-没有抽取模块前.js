import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const home = {
  //类似vue里面的data，用于存数据的地方，公共的状态(数据)就放在这里
  state: {
    count: 1
  },

  //类似vue里面的计算属性computed,这里只有getter方法
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
  mutations: {
    //将count数量加1:传参：提交载荷
    //this.$store.commit('increment',5)
    increment(state, n) {//state指的就是上面的state对象
      state.count += n;
    },
    //将count数量减1
    decrement(state) {
      state.count--;
    }
  },

  //类似vue里面的methods，存方法的，复杂逻辑或异步代码就写在这里，一般我们不会在组件直接调用commit方法来触发mutations里面的方法;而是同actions的方法来触发mutations方法，从而改变state
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
}

const user = {
  state: {},
  getters: {},
  mutatins: {},
  actions: {}
}

//new一个vuex实例，调用里面的Store方法。里面配置相关数据即可
export default new Vuex.Store({//V和S都是大写字母
  //vuex的模块化
  modules: {
    home,
    user
  }
});
