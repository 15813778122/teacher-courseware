<template>
  <div>
    <!-- 表单组件 -->
    <el-form
      ref="ruleForm"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top: 20px;"
    >
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="payType">
        <el-select v-model="searchMap.payType" placeholder="支付类型" style="width: 110px;">
          <el-option
            v-for="item in payTypeOptions"
            :key="item.type"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间" prop="birthday">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="出生日期"
            v-model="searchMap.birthday"
            style="width: 150px"
          ></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="success" @click="addMan">新增</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 表格数据渲染 
      stripe:斑马纹
      border：边框
    -->
    <el-table :data="tableData" style="width: 100%" height="600" stripe border>
      <el-table-column fixed type="index" label="序号" width="80"></el-table-column>
      <el-table-column fixed prop="cardNum" label="会员卡号" width="180"></el-table-column>
      <el-table-column prop="name" label="会员姓名" width="90"></el-table-column>
      <el-table-column prop="birthday" label="会员生日" width="120"></el-table-column>
      <el-table-column prop="phone" label="手机号码" width="130"></el-table-column>
      <el-table-column prop="integral" label="可用积分" width="90"></el-table-column>
      <el-table-column prop="money" label="开卡金额" width="90"></el-table-column>
      <el-table-column label="支付类型" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.payType | payTypeFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="会员地址" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <!-- 
      -每页多少条改变了，就触发这个方法handleSizeChange
      -当前页码发生改变，就触发handleCurrentChange方法
      current-page:当前页码
      page-size：一页多少条
      total：总条数
      layout：小元素
    -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <el-dialog :title="id ? '编辑会员' : '添加会员' " :visible.sync="dialogFormVisible" width="500px">
      <el-form
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
        :rules="rules"
      >
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="pojo.cardNum" />
        </el-form-item>
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="会员生日" prop="birthday">
          <el-date-picker v-model="pojo.birthday" type="date" placeholder="请点击选择" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="pojo.phone" />
        </el-form-item>
        <el-form-item label="开卡金额" prop="money">
          <el-input v-model="pojo.money" />
        </el-form-item>
        <el-form-item label="可用积分">
          <el-input v-model="pojo.integral"></el-input>
        </el-form-item>
        <el-form-item prop="payType" label="支付类型">
          <el-select v-model="pojo.payType" placeholder="支付类型" style="width: 110px;">
            <el-option
              v-for="item in payTypeOptions"
              :key="item.type"
              :label="item.name"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input v-model="pojo.address" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="id ? editMember(id) : addMember('pojoForm') ">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import memberApi from "@/api/member";
// 支付类型
const payTypeOptions = [
  { type: "1", name: "现金" },
  { type: "2", name: "微信" },
  { type: "3", name: "支付宝" },
  { type: "4", name: "银行卡" }
];

