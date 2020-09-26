<template>
  <div>
    <div class="header">
      <!-- 头部左侧Logo和标题 -->
      <a href="#/">
        <img class="logo" src="@/assets/img/logo.jpg" width="25px" />
        <span class="company">金丰会员管理系统</span>
      </a>
      <!-- 下拉菜单 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{name ? name + ' 欢迎你! ' : ''}}个人中心
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-s-fold" command="b">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        style="width: 400px;"
      >
        <el-form-item label="原密码" prop="oldPass">
          <el-input type="password" v-model="ruleForm.oldPass"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="$refs['ruleForm'].resetFields()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import logOut from "@/api/logout";
import passwordApi from "@/api/password";
export default {
  data() {
    //校验原密码
    const validateOldPass = (rule, value, callback) => {
      //value就是你表单传入的值，value存的是旧密码
      // alert(this.user.id)
      // const username = localStorage.getItem("jinfeng-mms-username");
      const username = this.$store.state.user.username;
      passwordApi.checkPwd(username, value).then(response => {
        const resp = response.data;
        if (resp.flag) {
          //验证通过
          callback();
        } else {
          callback(new Error(resp.message)); //错误提示
        }
      });
    };

    //密码和确认密码要一致
    const validatePass = (rule, value, callback) => {
      //value指的是确认密码
      if (value != this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      // name: localStorage.getItem("jinfeng-mms-username"),
      name: this.$store.state.user.username,
      dialogFormVisible: false, //弹窗的开关
      ruleForm: {
        //修改密码涉及的各项数据
        oldPass: "", //旧密码
        pass: "", //新密码
        checkPass: "" //确认密码
      },
      rules: {
        oldPass: [
          //旧密码
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { validator: validateOldPass, trigger: "blur" }
        ],
        pass: [{ required: true, message: "新密码不能为空", trigger: "blur" }], //新密码
        checkPass: [
          //确认密码
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: validatePass, trigger: "change" }
        ]
      } //表单验证规则
    };
  },

  components: {},

  methods: {
    //功能:点击退出功能，触发这里的代码
    async handleCommand(command) {
      // this.$message("你点击了：" + command);
      if (command == "a") {
        //修改密码
        this.handlePwd(); //修改密码的功能放在外面
      } else {
        //退出功能：清除本地token和用户名并跳回登陆页

        //发送请求
        // this.toOut();
        try {
          let p = await this.$store.dispatch("Logout");
          if (p.flag) {
            this.$message({
              message: "退出成功",
              type: "success"
            });

            this.$router.push("/login"); //退出成功
          } else {
            this.$message({
              message: "退出失败",
              type: "error"
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
    },

    //功能:退出功能，axios发送请求
    // async toOut() {
    //   //删除的ajax请求
    //   try {
    //     let token = localStorage.getItem("jinfeng-mms-token");
    //     let p = await logOut.loginOut(token);
    //     // console.log(p.data);
    //     if (p.data.flag) {
    //       //退出成功；就删除本地的登陆信息
    //       localStorage.removeItem("jinfeng-mms-username");
    //       localStorage.removeItem("jinfeng-mms-token");
    //       this.$router.push("/login");
    //     } else {
    //       //如果失败就弹窗提示
    //       this.$message({
    //         message: "退出失败",
    //         type: "error",
    //         duration: 1000
    //       });
    //     }
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    //功能：修改密码
    handlePwd() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },

    //功能：提交数据进行密码修改
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，提交添加
          passwordApi
            .updatePwd(this.name, this.ruleForm.checkPass)
            .then(response => {
              const resp = response.data;
              this.$message({
                message: resp.message,
                type: resp.flag ? "success" : "warning"
              });
              if (resp.flag) {
                // 修改成功, 清除本地数据, 重新登录
                this.toOut();
                // 关闭窗口
                this.dialogFormVisible = false;
              }
            });
        } else {
          // 验证不通过
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.logo {
  vertical-align: middle;
  /* 上 右 下 左 */
  padding: 0 10px 0 40px;
}
.company {
  position: absolute;
  color: white;
}
/* 下拉菜单 */
.el-dropdown {
  float: right;
  margin-right: 40px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
</style>