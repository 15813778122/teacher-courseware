let appMenu = {
  template: `<div class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
      <!-- <li class="active"><a href="#">首页</a></li>
      <li><a href="#">新闻管理</a></li>
      <li><a href="#">关于我</a></li> -->
      <!--设置页面的跳转 设置exact为了精确匹配路径-->
      <router-link to="/" tag="li" exact>
        <a>首页</a>
      </router-link>
      <router-link to="/news" tag="li">
        <a>新闻管理</a>
      </router-link>
      <router-link to="/mine" tag="li">
        <a>关于我</a>
      </router-link>
    </ul>
    
  </div>`
}