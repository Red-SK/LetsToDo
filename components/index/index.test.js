// /test/components/index.test.js
const simulate = require('miniprogram-simulate')
 
test('components/index', () => {
    const id = simulate.load('E:/Lets/Double-Ten/components/index/index') 
    const comp = simulate.render(id) 
 
    const parent = document.createElement('parent-wrapper') 
    comp.attach(parent) 
 
    const view = comp.querySelector('.index') 
    expect(view.dom.innerHTML).toBe('index.properties') 
    expect(window.getComputedStyle(view.dom).color).toBe('green') 
})