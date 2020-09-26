<template>
  <div>
    <!-- 查询表单 -->
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px;">
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" v-if="!isshow" placeholder="商品名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code" v-if="!isshow" placeholder="商品编号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input v-model="searchMap.supplierName" placeholder="供应商" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button type="primary" icon="el-icon-search" v-if="!isshow" @click="handleAdd">新增</el-button>
        <el-button @click="resetForm()" v-if="!isshow">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <el-table
      :data="list"
      height="380"
      border
      style="width: 100%"
      highlight-current-row
      @current-change="handleChange"
    >
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="供应商名称" width="250"></el-table-column>
      <el-table-column prop="linkman" label="联系人" width="120"></el-table-column>
      <el-table-column prop="mobile" label="联系电话" width="180"></el-table-column>
      <el-table-column prop="remark" label="备注" width="350"></el-table-column>
      <el-table-column label="操作" width="250" v-if="!isshow">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页，添加在div里面 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      :layout="!isshow ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'"
      :total="total"
    ></el-pagination>

    <!-- 对话框 -->
    <el-dialog
      v-if="!isshow"
      :title="pojo.id == null ? '新增供应商' : '编辑供应商'"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-form
        :rules="rules"
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
        v-if="pojo.name"
      >
        <el-form-item label="供应商名称" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="联系人" prop="linkman">
          <el-input v-model="pojo.linkman" />
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="pojo.mobile" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="pojo.remark"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入地址"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="pojo.id == null ? addData('pojoForm'): updateData('pojoForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import supplierApi from "@/api/supplier";

export default {
  props: {
    // 接收父组件传递过来 的数据,通过isDialog来判断 是否为弹框
    // 如果为 true, 则是弹框, false 就是列表
    isshow: Boolean
  },
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页, 默认第1页
      pageSize: 10, // 每页显示条数， 10条
      searchMap: {
        // 条件查询的绑定字段值
        name: "",
        linkman: "",
        mobile: ""
      },
      dialogFormVisible: false, //对话框的开关，false就是隐藏
      rules: {
        //表单正则
        name: [
          { required: true, message: "供应商名称不能为空", trigger: "blur" }
        ],
        linkman: [
          { required: true, message: "联系人不能为空", trigger: "blur" }
        ]
      },
      pojo: {
        //新增的时候提交给后端的数据
        id: null,
        name: "",
        linkman: "",
        mobile: "",
        remark: ""
      }
    };
  },

  components: {},

  methods: {
    //功能：分页查询获取列表数据渲染
    fetchData() {
      supplierApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const reqs = response.data;
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
          // console.log(this.list);
        });
    },

    //功能：编辑功能
    handleEdit(id) {
      // console.log("编辑");
      // 重用打开新增窗口方法, 不要少了 this
      this.handleAdd();
      // 查询数据
      supplierApi.getById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },

    //功能：每页显示多少条发生改变就触发这里
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },

    //功能：当前页码发生改变就触发这里
    handleCurrentChange(val) {
      this.$nextTick(() => {
        this.currentPage = val;
        this.fetchData();
      });
    },

    // 功能：表单重置
    // 在 el-form-item 标签属性 prop 上, 指定了字段名, 重置才会生效
    resetForm() {
      // this.$refs[formName].resetFields();
      // this.$refs.searchForm.resetFields();
      this.$refs["searchForm"].resetFields();
    },

    // 功能：新增供应商，点击新增按钮,打开对话框

    handleAdd() {
      //打开对话框
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },

    //功能：新增供应商：点击了确定按钮，提交数据的地方
    addData(formName) {
      // this.$refs[formName].validate(valid => {
      this.$refs.pojoForm.validate(valid => {
        if (valid) {
          // 验证通过，提交添加；发送ajax真正的提交数据
          // alert("Add submit!");
          supplierApi.add(this.pojo).then(response => {
            const resp = response.data;
            if (resp) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              // 验证不通过
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          // 验证不通过
          return false;
        }
      });
    },

    //功能：更新供应商
    updateData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，提交添加
          supplierApi.update(this.pojo).then(response => {
            const resp = response.data;
            if (resp.flag) {
              this.fetchData();
              this.dialogFormVisible = false;
            } else {
              // 验证不通过
              this.$message({
                message: resp.message,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },

    //功能：删除id为xx的供应商
    handleDelete(id) {
      // console.log("删除", id);
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认
          supplierApi.deleteById(id).then(response => {
            const resp = response.data;
            //提示信息
            this.$message({
              type: resp.flag ? "success" : "error",
              message: resp.message
            });
            if (resp.flag) {
              // 删除成功，刷新列表
              this.fetchData();
            }
          });
        })
        .catch(() => {
          // 取消删除，不理会
        });
    },

    //功能：在商品管理模块，选择供应商的时候触发
    handleChange(currentRow) {
      // console.log(currentRow);
      //点击某一行，就拿到这行的数据，发送给父组件，这里用到自定义事件
      this.$emit("option-supplier", currentRow);
    }
  },
  // 钩子函数获取数据
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
</style>