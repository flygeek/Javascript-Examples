let html = document.querySelector('#html')

let style = document.querySelector('#style')

let n = -1

let string = `/*
* 你好，我是一名前端新人
* 接下来我要加样式了
* 我要加的样式是
*/
body{
    color: red;
}
/*
* 然后我要准备一个div
*/
#div1{
    position: fixed;
    right: 20px;
    top: 20px;
    border: 1px solid red;
    width: 400px;
    height: 400px
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
        if (n < string.length - 1) {
            step()
        }
    }, 100)
}

step()