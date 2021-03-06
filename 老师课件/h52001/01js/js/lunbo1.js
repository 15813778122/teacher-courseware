(function () {
    /*
        * 图片叠加在可视区右侧，第一张图放在可视区
        * 焦点生成
        * 自动轮播
        * 左右按钮点击切换
        * 点击焦点切换
    */

    //1、图片叠加在可视区右侧，第一张图放在可视区
    let box1 = document.querySelector('#box1');
    let imglist = document.querySelectorAll('#box1 ul li');
    let lights = document.querySelector('#box1 .page');
    let btnPrev = document.querySelector('#box1 .btn-prev');
    let btnNext = document.querySelector('#box1 .btn-next');
    let iw = imglist[0].offsetWidth;//没有px

    console.log(iw);
    let str = '';
    for (let i = 0; i < imglist.length; i++) {
        imglist[i].style.left = iw + 'px';
        str += `<span class="" data-index="${i}">${i + 1}</span>`;
    }
    imglist[0].style.left = 0;

    //2、焦点生成
    console.log(str);
    lights.innerHTML = str;
    lights.children[0].className = 'active';


    //3.自动轮播

    let timer = setInterval(next, 3000);
    let now = 0;

    function next() {//next
        //旧图出场
        startMove(imglist[now], { 'left': -iw });
        //新图候场
        now++;
        if (now >= imglist.length) {//临界点的设置
            now = 0;
        }
        imglist[now].style.left = iw + 'px';//把新图放在右侧等待
        //新图进场
        startMove(imglist[now], { 'left': 0 });
        lightmove();//焦点跟随
    }

    function prev() {//next
        //旧图出场
        startMove(imglist[now], { 'left': iw });
        //新图候场
        now--;
        if (now < 0) {//临界点的设置
            now = imglist.length - 1;
        }
        imglist[now].style.left = -iw + 'px';//把新图放在右侧等待
        //新图进场
        startMove(imglist[now], { 'left': 0 });
        lightmove();//焦点跟随
    }


    //焦点跟随
    function lightmove() {
        //排他
        for (let i = 0; i < lights.children.length; i++) {
            lights.children[i].className = '';
        }
        lights.children[now].className = 'active';
    }

    //4.左右按钮点击切换
    box1.onmouseover = () => {
        clearInterval(timer);
    }

    box1.onmouseout = () => {
        clearInterval(timer);
        timer = setInterval(next, 3000);
    }

    //点击左按钮：
    btnPrev.onclick = () => {
        prev();
    }
    //点击右按钮：
    btnNext.onclick = () => {
        next();
    }

    //5、点击焦点切换到对应的图片
    lights.onclick = ev => {
        if (ev.target.tagName == 'SPAN') {
            // console.log(888);
            console.log(ev.target.dataset.index);
            let index = ev.target.dataset.index;
            if (index > now) {
                //从右边切入
                startMove(imglist[now], { 'left': -iw });//旧图
                imglist[index].style.left = iw + 'px';//新图候场
                startMove(imglist[index], { 'left': 0 });//新图进场
            }

            if (index < now) {
                //从左边切入
                startMove(imglist[now], { 'left': iw });//旧图
                imglist[index].style.left = -iw + 'px';//新图候场
                startMove(imglist[index], { 'left': 0 });//新图进场
            }
            now = index;
            lightmove();
        }
    }
})();