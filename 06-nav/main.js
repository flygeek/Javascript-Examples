let $searchTab = $('.searchTab')
let $searchForm = $('.searchForm')

let $siteList = $('.siteList')
let $siteListEnd = $(`.siteList li:last-child`)

let $addFormSite = $('.addFormSite')
let $mask = $('.mask')

let $popFailed = $('.popFailed')
let $popSuccess = $('.popSuccess')

//定义哈希表
let hashMap = JSON.parse(localStorage.getItem('siteCache')) || [
    {
        siteName: 'Mdn',
        siteIconsType: 'text',
        siteIcon: `<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-mdn"></use>
                </svg>`,
        siteKey: 'M',
        siteLink: 'https://developer.mozilla.org/zh-CN/'
    },
    {
        siteName: 'Dribbble',
        siteIconsType: 'text',
        siteIcon: `<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-dribbble"></use>
                </svg>`,
        siteKey: 'D',
        siteLink: 'https://dribbble.com/'
    },
    {
        siteName: 'IconFont',
        siteIconsType: 'link',
        siteIcon: 'imgs/iconfont.svg',
        siteKey: 'I',
        siteLink: 'https://www.iconfont.cn/'
    },
    {
        siteName: 'LeetCode',
        siteIconsType: 'text',
        siteIcon: `<svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-leetcode"></use>
                </svg>`,
        siteKey: 'L',
        siteLink: 'https://leetcode-cn.com/'
    },
]

//初始化搜索引擎并添加点击事件
let searchInit = (elements) => {
    //初始化搜索引擎
    $(`.google`).css(`background`, `#4285F433`).css(`color`, `#4285F4`).css(`font-weight`, `600`).find(`svg`).css(`font-size`, `20px`)
    $searchForm.attr(`action`, `https://www.google.com/search`).find(`input`).attr(`name`, `q`).end().find(`use`).attr(`xlink:href`, `#icon-google`)

    //添加点击事件
    elements.find(`li`).on(`click`, (e) => {
        let className = e.target.getAttribute(`class`)

        //设置查询地址
        if (className === `google`) {
            $searchForm.attr(`action`, `https://www.google.com/search`)
            $searchForm.find(`input`).attr(`name`, `q`)
        } else if (className === `baidu`) {
            $searchForm.attr(`action`, `https://www.baidu.com/s`)
            $searchForm.find(`input`).attr(`name`, `wd`)
        } else if (className === `translation`) {
            $searchForm.attr(`action`, `https://translate.google.cn`)
            $searchForm.find(`input`).attr(`name`, `q`)
        }

        //清除当前样式
        $searchTab.find(`li`).attr(`style`, ``).css(`font-weight`, `600`).find(`svg`).css(`font-size`, `0`)
        //添加点击样式
        $(`.${className}`).css(`background`, `#4285F433`).css(`color`, `#4285F4`).find(`svg`).css(`font-size`, `20px`)
        //修改 input 内 icon
        $searchForm.find(`use`).attr(`xlink:href`, `#icon-${className}`)
    })
}

//网址点击跳转事件 + 删除网址事件，并且阻止冒泡
let addEvent = (element, site, index) => {
    element.on('click', () => {
        window.open(site.siteLink)
    }).on('click', '#closeSite', (e) => {
        e.stopPropagation()
        let result = window.confirm(`是否确认删除 ${site.siteName} ？`)
        if (result) {
            hashMap.splice(index, 1)
            render()
        }
    })
}

//渲染哈希表
let render = () => {
    $(`.siteList`).find(`li:not(.addSite)`).remove()

    hashMap.forEach((site, index) => {
        if (site.siteIconsType === 'link') {
            const $li = $(`<li>
            <svg id="closeSite" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-close"></use>
            </svg>
            <div class="siteIcon"><img src="${site.siteIcon}"></div>
            <div class="siteName">${site.siteName}</div>
            </li>`).insertBefore($siteListEnd)
            addEvent($li, site, index)
        } else if (site.siteIconsType === 'text') {
            const $li = $(`<li>
            <svg id="closeSite" class="icon" aria-hidden="true">
                    <use xlink:href="#icon-close"></use>
            </svg>
            <div class="siteIcon">${site.siteIcon}</div>
            <div class="siteName">${site.siteName}</div>
            </li>`).insertBefore($siteListEnd)
            addEvent($li, site, index)
        }
    })
    searchInit($('.searchTab'))
}
render()

