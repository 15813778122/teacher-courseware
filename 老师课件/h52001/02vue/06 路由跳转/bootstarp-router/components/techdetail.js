
let techDetail = {
    template: `<div class="jumbotron">
                    <h2>{{ content.title }}</h2>
                    <p>{{ content.content }}</p>
                </div>`,
    data() {
        return {
            index: '',
            content: ''
        }
    },
    methods: {
        async getlist() {
            let index = this.$route.query.index;
            try {
                let res = await axios.get('./db/tech.json');
                this.content = res.data.filter(item => item.id == index)[0];//[{}]
            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        /*
            那边是这样传数据：params数据刷新不在
                * this.$router.push('/news/tech/detail/1');
                * this.$router.push({ name: 'techDetail', params: { index: 1 } }); 如果用params传参，必须写成name跳转
                * 用 this.$route.params 接收数据
        */

        // this.index = this.$route.params.index;

        /*
            那边是这样传数据：query数据刷新后还在
                * this.$router.push('/news/tech/detail?index=1');
                * this.$router.push({ path: '/news/tech/detail', query: { index: 3 } })
        */
        // this.index = this.$route.query.index;
        // console.log(this.$route);
        this.getlist();
    },
    watch: {
        '$route': function (to, from) {//to:进入的组件(激活组件)；from:离开的组件(失活组件)
            // console.log(to);
            // console.log(from);
            this.getlist();
        }
    }
}