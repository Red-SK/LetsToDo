import { fetchData , fetchTwoData, fetchThreeData } from './fetchData.js'

test('fetchData 测试',()=>{
   fetchData((data)=>{
       expect(data).toEqual({
           success: true
       })
        done()
   })
  })

test('FetchTwoData 测试', ()=>{
    return  fetchTwoData().then((response)=>{
         expect(response.data).toEqual({
             success: true
         })
    })
})

test('FetchThreeData 测试', ()=>{
    expect.assertions(1)  // 断言，必须执行一次expect
    return fetchThreeData().catch((e)=>{
      expect(e.toString().indexOf('404')> -1).toBe(false)

    })
})