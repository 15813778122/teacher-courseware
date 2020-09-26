let appTop = {
  template: `<div>
  
    <slot name="aa"></slot>
    <slot></slot>
    <div class="row placeholders">
    <!--第四步：找到页面需要使用数据的地方，调用props里面接收到的数据即可，记得就是用这个属性名来渲染 -->
      <div class="col-xs-6 col-sm-3 placeholder" v-for="(item, index) in likes" :key="item.id">
        <img src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" width="200"
          height="200" class="img-responsive" alt="Generic placeholder thumbnail">
        <h4>{{ item.title }}</h4>
        <!--传递方法3：来到需要调用方法的地方，绑定事件，绑定方法(不能和传入方法名同名)-->
        <span class="text-muted"><a @click="remove(index)">删除</a></span>
      </div>
    </div></div>`,
  //第三步：到子组件，用props接收父组件的数据，记得这里的名字就是刚才设置的自定义属性名
  props: ['likes', 'deleLike'],
  methods: {
    //传递方法4：在子组件的方法里面，去调用父组件的方法，并且还可以往父组件传值(子组件->父组件传数据)
    remove(index) {
      // console.log(index);
      this.deleLike(index);
    }
  }
  // props: {
  //     likes: Array
  // }
  // props: {
  //     likes: {
  //         type: Array,
  //         required: false,
  //         default: ['11', '22', '33', '44']//
  //     }
  // }
}