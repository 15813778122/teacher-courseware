(function () {
    //自调用

    /*
        * 输入内容回车就保存到本地：布置任务
        * 获取本地数据，渲染列表
        * 勾选复选框实现-选中效果(添加样式)：完成任务
        * 点击x删除当行
        * 点击clear清除全部任务
        * 路由的设置
        * 全选和全不选
        * 单选反控制全选
        * 双击编辑内容
        * 统计条数
    */


    //输入内容回车就保存到本地：布置任务
    let newTodo = document.querySelector('.new-todo');
    let todoList = document.querySelector('.todo-list');

    //获取本地存储的数据
    function getData(key) {//形参
        let arr = localStorage.getItem(key);//字符串
        if (arr) {
            //有数据
            arr = JSON.parse(arr);
        } else {
            arr = [];
        }
        return arr;
    }

    //存储到本地存储
    function setdata(key, val) {
        //计划存的数据结构：[{},{}]
        localStorage.setItem(key, JSON.stringify(val));
    }

    //1、存数据
    newTodo.onkeyup = ev => {
        //判断按下回车键
        if (ev.keyCode == 13) {
            // console.log(666);
            let val = newTodo.value;
            if (val.trim()) {
                //不为空，就可以存到本地存储
                let arr = getData('todomvc');//实参
                let obj = {
                    title: val, //放内容
                    done: false //放是否被勾选的状态：false(没被勾选) true(被勾选：添加样式)
                }
                arr.push(obj);//[{}]
                setdata('todomvc', arr);
            }
        }
        render();//回车需要重新渲染
    }

    //2.获取本地数据，渲染列表
    function render(data) {
        let arr = [];
        if (data) {
            arr = data;
        } else {
            arr = getData('todomvc');
        }
        let str = arr.map((item, index) => {
            return `<li class="${item.done ? 'completed' : ''}" data-index="${index}">
                        <div class="view">
                            <input class="toggle" type="checkbox" ${ item.done ? 'checked' : ''}>
                            <label>${item.title}</label>
                            <button class="destroy"></button>
                        </div>
                        <input class="edit" value="Rule the web">
                    </li>`;
        }).join('');

        //渲染到父节点
        todoList.innerHTML = str;
    }

    render();


    //3、选中和删除某行：事件委托
    todoList.onclick = ev => {
        //选中功能
        if (ev.target.className == 'toggle') {
            // console.log(88);
            // console.log(ev.target.checked);
            let index = ev.target.parentNode.parentNode.dataset.index;
            // console.log(index);
            let arr = getData('todomvc');//本地数组
            // arr[index]['done']
            arr[index].done = ev.target.checked;
            setdata('todomvc', arr);

            //单选按钮，反控制全选功能
            let isok = arr.every(item => {
                return item.done == true;
            });

            localStorage.setItem('checkall', isok);
            checkall();
        }

        //删除功能
        if (ev.target.className == 'destroy') {
            // console.log(999);
            let index = ev.target.parentNode.parentNode.dataset.index;
            let arr = getData('todomvc');//本地数组
            //删除index对应的那条数据
            arr.splice(index, 1);
            setdata('todomvc', arr);
        }


        render();
    }


    //删除全部
    let clearCompleted = document.querySelector('.clear-completed');

    clearCompleted.onclick = () => {
        // console.log(777);
        let arr = getData('todomvc');
        arr = arr.filter(item => {
            // return item.done != true;
            return item.done == false;
        });
        setdata('todomvc', arr);
        render();//删除全部已完成任务后，再渲染数据
    }

    //点击哪个哪个高亮：路由的状态
    let filters = document.querySelector('.filters');
    let routers = document.querySelectorAll('.filters a');

    //哈希值变化，检测到，就替换数据
    window.onhashchange = () => {
        // console.log('哈希变了');
        //判断哈希值，如果是all就显示全部；如果是active就显示未完成任务，completed就显示已完成
        let hash = location.hash;
        // console.log(hash);
        hash = hash.slice(2);
        let index = 0;//all
        // console.log(hash);
        let arr = getData('todomvc');
        if (hash == 'all') {
            arr = getData('todomvc');
        } else if (hash == 'active') {
            //如果是active就显示未完成任务
            arr = arr.filter(item => {
                return item.done == false;
            });
            index = 1;//第二个a标签
        } else if (hash == 'completed') {
            //completed就显示已完成
            arr = arr.filter(item => {
                return item.done == true;
            });
            index = 2;
        }
        //排他
        for (let i = 0; i < routers.length; i++) {
            routers[i].className = '';
        }
        routers[index].className = 'selected';//当前的a标签高亮

        render(arr);
    }

    window.onhashchange();//一进入到页面中就立刻检测哈希值


    //统计完成项目
    let todoCount = document.querySelector('.todo-count strong');

    function count() {
        let arr = getData('todomvc');
        arr = arr.filter(item => {
            return item.done == false;
        });

        // return arr.length;
        todoCount.innerHTML = arr.length;
    }
    count();


    //全选和全不选
    let toggleAll = document.querySelector('#toggle-all');

    function checkall() {
        //更新全选的状态：刷新页面的时候，要根据本来的状态来确定样式
        let isok = localStorage.getItem('checkall');//字符串 'ture' 'false'
        // console.log(isok);
        if (isok == 'true') {
            toggleAll.checked = true;
        } else {
            toggleAll.checked = false;
        }
    }

    checkall();

    toggleAll.onclick = () => {
        // console.log(toggleAll.checked);
        localStorage.setItem('checkall', toggleAll.checked);
        let arr = getData('todomvc');
        arr.forEach(item => {
            item.done = toggleAll.checked;
        });
        setdata('todomvc', arr);
        render();
    }


})();

