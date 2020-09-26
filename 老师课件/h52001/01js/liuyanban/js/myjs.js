(function () {
    //window.onload  自调用  $(function(){})

    /*
	验证用户名
	get
		guestbook/index.php
			m : index
			a : verifyUserName
			username : 要验证的用户名
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息具体返回信息
			}
    */
    let checkname = false;
    $('#username1').blur(() => {
        // console.log(777);
        let val = $('#username1').val();
        if (val.trim()) {
            //底层对象的方法无论js还是jq都能调用
            $.ajax({
                url: 'guestbook/index.php',//请求路径 必填
                type: 'get',//请求方式 必填
                data: { //参数 选填
                    m: 'index',
                    a: 'verifyUserName',
                    username: val
                },
                dataType: 'json',//让ajax帮我们把字符串转成对象 选填的
                success(data) {
                    //发送ajax，得到数据，里面的运用才是重难点
                    // data = JSON.parse(data);
                    // console.log(data);
                    if (data.code) {
                        //有错误
                        checkname = false;
                        $('#verifyUserNameMsg').css('color', 'red');
                    } else {
                        //没有错误
                        checkname = true;
                        $('#verifyUserNameMsg').css('color', 'green');
                    }
                    $('#verifyUserNameMsg').html(data.message);//设置内容
                }
            });
        }
    });


    /*
	用户注册
	get/post
		guestbook/index.php
			m : index
			a : reg
			username : 要注册的用户名
			password : 注册的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
    */

    $('#btnReg').click(() => {

        let val = $('#username1').val();
        let psw = $('#password1').val();

        if (val.trim() && psw.trim() && checkname) {
            //可以发送请求
            $.ajax({
                url: 'guestbook/index.php',//请求路径 必填
                type: 'post',//请求方式 必填
                data: { //参数 选填
                    m: 'index',
                    a: 'reg',
                    username: val,
                    password: psw
                },
                dataType: 'json',//让ajax帮我们把字符串转成对象 选填的
                success(data) {
                    //发送ajax，得到数据，里面的运用才是重难点
                    // data = JSON.parse(data);
                    // console.log(data);
                    alert(data.message);
                }
            });
        }
    });

    /*
	用户登陆
	get/post
		guestbook/index.php
			m : index
			a : login
			username : 要登陆的用户名
			password : 登陆的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
    */
    $('#btnLogin').click(() => {

        let val = $('#username2').val();
        let psw = $('#password2').val();

        if (val.trim() && psw.trim()) {
            //可以发送请求
            $.ajax({
                url: 'guestbook/index.php',//请求路径 必填
                type: 'post',//请求方式 必填
                data: { //参数 选填
                    m: 'index',
                    a: 'login',
                    username: val,
                    password: psw
                },
                dataType: 'json',//让ajax帮我们把字符串转成对象 选填的
                success(data) {
                    //发送ajax，得到数据，里面的运用才是重难点
                    // data = JSON.parse(data);
                    // console.log(data);
                    alert(data.message);
                    update();
                }
            });
        }
    });


    //状态面板的刷新
    function getCookie(key) {//形参就相当于局部变量
        //判断cookie用户是否已登录
        let cookie = document.cookie;//uid=20; username=xiaoqing123
        // console.log(cookie);
        let arr = cookie.split('; ');
        for (let i in arr) {
            let newarr = arr[i].split('=');
            if (newarr[0] == key) {
                return newarr[1];
            }
        }
    }

    // console.log(getCookie('uid'));

    function update() {
        let uid = getCookie('uid');
        if (uid) {
            //说明是登陆状态
            $('#reg').css('display', 'none');
            $('#login').css('display', 'none');
            $('#user').css('display', 'block');
            $('#userinfo').html(getCookie('username'));
        } else {
            //说明是登出状态
            $('#reg').css('display', 'block');
            $('#login').css('display', 'block');
            $('#user').css('display', 'none');
            $('#userinfo').html('');
        }
    }

    update();

    //退出功能
    /*
	用户退出
	get/post
		guestbook/index.php
			m : index
			a : logout
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
    */

    $('#logout').click(() => {
        $.ajax({
            url: 'guestbook/index.php',
            type: 'get',
            data: {
                m: 'index',
                a: 'logout'
            },
            dataType: 'json',
            success(data) {
                // console.log(data);
                alert(data.message);
                update();//刷新面板
            }
        });
    });

    //发表留言
    $('#btnPost').click(() => {
        //节流处理
        let uid = getCookie('uid');//如果获取不到说明：没有登陆，不能发留言，不需要发送无谓的请求
        console.log($('#content').val().trim());
        if ($('#content').val().trim() && uid) {
            $.ajax({
                url: 'guestbook/index.php',
                type: 'post',
                data: {
                    m: 'index',
                    a: 'send',
                    content: $('#content').val().trim()
                },
                dataType: 'json',
                success(data) {
                    // console.log(data);
                    alert(data.message);
                    update();//刷新面板

                    if (!data.code) {
                        //没有错误，渲染数据到页面
                        render(data.data);
                    }
                }
            });
        } else {
            alert('请先登陆且写留言');
        }
    });

    //补零操作
    function toTwo(num) {
        if (num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    //秒转成年月时分秒
    function settime(secs) {
        let date = new Date(secs * 1000);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let mins = date.getMinutes();
        let ses = date.getSeconds();
        // console.log(hours);
        return `${year}-${toTwo(month)}-${toTwo(day)} ${toTwo(hours)}:${toTwo(mins)}:${toTwo(ses)}`;
    }

    //渲染数据
    function render(data) {//data是一条数据，是一个对象
        let time = settime(data.dateline);
        let str = `<dl data-cid="${data.cid}">
                        <dt>
                            <strong>${ data.username}</strong> 说 :
                        </dt>
                        <dd>${ data.content} 发布时间：${time}</dd>
                        <dd class="t">
                            <a href="javascript:;" class="support">顶(<span>${ data.support}</span>)</a>
                            |
                            <a href="javascript:;" class="oppose">踩(<span>${ data.oppose}</span>)</a>
                        </dd>
                    </dl>`;
        $('#list').html($('#list').html() + str);//渲染数据到页面

    }

    //初始化列表
    /*
		初始化留言列表
		get
			guestbook/index.php
				m : index
				a : getList
				page : 获取的留言的页码，默认为1
				n : 每页显示的条数，默认为10
			返回
				{
					code : 返回的信息代码 0 = 没有错误，1 = 有错误
					data : 返回成功的留言的详细信息
						{
							count : 总条数	
							pages : 页数 
							page : 当前页
							n : 每页显示条数
							list : [
									{
										cid : 留言id	
										content : 留言内容 
										uid : 留言人的id
										username : 留言人的名称
										dateline : 留言的时间戳(秒)
										support : 当前这条留言的顶的数量
										oppose : 当前这条留言的踩的数量
									},
									{
										cid : 留言id	
										content : 留言内容 
										uid : 留言人的id
										username : 留言人的名称
										dateline : 留言的时间戳(秒)
										support : 当前这条留言的顶的数量
										oppose : 当前这条留言的踩的数量
									}
							]
							
						}
					message : 返回的信息 具体返回信息
				}
        */
    let ipage = 1;

    function getList() {
        console.log('触发了');
        $.ajax({
            url: 'guestbook/index.php',
            type: 'post',
            data: {
                m: 'index',
                a: 'getList',
                page: ipage,
                n: 20
            },
            dataType: 'json',
            success(data) {
                // console.log(data);
                let list = data.data.list;//数组 [{},{},{}]
                list.forEach(item => {
                    render(item);
                });

                //判断是否需要显示我们的：点击加载更多按钮：如果总页数小于2，隐藏按钮
                let pages = data.data.pages;//总页数
                if (pages < 2 || ipage == pages) {
                    $('#showMore').css('display', 'none');
                } else {
                    $('#showMore').css('display', 'block');
                }

            }
        });
    }

    getList();//进入页面就发送请求，获取留言列表

    //点击加载更多
    $('#showMore').click(() => {
        ipage++;
        getList();
    });


    //顶贴和踩贴
    /*
	顶帖
	post
		guestbook/index.php
			m : index
			a : doSupport
			cid : 对应帖子的id
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
    */
    let ischeck = true;
    $('#list').on('click', '.support', function () {
        // console.log(this);
        // let that = this;
        $.ajax({
            url: 'guestbook/index.php',
            type: 'post',
            data: {
                m: 'index',
                a: 'doSupport',
                cid: $(this).parent().parent().data('cid')//data()就可以帮我们获取data-cid
            },
            dataType: 'json',
            success: data => {
                // console.log(data);
                // console.log($(this).find('span').html());
                if (!data.code) {
                    let num = $(this).find('span').html()
                    // console.log(num);
                    $(this).html(`顶(<span>${++num}</span>)`);
                }
            }
        });
    });
})();