
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
    this.status = 'fulfilled'
    // value就是resolve方法的执行结果
    /**
     * @param {(value: number) => void} outer 这里是then方法中传入的参数
     */
    return (outer) => {
      return outer(value) // 
    }
  }

  /**
   * 
   * @param {string} reason 
   */
  function reject(reason) {
    if (this.status === 'pending') {
      this.onrejected = ___onrejected.call(this, reason)
    }
  }

  /**
   * 
   * @param {Error} reason 
   */
  function ___onrejected(reason) {
    this.status = 'rejected'
    return (outer) => {
      reason = isError(reason) ? reason : new Error(reason)
      return outer(reason)
    }
  }


  /**
   * @param {(value: number) => void} onfulfilled
   * @param {(reason: any) => void} onrejected
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
            if (!onrejected) {
              onrejected = (reason) => reason
            }
            const nextReject = self.onrejected(onrejected)
            reject(nextReject)
            break
          case 'pending':   // 
          default:
              setTimeout(waitStatus, 0) // 继续等待
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