<template>
  <div class="about">
    <h1>count:{{ $store.state.count }}</h1>
    <template v-if="list.length">
      <ul v-for="item in list" :key="item.id">
        <li>{{ item.name }}</li>
      </ul>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },

  created() {
    //发送ajax获取数据放到data里面
    //bug1:因为挂载数据，比ajax还要快，所有根本就还没有数据可以渲染，就会报错  name xxx is not defined
    //bug2：v-if 和 v-for放在一起用
    getlist().then(res => {
      this.list = res.data;
    });
  }
};
</script>