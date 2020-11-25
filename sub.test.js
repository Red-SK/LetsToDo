const { test, expect } = require("@jest/globals");

import sub from './pages/calendar/sub'

test('3 - 1', ()=>{
    expect(sub(3,1)).toBe(2)
})