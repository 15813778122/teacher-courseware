(function () {
    /*
        -用户名验证；
        -注册
        -登陆
        -退出
        -发帖
        -顶贴
        -踩贴
        -点击加载更多
    */

    let username1 = document.querySelector('#username1');
    let verifyUserNameMsg = document.querySelector('#verifyUserNameMsg');
    let btnReg = document.querySelector('#btnReg');
    let password1 = document.querySelector('#password1');
    let btnLogin = document.querySelector('#btnLogin');
    let username2 = document.querySelector('#username2');
    let password2 = document.querySelector('#password2');
    let user = document.querySelector('#user');
    let reg = document.querySelector('#reg');
    let login = document.querySelector('#login');
    let userinfo = document.querySelector('#userinfo');

    //用户名验证
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
    let checkname = false;//验证不通过，true验证通过
    username1.onblur = () => {
        // console.log('失去我了');
        let val = username1.value;
        if (val.trim()) {
            //去除前后空格还是非空，发送后端进行验证
            ajax({
                url: 'guestbook/index.php',//url：请求路径
                type: 'get',//请求方式
                data: {//发送数据
                    m: 'index',
                    a: 'verifyUserName',
                    username: val
                },
                success(data) {//成功回调
                    // console.log(data);
                    data = JSON.parse(data);//把字符串转成对象
                    if (data.code) {
                        //有错误
                        verifyUserNameMsg.style.color = 'red';
                        checkname = false;
                    } else {
                        //没有错误
                        checkname = true;
                        verifyUserNameMsg.style.color = '#58bc58';
                    }
                    verifyUserNameMsg.innerHTML = data.message;
                },
                failure(code) {//失败的回调
                    //可选
                    console.log(code);//404 找不到这个页面
                    if (code == 404) {
                        location.href = '404.html';
                    }

                }
            })
        }
    }

    //注册功能
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
    btnReg.onclick = () => {
        let val = username1.value;//用户名
        let psw = password1.value;//密码
        //发送请求之前做好判断，避免无效的请求，节流
        if (val.trim() && psw.trim() && checkname) {
            //账号、密码都不为空，可以发送请求
            console.log(val);
            console.log(psw);
            ajax({
                url: 'guestbook/index.php',//url：请求路径
                type: 'post',//请求方式
                data: {//发送数据
                    m: 'index',
                    a: 'reg',
                    username: val,
                    password: psw
                },
                success(data) {//成功回调
                    // console.log(data);//有成功返回数据了，再往下走
                    data = JSON.parse(data);
                    alert(data.message);
                }
            })
        }
    }


    //登陆功能
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

    btnLogin.onclick = () => {
        let val = username2.value;//用户名
        let psw = password2.value;//密码
        if (val.trim() && psw.trim()) {
            //账号、密码都不为空，可以发送请求
            // console.log(val);
            // console.log(psw);
            ajax({
                url: 'guestbook/index.php',//url：请求路径
                type: 'post',//请求方式
                data: {//发送数据
                    m: 'index',
                    a: 'login',
                    username: val,
                    password: psw
                },
                success(data) {//成功回调
                    // console.log(data);//有成功返回数据了，再往下走
                    data = JSON.parse(data);
                    // console.log(data);
                    alert(data.message)
                }
            })
        }
    }


    //面板状态的处理
    function getCookie(key) {
        // console.log(document.cookie);//uid=5; username=yuhan
        // console.log(key);
        let obj = {};
        let arr = document.cookie.split('; ');//['uid=5','username=yuhan']

        for (let i in arr) {
            let arr2 = arr[i].split('=');//['uid','5']  ['username','yuhan']
            // console.log(arr2);
            if (arr2[0] == key) {
                return arr2[1];
                // obj[arr2[0]] = arr2[1];
            }
        }
        // return obj[key];
    }

    // console.log(getCookie('uid'));//5

    //判断登陆状态来确定面板的显示和隐藏：注册和登陆同生共死；登陆和退出是有你没我
    function updateStatu() {
        let uid = getCookie('uid');
        if (uid) {
            //登陆状态:注册和登陆是隐藏的；退出面板是显示的
            user.style.display = 'block';
            reg.style.display = 'none';
            login.style.display = 'none';
            userinfo.innerHTML = getCookie('username');
        } else {
            //未登录状态
            user.style.display = 'none';
            reg.style.display = 'block';
            login.style.display = 'block';
            userinfo.innerHTML = '';
        }
    }

    updateStatu();



})();