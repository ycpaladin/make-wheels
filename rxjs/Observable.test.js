// import { test } from 'jest';
const { Observable } = require('./Observable')


describe('测试 Observable', () => {

        let destoryFn = null;
        let observable = null;
        let subscriber = null;
        let unsubscribe = null;
        beforeEach(() => {
            destoryFn = jest.fn();
            observable = new Observable(observer => {
                observer.next('111');
                observer.next('222');
                observer.next('333');
                return destoryFn;
            });
            subscriber = jest.fn();
            unsubscribe = observable.subscribe(subscriber);
        })


        it('订阅', () => {
            expect(subscriber.mock.calls.length).toBe(3);
            expect(subscriber.mock.calls[0][0]).toBe('111');
            expect(subscriber.mock.calls[1][0]).toBe('222');
            expect(subscriber.mock.calls[2][0]).toBe('333');
        });

        it('取消订阅', () => {
            unsubscribe.unsubscribe();
            expect(destoryFn.mock.calls.length).toBe(1);
        });

        it('多个订阅取消', () => {

        });
    })
    // test('Subscribe Observable', () => {
    //   // expect(1 + 2).toBe(3);


// });