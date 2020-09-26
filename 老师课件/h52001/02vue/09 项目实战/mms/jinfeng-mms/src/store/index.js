import Vue from "vue";
import Vuex from "vuex";
//引入子模块
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({//store
  modules: {//添加子模块
    user
  }
});
