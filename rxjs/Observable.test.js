// import { test } from 'jest';
const { Observable } = require('./Observable')


describe('测试 Observable', () => {
  it('订阅', () => {
    const observable = new Observable(observer => {
      observer.next('111');
      observer.next('222');
      observer.next('333');
      return () => {
      }
    });

    observable.subscribe(value => {
      // console.log(value);
      expect(value).toEqual('111')
    })
  })
})
test('Subscribe Observable', () => {
  // expect(1 + 2).toBe(3);


});