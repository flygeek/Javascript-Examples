const content = document.querySelector('#content')
const date = document.querySelector('#date')
const time = document.querySelector('#time')
const addedBtn = document.querySelector('#addedBtn')
const deleteBtn = document.querySelector('#deleteBtn')
const list = document.querySelector('#list')

const listContent = []

function render() {
    let htmlStr = ''
    listContent.forEach(function (item) {
        htmlStr = htmlStr + `
        <div class="list" id="list">
            <div class="item">
                <div>
                    <p><span>内容：</span>${item.content}</p>
                    <p><span>时间：</span>${item.date} ${item.time}</p>
                </div>
            </div>
        </div>
        `
    })
    list.innerHTML = htmlStr
}

addedBtn.addEventListener('click', function () {
    if (content.value !== '') {
        listContent.unshift({
            content: content.value,
            date: date.value,
            time: time.value
        });
        render();
    }

})

deleteBtn.addEventListener('click', function () {
    listContent.shift()
    render()
})