//获取form表单中的 siteIconsType 值
let siteIconsType = () => {
    let radio = $("input[name = \"siteIconsType\"]")
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value
        }
    }
}

//根据上面的函数 来图标类型选择
$("input[name = \"siteIconsType\"]")
    .change(() => {
        if (siteIconsType() === `link`) {
            $(`.siteIconLink`).css(`display`, `flex`)
        } else {
            $(`.siteIconLink`).css(`display`, `none`)
        }
    })

// form 表单弹出事件
let openForm = () => {
    $addFormSite.css('opacity', '1')
    $addFormSite.css('transform', 'translateY(15%')
    $addFormSite.css('display', 'block')
    $addFormSite.css('transition', '.3s')
    $mask.css('display', 'block')
}
//form 表单关闭事件
let closeForm = () => {
    $addFormSite.css('opacity', '1')
    $addFormSite.css('transform', 'translateY(-100%')
    $mask.css('display', 'none')
}
//form 表单添加成功事件
let popSuccess = (message) => {
    $popSuccess.html(message)
    $popSuccess.css('opacity', '1')
    $popSuccess.css('transform', 'translateY(0)')
    setTimeout(() => {
        $popSuccess.css('opacity', '0')
        $popSuccess.css('transform', 'translateY(-100%)')
    }, 2000)
}
//form 表单提交失败提醒
let popFailed = (message) => {
    $popFailed.html(message)
    $popFailed.css('opacity', '1')
    $popFailed.css('transform', 'translateY(0)')
    setTimeout(() => {
        $popFailed.css('opacity', '0')
        $popFailed.css('transform', 'translateY(-100%)')
    }, 2000)
}

//判断当前key是否被占用
let ifExist = (siteKey) => {
    let siteKeys = []
    for (let i = 0; i < hashMap.length; i++) {
        siteKeys.push(hashMap[i].siteKey.toLowerCase())
    }
    return siteKeys.includes(siteKey.toLowerCase())
}

// 提交表单事件
let submitForm = () => {
    let siteName = $('input[name = \"siteName\"]').val()
    let siteLink = $('input[name = \"siteLink\"]').val()
    let siteKey = $('input[name = \"siteKey\"]').val()
    let siteIcon = $('input[name = \"siteIcon\"]').val()

    if (siteIconsType() === 'text') {
        if (!siteName || !siteLink || !siteKey) {
            popFailed('填写完整才能收藏')
        } else if (siteName && siteLink && siteKey) {
            if (siteLink.indexOf('http') !== 0) {
                siteLink = 'https://' + siteLink
            }

            if (siteKey.length > 1) {
                popFailed('快捷键仅支持单个按键')
            } else if (siteKey.length === 1) {
                if (ifExist(siteKey)) {
                    popFailed('快捷键已被占用，请换一个')
                } else {
                    hashMap.push({
                        siteName: siteName,
                        siteIconsType: 'text',
                        siteIcon: siteLink.replace('https://', '').replace('http://', '').replace('www.', '')[0].toUpperCase(),
                        siteKey: siteKey,
                        siteLink: siteLink
                    })
                    render()
                    closeForm()
                    popSuccess('添加网址成功')
                }
            }
        }
    } else if (siteIconsType() === 'link') {
        if (!siteName || !siteLink || !siteKey || !siteIcon) {
            popFailed('填写完整才能收藏')
        } else if (siteName && siteLink && siteKey) {
            if (siteLink.indexOf('http') !== 0) {
                siteLink = 'https://' + siteLink
            }

            if (siteKey.length > 1) {
                popFailed('快捷键仅支持单个按键')
            } else if (siteKey.length === 1) {
                if (ifExist(siteKey)) {
                    popFailed('快捷键已被占用，请换一个')
                } else {
                    hashMap.push({
                        siteName: siteName,
                        siteIconsType: 'link',
                        siteIcon: siteIcon.toUpperCase(),
                        siteKey: siteKey,
                        siteLink: siteLink
                    })
                    render()
                    closeForm()
                    popSuccess('添加网址成功')
                }
            }
        }
    }
}

$('.addSite').on('click', openForm)

//键盘快捷键打开网页,并且在添加网页的时候阻止这个事件
$(document).on('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].siteKey.toLowerCase() === key) {
            window.open(hashMap[i].siteLink)
        }
    }
}).on('keypress', 'input:focus', (e) => {
    e.stopPropagation()
})

//保存数据到本地
window.onbeforeunload = () => {
    let siteCache = JSON.stringify(hashMap)
    localStorage.setItem('siteCache', siteCache)
}