let html = document.querySelector('#html')

let style = document.querySelector('#style')

let n = -1

let string = `/*
* 你好，我是一名前端新人
* 接下来我要展示一下我的前端功底
* 首先要准备一个div
*/
#div1{
    border: 1px solid red;
    width: 200px;
    height: 200px
}
/*
* 接着把div变成一个圆
*/
#div1{
    border-radius: 50%;
    border: none;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
}
/*
* 八卦分阴阳两极
* 一黑一白
*/
#div1{
    background: linear-gradient(90deg, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%);
}
/*
* 加两个神秘的小球
* 一黑一白
*/
#div1::before{
    content: '';
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%);
    position: relative;
    display: block;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
}
#div1::after{
    content: '';
    width: 100px;
    height: 100px;
    background: radial-gradient(circle, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%);
    position: relative;
    display: block;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 50%;
}
/*
* 我想让这个八卦旋转起来
*/
@keyframes spin {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
}
#div1{
    animation: spin 3s linear infinite;
}
`

let string2 = ''

let step = () => {
    setTimeout(() => {
        n = n + 1
        if (string[n] === '\n') {
            string2 = string2 + '<br>'
        } else if (string[n] === ' ') {
            string2 = string2 + '&nbsp'
        } else {
            string2 = string2 + string[n]
        }
        html.innerHTML = string2
        style.innerHTML = string.substring(0, n)
        window.scroll(0, 99999)
        if (n < string.length - 1) {
            step()
        }
    }, 0)
}

step()