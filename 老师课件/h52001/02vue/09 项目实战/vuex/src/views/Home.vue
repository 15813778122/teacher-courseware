<template>
  <div class="home">
    <!-- <h2>state里面的count(未用模块前) ： {{ $store.state.count }}</h2> -->
    <h2>state里面的count(启用模块后) ： {{ $store.state.home.count }}</h2>
    <h2>getters里面的desc ： {{ $store.getters.desc }}</h2>
    <p>
      <input type="button" value="加数量" @click="add" />
    </p>
    <p>
      <input type="button" value="减数量" @click="cut" />
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      // num: this.$store.state.count
    };
  },

  methods: {
    add() {
      // console.log(666);
      // 通过commit 调用 mutations 中的 increment 改变状态值
      // this.$store.commit("increment", 5);//一般在组件里面不要直接调用commit方法，而是把该功能写在actions里面。我们调用actions里面的方法即可
      // this.$store.dispatch("addNum", 5);
      this.$store.dispatch("addNum", { n: 5, m: 6 });
    },

    cut() {
      // this.$store.commit("decrement");
      this.$store.dispatch("cutNum");
    }
  }
};
</script>
