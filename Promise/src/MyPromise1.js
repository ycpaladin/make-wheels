/**
 * 自定义Promise对象
 * @param {(resolve: (value: any) => void, reject: (reason: any) => void) => void} executor 
 * @this {MyPromise}
 */
function MyPromise(executor) {
    if (!(this instanceof MyPromise)) {
        throw '只能new该方法'
    }
    /**
     * @type {'pending' | 'fulfilled' | 'rejected'}
     */
    this.state = 'pending';
    this.result = undefined;
    /**
     * @type {() => void}
     */
    this.thenCallback = undefined;
    this.catchCallback = undefined;
    /**
     * 
     * @param {any} value 
     * @this {MyPromise}
     */
    const resolve = function (value) {
        if (this.state !== 'pending') {
            return;
        }
        this.state = 'fulfilled';
        this.result = value;
        if (value instanceof MyPromise) { // 如果value的类型是一个Promise 则调用then之后再 thenCallback
            value.then(innerValue => {
                if (this.thenCallback) {
                    this.thenCallback(innerValue);
                } else if (this.catchCallback) {
                    this.catchCallback(innerValue)
                }
            })
        } else {
            // 问题在这里，有可能会过段时间之后再注册  `thenCallback`
            // 过几秒之后调用then方法这里就会出现问题
            // setTimeout((function () {
            //     if (this.thenCallback) {
            //         this.thenCallback(value);
            //     } else if (this.catchCallback) {
            //         this.catchCallback(value)
            //     }
            // }).bind(this));

            // 改进，使用setTimeout递归检查 this.thenCallback 或 this.catchCallback 
            function loop() {
                if (this.thenCallback || this.catchCallback) {
                    if (this.thenCallback) {
                        this.thenCallback(value);
                    } else if (this.catchCallback) {
                        this.catchCallback(value)
                    }
                } else {
                    setTimeout(loop.bind(this))
                }
            }
            loop.call(this);
        }
    }

    /**
     * 
     * @param {any} errorValue 
     * @this {MyPromise}
     */
    function reject(errorValue) {
        if (this.state !== 'pending') {
            return;
        }
        this.state = 'rejected'
        this.result = errorValue;
        if (errorValue instanceof MyPromise) {
            errorValue.then(value => {
                // this.catchCallback(errorValue);
                if (this.catchCallback) {
                    this.catchCallback(errorValue);
                } else if (this.thenCallback) {
                    this.thenCallback(errorValue)
                } else {
                    throw 'not catch..'
                }
            })
        } else {
            setTimeout(() => {
                if (this.catchCallback) {
                    this.catchCallback(errorValue);
                } else if (this.thenCallback) {
                    this.thenCallback(errorValue)
                } else {
                    throw 'not catch..'
                }
            });
        }
    }

    executor(resolve.bind(this), reject.bind(this));
}

/**
 * THNE
 * @param {(value: any) => any} callback 
 */
MyPromise.prototype.then = function (callback) {
    const self = this;
    return new MyPromise((resolve, reject) => {
        self.thenCallback = function (value) {
            if (self.state === 'rejected') {
                reject(value);
            } else {
                const result = callback(value);
                resolve(result);
            }
        }
    })
}

MyPromise.prototype.catch = function (callback) {
    const self = this;
    return new MyPromise((resolve, reject) => {
        self.catchCallback = function (value) {
            if (self.state === 'fulfilled') {
                resolve(value)
            } else {
                const result = callback(value);
                reject(result);
            }
        }
    })
}

MyPromise.resolve = function (value) {
    return new MyPromise(resolve => {
        resolve(value);
    })
}

MyPromise.reject = function (error) {
    return new MyPromise((resolve, reject) => {
        reject(error);
    })
}

module.exports = MyPromise

// 缺陷
// const p1 = new MyPromise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('1111')
//     }, 1000);
// })

// 过段时间之后再调用 then 没有响应
// setTimeout(() => {
//     p1.then(v => {
//         console.log(v);
//         return MyPromise.resolve('111@1')
//     })
//         .catch(err => {
//             console.log('err', err)
//             return MyPromise.resolve(123)
//         })
//         .then(v => {
//             console.log('=>', v);
//         })
// }, 3000)


