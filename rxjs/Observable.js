const { isSubscribe } = require('./utils');
const { Subscription } = require('./Subscription');

class Observable {

  /**
   * 
   * @param {(next:(value) => void, error:(err) => void, complete:() => void) => () => void} subscribe 
   */
  constructor(subscribe) {
    /**@type {(next:(value) => void, error:(err) => void, complete:() => void) => () => void} */
    this._subscribe = subscribe;
    this._error = false;
    this._complete = false;
    /**
     * @type {Observable}
     */
    this.source = null;
    /**
     * @type {{call(this: { next(value): void }, source: Observable): { next:(value)=>void;error:(err)=>void;complete:()=> void; }}}
     */
    this.operator = null;
  }

  //
  /**
   * 该方法与操作符有关, 通过此方法创建出来的 Observable 的subscribe方法执行不一样
   * @param {{ call(subscribe, source: Observable): { next:(value)=>void;error:(err)=>void;complete:()=> void; } }} operator 
   * @returns 
   */
  lift(operator) {
    const nextObservable = new Observable(); // 这里new的Observable没有参数
    nextObservable.source = this; // 但是会指定source
    nextObservable.operator = operator; // 还有操作符
    return nextObservable;
  }

  subscribe(next, error, complete) {
    const subscriber = isSubscribe(next) ? next : {
      next: (value) => {
        if (this._error) {
          return;
        }

        if (this._complete) {
          throw new Error('this observable has completed!')
        }

        next && next(value);
      },
      error: () => {
        this._error = true;
        error && error();
      },
      complete: () => {
        if (this._complete) {
          throw new Error('this observable has completed!')
        }
        this._complete = true;
        complete && complete();
      }
    }
    const { source, operator } = this; // 通过lift方法创建的Observable没有 this._subscribe对象
    // 如果有操作符，则要调用操作符方法
    const unsubscribe = operator ? operator.call(subscriber, source) : this._subscribe(subscriber);
    return new Subscription(unsubscribe);
  }

  /**
   * 
   * @param  {...(input$: Observable) => Observable} args 
   * @returns {Observable}
   */
  pipe(...args) {
    return args.reduce(
      (prev, fn) => {
        return fn(prev)
      }, this)
  }
}

exports.Observable = Observable;
