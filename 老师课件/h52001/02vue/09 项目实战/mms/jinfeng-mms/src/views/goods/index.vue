<template>
  <div>
    <!-- 查询条件 -->
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px;">
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="商品名称" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code" placeholder="商品编号" style="width: 200px;"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          readonly
          v-model="searchMap.supplierName"
          @click.native="change"
          placeholder="选择供应商"
          style="width: 200px;"
        ></el-input>
        <!-- 普通的节点直接绑定事件即可，但是如果是组件，记得要加上.native，否则事件无法绑定 <input type="text"  @click="change" /> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="fetchData">查询</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="handleAdd">新增</el-button>
        <el-button @click="$refs['searchForm'].resetFields()">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- 列表 -->
    <el-table :data="list" height="380" border style="width: 100%" highlight-current-row>
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="商品名称"></el-table-column>
      <el-table-column prop="code" label="商品编码"></el-table-column>
      <el-table-column prop="spec" label="商品规格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDele(scope.row.id)">删除</el-button>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 供应商弹窗 -->
    <el-dialog title="选择供应商" :visible.sync="dialogSupplierVisible" width="600px">
      <!-- 因为子组件很多的内容是我不需要展示的，所有需要传入一个布尔值去控制显示或隐藏；这里就涉及到父子组件通信，props方法:在父组件，绑定自定义属性，去到子组件用props接收 -->
      <supplier :isshow="true" @option-supplier="optionSupplier"></supplier>
    </el-dialog>

    <!-- 新增 or 编辑页面 -->
    <el-dialog title="商品编辑" :visible.sync="dialogFormVisible" width="500px">
      <el-form
        :rules="rules"
        status-icon
        ref="pojoForm"
        :model="pojo"
        label-width="100px"
        label-position="right"
        style="width: 400px;"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="商品编码" prop="code">
          <el-input v-model="pojo.code" />
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="pojo.spec" />
        </el-form-item>
        <el-form-item label="零售价" prop="retailPrice">
          <el-input v-model="pojo.retailPrice" />
        </el-form-item>
        <el-form-item label="进货价" prop="purchasePrice">
          <el-input v-model="pojo.purchasePrice" />
        </el-form-item>
        <el-form-item label="库存数量" prop="storageNum">
          <el-input v-model="pojo.storageNum" />
        </el-form-item>
        <el-form-item label="供应商" prop="supplierId">
          <el-input
            readonly
            @click.native="dialogSupplierVisible = true"
            v-model="pojo.supplierName"
            placeholder="选择供应商"
            style="width: 200px;"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="pojo.id === null ? addData('pojoForm'): updateData('pojoForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import goodsApi from "@/api/goods";
// Supplier 作为子组件
import Supplier from "@/views/supplier";
export default {
  data() {
    return {
      list: [],
      total: 0, // 总记录数
      currentPage: 1, // 当前页, 默认第1页
      pageSize: 10, // 每页显示条数， 10条
      searchMap: {
        // 条件查询绑定条件值
        name: "",
        code: "",
        supplierName: ""
      },
      dialogSupplierVisible: false, //供应商对话框
      pojo: {
        //新增的数据
        id: null,
        name: "",
        code: "",
        spec: "",
        retailPrice: 0.0,
        purchasePrice: 0.0,
        storageNum: 0,
        supplierName: "",
        supplierId: null
      },
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" }
        ],
        code: [
          { required: true, message: "商品编码不能为空", trigger: "blur" }
        ],
        retailPrice: [
          { required: true, message: "零售价不能为空", trigger: "blur" }
        ]
      },
      isEdit: false //如果是新增或编辑的对话框，就显示为true，如果为false：是查询条件里面的供应商
    };
  },

  components: { Supplier },

  methods: {
    //功能：ajax获取分页数据进行渲染
    fetchData() {
      goodsApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          const reqs = response.data;
          this.total = reqs.data.total;
          this.list = reqs.data.rows;
          //console.log(this.list)
        })
        .catch(err => {
          console.log(err);
          // if (err.code == 404) {
          //   //找不到该页面
          //   this.$router.push("/404");
          // }

          // if (err.code == 500) {
          //   //服务器异常
          //   this.$router.push("/500");
          // }
        });
    },

    //功能：每页多少条发生改变的时候触发这里
    handleSizeChange(val) {
      this.pageSize = val;
      this.fetchData();
    },

    //功能：当前页码发生改变触发这里
    handleCurrentChange(val) {
      this.currentPage = val;
      this.fetchData();
    },

    //功能：编辑功能
    handleEdit(id) {
      // console.log("编辑");
      this.isEdit = true;
      // 重用打开新增窗口方法, 不要少了 this
      this.handleAdd();
      // 查询数据
      goodsApi.getById(id).then(response => {
        const resp = response.data;
        if (resp.flag) {
          this.pojo = resp.data;
        }
      });
    },

    //功能：删除功能
    handleDele(id) {
      // console.log("删除");
      this.$confirm("确认删除这条记录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 确认
          goodsApi.deleteById(id).then(response => {
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

    //功能：重置
    resetForm() {},

    //功能：点击选择供应商表单的时候，打开对话框
    change() {
      // console.log("选择供应商", 666);
      // this.isEdit = false;
      this.dialogSupplierVisible = true;
    },

    //功能：用于接收子组件(供应商组件)传过来的数据
    optionSupplier(obj) {
      // console.log(obj, 111);
      // console.log(typeof obj);
      console.log(this.isEdit, 666);
      if (this.isEdit) {
        //为真：说明我在新增或编辑这里，打开的弹窗
        this.pojo.supplierName = obj.name;
        this.pojo.supplierId = obj.id;
        this.isEdit = true; //重置开关
      } else {
        this.searchMap.supplierName = obj.name;
        this.searchMap.supplierId = obj.id;
        this.isEdit = false; //重置开关
      }

      if (typeof obj == "object") {
        this.dialogSupplierVisible = false; //隐藏这个对话框
      }
    },

    // 功能：提交新增数据
    addData(formName) {
      this.isEdit = true; //重置开关
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，提交添加,发送ajax，提交商品数据(新增一个商品)
          // alert("Add submit!");

          goodsApi.add(this.pojo).then(response => {
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

    // 功能：打开新增窗口
    handleAdd() {
      this.isEdit = true; //新增的时候，把这个开关定为true
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        // this.$nextTick()它是一个异步事件，当渲染结束 之后 ，它的回调函数才会被执行
        // 弹出窗口打开之后 ，需要加载Dom, 就需要花费一点时间，我们就应该等待它加载完dom之后，再进行调用resetFields方法，重置表单和清除样式
        this.$refs["pojoForm"].resetFields();
      });
    },

    //功能：更新数据
    updateData(formName) {
      this.isEdit = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 验证通过，提交添加
          goodsApi.update(this.pojo).then(response => {
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
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
</style>