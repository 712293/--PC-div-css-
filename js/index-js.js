// // 固定导航栏模块
window.addEventListener('load', function() {
    var fixedtool = document.querySelector('.fixedtool');
    var goback = document.querySelector('#goback');
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= 800) {
            fixedtool.style.display = 'block';
            fixedtool.style.position = 'fixed';
            fixedtool.style.top = 100 + 'px';
        } else {
            fixedtool.style.display = 'none';
        }
    });
    //当点击固定导航中对应的li 就让窗口滚动到对应的位置
    var divLiArr = document.querySelectorAll(".floor .w")
    var ulLiArr = document.querySelectorAll('.fixedtool ul li');
    var target = 0;
    var leader = 0;
    var timer = null;
    flag = true;
    for (var i = 0; i < ulLiArr.length; i++) {
        ulLiArr[i].index = i;
        ulLiArr[i].onclick = function() {
            if (flag) {
                console.log(this.index);
                target = divLiArr[this.index].offsetTop;
                timer = setInterval(function() {
                    var step = (target - leader) / 10
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    window.scrollTo(0, leader);
                    if (target === leader) {
                        clearInterval(timer);
                        flag = true;
                    }
                }, 25);
                if (target !== leader) {
                    flag = false;
                }

            }
        }
    };

    // 当点击了返回顶部模块，就让窗口滚动到页面的最上方
    // goback.addEventListener('click', function() {
    //     // 窗口滚动，对象是window
    //     window.scrollTo(0, 0);
    // });
    //因为使用window.scrollTo(0, 0)后会报.offsetTop未定义的错误所以先不使用这个个方法
})

// 固定导航栏模块

// 轮播图模块
window.addEventListener('load', function() {
        var focus = document.querySelector('.focus');
        var focusWidth = focus.offsetWidth;
        var arrow_l = document.querySelector('.arrow_l');
        var arrow_r = document.querySelector('.arrow_r');
        // 鼠标经过显示按钮
        focus.addEventListener('mouseenter', function() {
                arrow_l.style.display = 'block';
                arrow_r.style.display = 'block';
                clearInterval(timer);
                // 清除定时器
                timer = null;
            })
            // 鼠标离开隐藏
        focus.addEventListener('mouseleave', function() {
                arrow_l.style.display = 'none';
                arrow_r.style.display = 'none';
                timer = setInterval(function() {
                    // 手动调用事件
                    arrow_r.click();
                }, 2000)
            })
            // 动态生成小圆圈
        var ul = focus.querySelector('ul');
        var ol = focus.querySelector('.circle');
        // console.log(ul.children.length);
        for (i = 0; i < ul.children.length; i++) {

            var li = document.createElement('li');
            // 记录小圆圈的索引号
            li.setAttribute('index', i);
            // 把li加入ol
            ol.appendChild(li);
            // 生成圆圈同时绑定事件
            li.addEventListener('click', function() {
                for (var i = 0; i < ol.children.length; i++) {
                    ol.children[i].className = '';
                }
                this.className = 'current';
                // 点击小圆圈，ul移动，移动的距离为 小圆圈的索引*图片的宽度
                // 获取li的索引值
                var index = this.getAttribute('index');
                num = index;
                circle = index;
                console.log(focusWidth);
                console.log(index);
                // 实现动画
                animate(ul, -index * focusWidth);
            })
        }
        // 把ol中的第一个li的类名设置为 current
        ol.children[0].className = 'current';
        // 克隆第一张图片到最后
        var first = ul.children[0].cloneNode(true);
        ul.appendChild(first);
        // 点击右侧按钮，图片向右滚动一张
        var num = 0;
        // circle 控制小圆圈的播放
        var circle = 0;
        // flag 节流阀
        var flag = true;
        arrow_r.addEventListener('click', function() {
            if (flag) {
                flag = false;
                // 如果走到了最后一张图片，此时ul要复原
                if (num == ul.children.length - 1) {
                    ul.style.left = 0;
                    num = 0;
                }
                num++;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 点击右侧按钮，小圆圈跟随一起变化 再次声明一个变量控制小圆圈播放
                circle++;
                // 如果circle==4 说明走到了最后一样 复原
                if (circle == ol.children.length) {
                    circle = 0;
                }
                // 调用函数
                circleChange();
            }
        })

        // 9. 左侧按钮做法
        arrow_l.addEventListener('click', function() {
            if (flag) {
                flag = false;
                if (num == 0) {
                    num = ul.children.length - 1;
                    ul.style.left = -num * focusWidth + 'px';

                }
                num--;
                animate(ul, -num * focusWidth, function() {
                    flag = true;
                });
                // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
                circle--;
                // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
                // if (circle < 0) {
                //     circle = ol.children.length - 1;
                // }
                circle = circle < 0 ? ol.children.length - 1 : circle;
                // 调用函数
                circleChange();
            }
        });

        function circleChange() {
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            ol.children[circle].className = 'current';
        }
        var timer = setInterval(function() {
            arrow_r.click();
        }, 2000)
    })
    // 轮播图模块