export default {
  data() {
    //自定义校验规则是写在data里面，但是写在return的外面的。规则写好，在rules里面引用
    var phoneCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error("手机号码不能为空"));
      } else if (!/1[3-9]\d{9}/.test(value)) {
        callback(new Error("请输入手机号码"));
      } else {
        callback();
      }
    };
    return {
      tableData: [], //列表数据
      currentPage: 1, //当前第1页
      pageSize: 10, //一页10条数据
      total: 0, //总条数
      searchMap: {
        //查询条件
        cardNum: "",
        name: "",
        payType: "",
        birthday: ""
      },
      dialogFormVisible: false, //对话框的显示和隐藏,false默认弹窗是隐藏的
      pojo: {
        //新增、编辑会员的数据
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: "",
        integral: "",
        payType: "",
        address: ""
      },
      payTypeOptions, //支付类型数据
      rules: {
        cardNum: [{ required: true, message: "请输入卡号", trigger: "blur" }],
        name: [{ required: true, message: "请输入卡号", trigger: "blur" }],
        phone: [{ validator: phoneCheck, trigger: "blur" }]
      },
      id: null
    };
  },

  components: {},

  methods: {
    //功能：点击查询的时候触发这里
    onSubmit() {
      console.log("点击查询按钮了");
      this.getSearch();
    },

    //功能：新增会员
    addMember(name) {
      // console.log("新增会员了");

      //如果表单的校验都通过了，才给发送请求
      this.$refs[name].validate(res => {
        // console.log(res);
        if (res) {
          //正则校验通过,发送ajax
          this.addUser();
        } else {
          //不通过
          this.$message({
            message: "数据不正确或不完整",
            type: "error"
          });
        }
      });
    },

    //功能：重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    //功能:发起请求，获取列表数据渲染
    async getdata() {
      try {
        let p = await memberApi.getlist();
        this.tableData = p.data.data;
      } catch (err) {
        console.log(err);
      }
    },

    //功能：编辑功能
    handleEdit(row) {
      //index：代表数组的下标，第n+1行
      //row:当前行数据,是一个对象
      // console.log(index, row);
      //1、需求1：对话框打开，就把当前行的内容渲染到弹窗表单里面(直接获取当前行数据row就可以渲染；拿到id值，发送ajax请求这条数据，再进行渲染)
      this.dialogFormVisible = true;
      // console.log(row);
      this.id = row.id;
      // console.log(this.id);
      //把当前行的数据，渲染到表单里面
      this.pojo = {
        //新增、编辑会员的数据
        cardNum: row.cardNum,
        name: row.name,
        birthday: row.birthday,
        phone: row.phone,
        money: row.money,
        integral: row.integral,
        payType: row.payType,
        address: row.address
      };
    },

    //功能：删除功能
    async handleDelete(row) {
      //index：代表数组的下标，第n+1行
      //row:当前行数据,是一个对象
      // console.log(index, row);
      try {
        let p = await memberApi.delMember(row.id);
        if (p.data.flag) {
          //删除成功
          this.$message({
            message: "删除成功啦",
            type: "success"
          });
          this.getSearch();
        } else {
          //删除失败
          this.$message({
            message: "删除失败啦",
            type: "error"
          });
        }
      } catch (err) {}
    },

    //功能：翻页的时候触发
    handleSizeChange(val) {
      this.pageSize = val; //假设：每页10条；如果在页面切换成20条，下次发生ajax，应该要20条数据
      this.getSearch();
    },

    //功能：当前页发生改变的时候触发
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSearch();
    },

    //功能：获取分页数据
    async getSearch() {
      try {
        //把要第几页、一页多少条、查询条件一并发给后端
        // console.log(this.searchMap);
        let p = await memberApi.search(
          this.currentPage,
          this.pageSize,
          this.searchMap
        );
        this.tableData = p.data.data.rows;

        //分页组件数据渲染
        this.total = p.data.data.total; //钟
      } catch (err) {
        console.log(err);
      }
    },

    //添加一个新会员
    async addUser() {
      try {
        let p = await memberApi.addMember(this.pojo);
        if (p.data.flag) {
          //新增成功
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.dialogFormVisible = false; //点击确认，关闭对话框
        } else {
          //新增失败
          this.$message({
            message: "添加失败",
            type: "error"
          });
        }
      } catch (err) {
        //ajax异常报错
        console.log("发送ajax失败", err);
      }
    },

    //功能：新增的时候，窗口打开之前，清除表单数据和校验提示
    addMan() {
      this.id = null;
      this.pojo = {
        //新增、编辑会员的数据
        cardNum: "",
        name: "",
        birthday: "",
        phone: "",
        money: "",
        integral: "",
        payType: "",
        address: ""
      };
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },

    //功能：编辑对话框里面的那个确定,这个确定是为了提交编辑后的数据
    async editMember(id) {
      // console.log(id);
      console.log("已经可以提交修改后的数据了");
      try {
        let p = await memberApi.putMember(id, this.pojo);
        if (p.data.flag) {
          //修改成功
          this.$message({
            message: "修改成功",
            type: "success"
          });

          this.dialogFormVisible = false;
        } else {
          //修改失败
          this.$message({
            message: "修改失败",
            type: "error"
          });
        }
      } catch (err) {
        console.log("发送失败");
      }
    }
  },
  created() {
    //进入页面就马上调取数据渲染
    // this.getdata();
    this.getSearch();
  },

  //局部过滤器的使用:在过滤器里面不能用this去查找到vm
  filters: {
    payTypeFilter(type) {
      //filter:返回满足条件的数组
      return payTypeOptions.filter(item => item.type == type)[0].name;
    }
  }
};
</script>

<style scoped>
</style>