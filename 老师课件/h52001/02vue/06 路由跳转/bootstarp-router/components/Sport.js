
let Sport = {
    template: `<!--体育栏目-->
    <div>
        <ul>
            <li v-for="(item, index) in sportList">
                <!--<a href="#">{{ item.title }}</a>-->
                <router-link :to="'/news/sport/detail/' + item.id ">
                    {{ item.title }}
                </router-link>
            </li>
        </ul>
        <!--详情 设置路由出口-->
        <router-view></router-view>
    </div> `,
    data() {
        return {
            sportList: []
        }
    },
    methods: {
        async getdata() {
            try {
                let res = await axios.get('./db/sport.json');
                console.log(res);
                this.sportList = res.data;//把请求到的数据设置到属性里面
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getdata();//发送请求
    }
}