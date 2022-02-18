const MyPromise = require('../src/MyPromise1')

describe('测试MyPromise1', () => {
    /**
     * @type {MyPromise}
     */
    let myPromise = null;
    /**
     * @type {MyPromise}
     */
    let myPromiseAsync = null;

    let resolveFun = null;
    let resolveFunAsync = null;
    beforeEach(() => {
        myPromise = new MyPromise((resolve, reject) => {
            resolve('123')
        })

        myPromiseAsync = new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve('123 async')
            }, 2000)
        })

        // resolveFun = jest.fn();
        // resolveFunAsync = jest.fn();
    });

    // it('MyPromise.resolve value is "123"', () => {
    //     expect(MyPromise.resolve('123')).resolves.toBe('123');
    // })

    // it('MyPromise.reject value is "error"', () => {
    //     expect(MyPromise.reject('error')).rejects.toBe('error');
    // })

    it('then value is "123"', (done) => {
        new MyPromise(resolve => {
            resolve('123')
        }).then(value => {
            expect(value).toBe('123');
            done();
        })
    })

    // it('myPromise.resolves value is "123"', () => {
    //     expect(myPromise).resolves.toBe('123')
    // })

    // it('async then value is "123 async"', () => {
    //     expect(myPromiseAsync).resolves.toBe('123 async')
    // })

    // it('myPromiseAsync.resolves value is "123 async"', (done) => {
    //     new MyPromise((resolve, reject) => {
    //         setTimeout(() => {
    //             resolve('123 async')
    //         }, 2000)
    //     }).then(value => {
    //         expect(value).toBe('123 async')
    //         done();
    //     })
    // })
})