let appBottom = {
  template: `<div><h2 class="sub-header">Section title</h2>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
            <th>Header</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in empList">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.salary }}</td>
            <!--自定义事件用法3:找到子组件需要调用父组件方法的地方，绑定事件，并触发自己的方法delMan -->
            <td @click="delMan(index)">删除</td>
            
          </tr>

        </tbody>
      </table>
    </div></div>`,
  props: ['empList', 'remove'],
  methods: {
    delMan(index) {
      // console.log(index);
      //自定义事件用法4:借用vm实例下的$emit方法来触发父组件的自定义事件
      this.$emit('remove', index);
    }
  }

}