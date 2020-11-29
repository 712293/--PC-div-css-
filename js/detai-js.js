// 商品详情模块 
window.addEventListener('load', function() {
    var tab_list = document.querySelector('#tab_list').querySelectorAll('li');
    var items = document.querySelectorAll('.item');
    for (i = 0; i < tab_list.length; i++) {
        tab_list[i].setAttribute('index', i);
        tab_list[i].onclick = function() {
            for (i = 0; i < tab_list.length; i++) {
                tab_list[i].className = '';

            }
            this.className = 'current';
            var index = this.getAttribute('index');
            for (i = 0; i < tab_list.length; i++) {
                items[i].style.display = 'none';
            }
            items[index].style.display = 'block';
        }
    }
})

// 商品详情模块
// 产品放大镜效果
window.addEventListener('load', function() {
        var preview_img = document.querySelector('.preview_img');
        var mask = document.querySelector('.mask');
        var big = document.querySelector('.big');

        preview_img.addEventListener('mouseover', function() {
            mask.style.display = 'block';
            big.style.display = 'block';
        })
        preview_img.addEventListener('mouseout', function() {
            mask.style.display = 'none';
            big.style.display = 'none';
        })
        preview_img.addEventListener('mousemove', function(e) {

            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            var maskX = x - mask.offsetWidth / 2;
            var maskY = y - mask.offsetHeight / 2;


            var maskMax = preview_img.offsetWidth - mask.offsetWidth;
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
            mask.style.left = maskX + 'px';
            mask.style.top = maskY + 'px';
            var bigImg = document.querySelector('.bigImg');
            var bigMax = bigImg.offsetWidth - big.offsetWidth;
            var bigX = maskX * bigMax / maskMax;
            var bigY = maskY * bigMax / maskMax;
            bigImg.style.left = -bigX + 'px';
            bigImg.style.top = -bigY + 'px';

        })
    })
    // 产品放大镜效果