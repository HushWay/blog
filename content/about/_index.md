+++
title = 'about'
date = 2024-03-28T20:02:42+08:00
draft = false
+++


<style>
    html {
        height: 100%;
        width: 100%
    }

    body {
        /* background: url(house.jpg); */
        background: -webkit-gradient(linear, 0% 0%, 0%, 100%, from(rgba(13, 52, 58, 1)), to (#000000));
        background: -moz-linear-gradient(top, rgba(13, 52, 58, 1) 0%, rgba(0, 0, 0, 1) 100%);
        overflow: hidden;
    }

    .drop {
        /*
background:-webkit-gradient(linear, 0% 0%, 0%, 100%, from(rgba(13,52,58,1)), to (rgba(255,255,255,0.6)));
background:-moz-linear-gradient(top, rgba(13,52,58,1) 0%, rgba(255,255,255,0.6) 100%);
*/
        background: #a2a2a2;
        width: 1px;
        height: 89px;
        position: absolute;
        bottom: 200px;
        -webkit-animation: fall 0.5s linear infinite;
        -moz-animation: fall 0.5s linear infinite;
    }

    @-webkit-keyframes fall {
        to {
            margin-top: 900px;
        }
    }

    @-moz-keyframes fall {
        to {
            margin-top: 900px;
        }
    }

</style>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
<script>
    $("html").attr("data-theme", "dark")
    var nbDrop = 800;

    function randRange(maxNum, minNum) {
        return (Math.floor(Math.random(10) * (maxNum - minNum + 1)) + minNum);
    }

    function createRain() {
        var dropLeft = randRange(0, 3000);
        var dropTop = randRange(-1000, 1000);
        $('.rain').append('<div class="drop"></div>');
        $('.drop:last-child').css('left', dropLeft);
        $('.drop:last-child').css('top', dropTop);
    }

    for (i = 0; i < nbDrop; i++) {
        setTimeout(createRain, i * 10); // 每隔10毫秒添加一个雨滴
    }
</script>

<body onload="createRain()">
    <section id="rain" class="rain">
你好鸭！你是怎么找到这儿哒？

这是我在森林中修建的属于我的小木屋

对，那是秋千，天气好的时候，我就在秋千上晒太阳，看看书

可是现在下雨了，所以我们最好进屋躲一躲

雨越来越大了，可是你不觉得躲在屋里听雨落的声音莫名的安心吗

对了，我把壁炉打开，火苗和雨水是绝配

这样的雨夜，做什么都是幸福的

我们可以一起打游戏、一起看电影、一起读书、一起下棋、一起听歌、一起聊天

或者什么都不做，就听雨

......

哦，雨停了，你要走了？没关系，不用担心我，还有一只猫陪着我呢！
    </section>
</body>




