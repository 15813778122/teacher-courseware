<template>
  <div class="login_form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form">
      <h1 class="title">金丰会员管理系统</h1>
      <el-form-item label="账号:" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
      </el-form-item>
    </el-form>
    <ul>
      <li>666</li>
    </ul>
  </div>
</template>

<script>
import loginApi from "@/api/login";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入账号", trigger: "blur" }]
      }
    };
  },

  components: {},

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        // console.log(valid);
        if (valid) {
          //正则验证通过
          //发送请求：把账号和密码提交到后端
          //   alert("submit!");
          // this.checkLogin();
          //调用actions的方法，进行登陆
          try {
            //第一个请求：
            let p = await this.$store.dispatch("Login", this.ruleForm);
            // console.log(p, 567);
            if (p.flag) {
              //第二个请求：第一个请求成功了，才能发送第二个请求
              //发送请求，获取用户信息
              let res = await this.$store.dispatch("GetUserInfo");
              // console.log(p, 123);
              if (res.flag) {
                //成功跳转到首页
                this.$router.push("/home");
              }
            }
          } catch (err) {
            console.log(err);
          }

          // console.log(p);
        } else {
          //失败：输入信息不对
          console.log("error submit!!");
          return false;
        }
      });
    }
    // async checkLogin() {
    //   try {
    //     let p = await loginApi.loginIn(
    //       this.ruleForm.name,
    //       this.ruleForm.password
    //     );
    //     // console.log(p.data);
    //     if (p.data.flag) {
    //       //验证通过，把 token 发送给后端，获取用户信息
    //       //   alert("验证成功");
    //       //   console.log(p.data.data.token);
    //       this.checkToken(p.data.data.token); //实参
    //     } else {
    //       //验证失败
    //       //   alert("验证失败");
    //       this.$message.error("用户名或密码错误");
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
    // async checkToken(token) {
    //   try {
    //     let p = await loginApi.getUserInf(token);
    //     // console.log(p.data);
    //     if (p.data.flag) {
    //       //   alert("登陆成功");
    //       //跳转到首页并且把token和用户名存储到本地存储localstorage
    //       //存储数据到本地
    //       this.$message("登陆成功");
    //       localStorage.setItem("jinfeng-mms-username", p.data.data.name);
    //       localStorage.setItem("jinfeng-mms-token", token);
    //       this.$router.push("/");

    //     } else {
    //       //   alert("登陆失败");
    //       this.$message.error("登陆失败");
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  }
};
/* @import "~@/assets/css/login.css"; */
</script>

<style scoped>
@import "~@/assets/css/login.css";
</style>