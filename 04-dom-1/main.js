const div = dom.create('<div>newDiv</div>')

test.after(test, div)

const div2 = dom.create('<div id="parent"></div>')

dom.wrap(test, div2)

dom.empty(empty)

dom.attr(test, 'title', '你好')

dom.style(test, 'color', 'red')
dom.style(test, { border: '1px solid red' })
console.log(dom.style(test, 'color'))