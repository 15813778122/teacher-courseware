let sportDetail = {
    template: `<div class="jumbotron">
                <h2>{{ id }}</h2>
                <h2>{{ str.title }}</h2>
                <p>{{ str.content }}</p>
            </div>`,
    data() {
        return {
            id: '',
            str: ''
        }
    },
    methods: {
        async getdata() {
            this.id = this.$route.params.id;//获取动态路由后面的值
            try {
                let res = await axios.get('./db/sport.json');
                let arr = res.data;
                // console.log(arr);
                this.str = arr.filter(item => item.id == this.id)[0]; //[{}]
            } catch (err) {
                console.log(err);
            }
        }
    },
    created() {
        this.getdata();
    },
    watch: {
        //this.$route 代表当前路由，记得要监听路由的变化，然后重新获取id，再通过id查找不同的数据进行渲染
        '$route': function () {
            // console.log(this.$route);
            this.getdata();
        }
    }
}