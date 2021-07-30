const request = new XMLHttpRequest()

getCss.onclick = () => {
    request.open('GET', '/style.css')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const style = document.createElement('style')
                style.innerHTML = request.response
                document.head.appendChild(style)
            } else {
                alert('加载css失败')
            }
        }
    }
    request.send()
}

getJs.onclick = () => {
    request.open('GET', '/2.js')
    request.onload = () => {
        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
}

getHtml.onclick = () => {
    request.open('GET', '/3.html')
    request.onload = () => {
        const div = document.createElement('div')
        div.innerHTML = request.response
        document.body.appendChild(div)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
}

getXml.onclick = () => {
    request.open('GET', '/4.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const dom = request.responseXML
                const text = dom.getElementsByTagName('warning')[0].textContent
                console.log(text.trim())
            } else {
                alert('加载xml失败')
            }
        }
    }
    request.send()
}

getJson.onclick = () => {
    request.open('GET', '/5.json')
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                const object = JSON.parse(request.response)
                myName.textContent = object.name
            } else {
                alert('加载json失败')
            }
        }
    }
    request.send()
}

