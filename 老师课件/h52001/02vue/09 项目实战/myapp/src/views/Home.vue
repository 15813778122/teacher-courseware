<template>
  <div class="home">
    <h1>发送请求</h1>
    <input type="button" value="验证用户名" @click="check" />
    <br />
    <input type="button" value="注册" @click="regbtn" />
    <br />
    <input type="button" value="修改密码" @click="changePsw" />
  </div>
</template>

<script>
import userApi from "@/api/login";

export default {
  name: "Home",
  components: {},
  methods: {
    async check() {
      try {
        let p = await userApi.checkname("李彬77");
        console.log(p.data);
      } catch (err) {}
    },
    async regbtn() {
      try {
        let p = await userApi.reg("杨超越", "66666");
        console.log(p.data);
      } catch (err) {}
    },
    async changePsw() {
      try {
        let p = await userApi.editPsw({ psw: 9999 }, 104);
        console.log(p.data);
      } catch (err) {}
    }
  }
};
</script>
