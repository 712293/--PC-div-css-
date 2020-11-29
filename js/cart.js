$(function() {
    // 全选全不选功能
    // 把全选按钮（checkall）的状态赋值给小按钮（j-checkbox）
    $(".checkall").change(function() {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        // 当前商品被选中 添加 check-cart-item 类名
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            // 移除check-cart-item 类名
            $(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    });
    // 如果小复选框全部被选中，就把全选框选上，否则反之
    $(".j-checkbox").change(function() {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true)
        } else {
            $(".checkall").prop("checked", false)
        }
        // 当前商品被选中 添加 check-cart-item 类名
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            // 移除check-cart-item 类名
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
        getSum();
    });
    // 商品数量计数模块
    // 增加模块
    $(".increment").click(function() {
        // 获取输入框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        // 将值赋给文本框
        $(this).siblings(".itxt").val(n);
        // 计算小计模块 根据文本框的值*当前商品的价格 
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 减少模块
    $(".decrement").click(function() {
        // 获取输入框的值
        var n = $(this).siblings(".itxt").val();
        // 最小值为1
        if (n == 1) {
            return false
        }
        n--;
        // 将值赋给文本框
        $(this).siblings(".itxt").val(n);
        // 计算小计模块 根据文本框的值*当前商品的价格 
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        //小计模块
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });
    // 计算总额模块
    function getSum() {
        var count = 0; //计算总数量
        var money = 0; //计算总加哥哥
        $(".j-checkbox").each(function() {
            if ($(this).is(":checked")) {
                var goods = parseInt($(this).parents(".cart-item").find(".p-sum").text().substr(1));
                var num = parseInt($(this).parents(".cart-item").find(".itxt").val());
                money += goods;
                count += num;
            }
        });
        $(".amount-sum em").text(count);
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 删除商品模块
    // 删除的是当前商品
    $(".p-action a").click(function() {
        $(this).parents(".cart-item").remove();
    });
    // 删除选中的商品
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item").remove();
    });
    // 清空购物车
    $(".clear-all").click(function() {
        $(".cart-item").remove();
    })
})