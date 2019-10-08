
const MyPromise = require('../src')

// 覆盖nodejs环境中默认的Promise对象
global.Promise = MyPromise

async function test () {
  const r = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(121)
    }, 1000);
  })
  console.log(r)
}

test()