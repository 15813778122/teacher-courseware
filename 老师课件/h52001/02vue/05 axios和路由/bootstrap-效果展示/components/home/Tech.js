;
(function () {
    const template = `  <!--科技栏目-->
    <div>
        <ul >
            <li v-for="tech in techArr" :key="tech.id">
                <span> {{ tech.title }} </span>
                <button @click="pushTech(tech.id)" class="btn  btn-default btn-xs">查看(Push)</button>&nbsp;
                <button @click="replaceTech(tech.id)"class="btn btn-default btn-xs">查看(replace)</button>
            </li>
            <button @click="$router.go(-1)">后退</button>
            <button @click="$router.go(1)">前进</button>
        </ul>
        <!--详情-->
        <router-view></router-view>
    </div>	`

    window.Tech = {
        template,

        data() {
            return {
                techArr: []
            }
        },
        created() {
            this.getTechArr()
        },

        methods: {

            pushTech(id) {
                // push 可后退回来
                this.$router.push(`/news/tech/detail/${id}`)
            },

            replaceTech(id) {
                // replace 不可后退回来
                this.$router.replace(`/news/tech/detail/${id}`)
            },

            getTechArr() {
                axios.get('./db/tech.json')
                    .then(response => {
                        this.techArr = response.data
                    })
                    .catch(error => {
                        alert(error.message)
                    })
            }
        },
    }
})()