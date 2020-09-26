/*
<div class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
      <li class="active">
      <a href="#/">首页
      
      </a></li>
      <li><a href="#/goodlist">新闻管理</a></li>
      <li><a href="#/mine">关于我</a></li>
    </ul>
  </div>
*/

let appMenu = {
  //第2步：修改menu菜单,配置路由跳转
  template: `<div class="col-sm-3 col-md-2 sidebar">
    <ul class="nav nav-sidebar">
     
        <router-link to="/" tag="li" exact>
          <a>首页</a>
        </router-link>
     
     
        <router-link to="/goodlist" tag="li" >
          <a>新闻管理</a>
        </router-link>
     
     
        <router-link to="/mine" tag="li" >
          <a>关于我</a>
        </router-link>
      
    </ul>
  </div>`
}