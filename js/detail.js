// 商品详情模块 
$(function() {
    $(".detail_tab_list ul li").click(function() {
        // 点击上部的li，当前li添加current类，其余兄弟移除类
        $(this).addClass("current").siblings().removeClass("current");
        //让下面相应索引号的item显示,其余的item隐藏
        $(".detail_tab_con .item").eq(index).show().siblings().hide();
    })
});

// 产品放大镜效果
$(function() {
    // 鼠标经过产品图片区域，遮罩显示，大图片显示/隐藏
    $(".preview_img").hover(
        function() {
            $('.mask').css({
                display: 'block'
            });
            $(".big").css({
                display: 'block'
            });
        },
        function() {
            $('.mask').css({
                display: 'none'
            });
            $(".big").css({
                display: 'none'
            });
        }
    );
    // 鼠标在产品图片中移动
    $(".preview_img").mousemove(function(e) {
        // 鼠标在产品图片中的位置
        var x = e.pageX - $(".preview_img").offset().left;
        var y = e.pageY - $(".preview_img").offset().top;
        // 遮罩在产品图片中的位置
        var maskX = x - $('.mask').width() / 2;
        var maskY = y - $('.mask').width() / 2;
        // 最大移动距离
        var maskMax = $(".preview_img").width() - $('.mask').width();
        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maskMax) {
            maskX = maskMax;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maskMax) {
            maskY = maskMax;
        }
        $('.mask').css({
            top: maskY + 'px',
            left: maskX + 'px'

        });
        // 大图片遮罩最大移动距离
        var bigMax = $('.bigImg').width() - $(".big").width();
        //大小图片比例
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        $('.bigImg').css({
            top: -bigY + 'px',
            left: -bigX + 'px'
        })
    })
})