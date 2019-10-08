
const is = (typeAsString) => obj => Object.prototype.toString.call(obj) === typeAsString

const isError = is('[object Error]')


/**
 * 自定义Promise对象
 * @param {(resolve: (value: any) => void, reject: (reason: any) => void) => void} executor 
 */
function MyPromise(executor) {
  if (!(this instanceof MyPromise)) {
    throw '只能new该方法'
  }
  this.executor = executor
  // 初始状态为pending...
  this.status = 'pending'

  /**
   * 内部判定状态，只有处于pending状态才可继续执行
   * @param {number} value 
   */
  function resolve(value) {
    if (this.status === 'pending') {
      this.onfulfilled = ___onfulfilled.call(this, value)
    }
  }

  /**
   * 为了缓存resolve方法的执行结果
   * @param {*} value 
   */
  function ___onfulfilled(value) {
    this.status = 'fulfilled'   // 更改内部状态
    // value就是resolve方法的执行结果
    /**
     * @param {(value: number) => void} onfulfilled 这里是then方法中传入的参数
     */
    return (onfulfilled) => {
      return onfulfilled(value) // 
    }
  }

  /**
   * 触发异常的方法
   * @param {string} reason 
   */
  function reject(reason) {
    if (this.status === 'pending') {
      this.onrejected = ___onrejected.call(this, reason)
    }
  }

  /**
   * 
   * @param {Error} reason 如果传入的不是一个Error对象，那么会使用Error包装一下
   */
  function ___onrejected(reason) {
    this.status = 'rejected'    // 更改内部状态
    return (onrejected) => {
      reason = isError(reason) ? reason : new Error(reason)
      return onrejected(reason)
    }
  }


  /**
   * @param {(value: number) => void} onfulfilled 处理成功的函数
   * @param {(reason: any) => void} onrejected 处理出现异常的函数，如果传入该参数，那么catch方法就捕获不到了
   */
  this.then = function(onfulfilled, onrejected) {
    const self = this
    return new MyPromise((resolve, reject) => {
      setTimeout(function waitStatus() {
        switch (self.status){
          case 'fulfilled': // resolved
            if (onfulfilled) {
              const nextValue = self.onfulfilled(onfulfilled) 
              resolve(nextValue)
            } else {
              resolve()
            }
            break
          case 'rejected':  // rejected
            if (!onrejected) { // 如果没有传递onrejected参数，默认实现一个，确保catch方法能够捕获到
              onrejected = (reason) => reason
            }
            const nextReject = self.onrejected(onrejected)
            reject(nextReject)
            break
          case 'pending':   // 
          default:
              setTimeout(waitStatus, 0) // 只要是pending状态，继续等待，直到不是pending
              break
        }
      }, 0);
    })
  }

  /**
   * 捕获异常
   * @param {(reason: any) => void} onrejected
   */
  this.catch = function(onrejected) {
    const self = this
    setTimeout(function reject() {
      if (self.status === 'rejected') {
        self.onrejected(onrejected)
      } else {
        setTimeout(reject, 0);
      }
    }, 0);
  }

  // 直接执行
  this.executor(resolve.bind(this), reject.bind(this));
}

MyPromise.resolve = function(value) {
  return new MyPromise((resolve) => resolve(value))
}

MyPromise.reject = function(reason) {
  return new MyPromise((resolve, reject) => reject(reason))
}


module.exports = MyPromise