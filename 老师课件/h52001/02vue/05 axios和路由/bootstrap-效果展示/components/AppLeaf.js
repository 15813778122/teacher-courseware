;(function () {

    window.AppLeaf = {
        template: `<div class="col-sm-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
          <!--
          router-link 默认渲染出来的是 a 标签,
          如果需要让它渲染出来的 是别的标签,则可以使用 tag 属性指定渲染后的标签

          2. 可以在每个 router-link 上使用 active-class 来激活 CSS 类名 
          或者在 VueRouter 实例中,使用 linkActiveClass 全局配置 CSS 类名 

          3. exact 是精确匹配, 指定在哪个标签上,则这个标签的路径就不会被其他路径模糊匹配
          
          -->
            <router-link to="/" tag="li" exact>
              <a>首页</a>
            </router-link>

            <router-link to="/news" tag="li" >
              <a>新闻管理</a>
            </router-link>

            <router-link to="/about" tag="li" >
              <a>关于我们</a>
            </router-link>
         
        </ul>
      </div>`
    }

})()