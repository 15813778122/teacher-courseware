let Tech = {
    template: `<!--科技栏目-->
    <div>
        <ul>
            <li v-for="(item, index) in list">
                <span>{{ index + 1}}-{{ item.title }} </span>
                <button class="btn  btn-default btn-xs" @click="pushTo(item.id)">查看(Push)</button>&nbsp;
                <button class="btn btn-default btn-xs">查看(replace)</button>
            </li>
            <input type="button" @click="goback" value="后退" />
        </ul>
        <!--详情:设置渲染出口-->
        <router-view></router-view>
    </div>	`,
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getdata() {
            try {
                let res = await axios.get('./db/tech.json');
                this.list = res.data;
            } catch (err) {
                console.log(err);
            }
        },
        pushTo(id) {
            //跳转到某个组件上
            /*
                * 打算用编程式导航实现跳转 this.$router 路由器
                    * push() 跳转到某个组件上;又去有回
                    * replace() 跳转到某个组件上,不被history管理，所有跳转不回上一页,有去无回
                    * go(2) 返回或前进个路由；正数：前进，负数：后退
                    * back() 后退一步
                    * forward() 前进一步
                * 接收相关参数  this.$route 代表当前路由
            */

            //push()直接用路径，实现跳转
            // this.$router.push('/news/tech/detail/1');
            // this.$router.push({ name: 'techDetail', params: { index: 1 } });
            // this.$router.push('/news/tech/detail?index=1');
            this.$router.push({ path: '/news/tech/detail', query: { index: id } })

            //push()用对象的方式，实现跳转，用path跳转
            // this.$router.push({ path: '/news/tech/detail/1' });

            //push()用对象的方式，实现跳转，用name跳转 techDetail
            // this.$router.push({ name: 'techDetail' });


        },
        goback() {
            this.$router.back();
        }
    },
    created() {
        //发起ajax请求
        this.getdata();
    }
}