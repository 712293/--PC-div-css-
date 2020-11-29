// 轮播图
$(function() {
    // 鼠标经过显示按钮
    $('.focus').hover(
        function() {
            $('.arrow_l').fadeIn();
            $('.arrow_r').fadeIn();
            clearInterval(timer);
            // 清除定时器
            timer = null;
        },
        function() {
            $('.arrow_l').fadeOut();
            $('.arrow_r').fadeOut();
            //手动调用
            timer = setInterval(function() {
                $('.arrow_r').click()
            }, 2000)
        }
    );
    // 动态生成小圆圈
    $('.cycleImg li').each(function(index) {
        $('.circle').append("<li></li>");
    });
    //为ol中的li绑定点击事件
    $('.circle li').click(function() {
            circle = $(this).index();
            cicLi(circle);
            sped = -circle * $('.cycleImg li').width()
            $('.cycleImg').animate({
                left: sped + "px"
            }, 500);

        })
        // 把ol中的第一个li的类名设置为 current
    $('.circle li').eq(0).addClass("current");
    //按钮计数器
    var num = 0;
    // 小圆圈计数器
    var circle = 0;
    //flag节流阀
    var flag = true;
    // 克隆第一张图片到最后
    $('.cycleImg').append($('.cycleImg li').eq(0).clone());
    //点击右侧按钮，图片向右滚动一张
    $('.arrow_r').click(function() {
        if (flag) {
            flag = false;
            if (num == $('.cycleImg li').length - 1) {
                num = 0;
                $('.cycleImg').css({
                    left: 0 + 'px'
                });
            }
            var sped = parseInt($('.cycleImg').css('left')) - $('.cycleImg li').width();
            swiper(sped);
            // 点击右侧按钮，小圆圈跟随一起变化 再次声明一个变量控制小圆圈播放
            circle++;
            if (circle == $('.circle li').length) {
                circle = 0
            }
            num++;
            cicLi(circle);
        }
    });

    //点击左侧按钮，图片向左滚动一张
    $('.arrow_l').click(function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = $('.cycleImg li').length - 1;
                $('.cycleImg').css({
                    left: '-' + num * $('.cycleImg li').width() + 'px'
                });
            }
            num--;
            swiper()
            var sped = parseInt($('.cycleImg').css('left')) + $('.cycleImg li').width();
            swiper(sped);
            // 点击右侧按钮，小圆圈跟随一起变化 再次声明一个变量控制小圆圈播放
            circle--;
            // 底部小圆点样式
            cicLi(circle);
        }
    });

    //自动轮播效果
    var timer = setInterval(function() {
        //手动调用
        $('.arrow_r').click()
    }, 2000)

    // 函数封装
    // 渲染小圆圈
    function cicLi(circle) {
        $('.circle li').eq(circle).addClass('current').siblings().removeClass('current');
    }
    // 轮播动画
    function swiper(sped) {
        $('.cycleImg').animate({
            left: sped + "px"
        }, 500, function() {
            flag = true;
        });
    }

});

// 电梯导航
$(function() {
    // 节流阀
    var flag = true;
    $(window).scroll(function() {
        //页面滚动到指定位置 电梯导航显示
        if ($(document).scrollTop() >= $("#recommend").offset().top) {
            $(".fixedtool").stop().fadeIn();
            $(".fixedtool").css("position", "fixed");
        } else {
            $(".fixedtool").stop().fadeOut();
        };
        // 使用节流阀避免效果排队的Bug
        if (flag) {
            //页面滚动到某个内容区域 左侧电梯导航小li 相应添加和删除 current类名
            $(".floor .w").each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {
                    $(".fixedtool li").eq(i).addClass("currentNav").siblings().removeClass("currentNav");
                }
            });
        }
    });
    // 点击电梯导航页面可以滚动到相应内容区域
    $(".fixedtool li").click(function() {
        flag = false;
        // 获取对应索引号的盒子的offset().top
        var floorTop = $(".floor .w").eq($(this).index()).offset().top;
        //页面滚动效果
        $("html,body").stop().animate({
                scrollTop: floorTop
            }, function() {
                flag = true;
            })
            //让当前的li添加currentNav兄弟li去除current
        $(this).addClass("currentNav").siblings().removeClass("currentNav");
    });
    // 回到顶部
    $("#goback a").click(function() {
        flag = true;
        var num = 0;
        $("body,html").stop().animate({
            scrollTop: num
        });
    });
})