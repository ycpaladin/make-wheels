class Observable {

  /**
   * 
   * @param {() => void} subscribe 
   */
  constructor(subscribe) {
    this._subscribe = subscribe;
    this._error = false;
    this._complete = false;
    this.source = null;
    this.operator = null;
  }

  // 
  /**
   * 该方法与操作符有关, 通过此方法创建出来的 Observable 的subscribe方法执行不一样
   * @param {{ call(subscribe, source: Observable): void }} operator 
   * @returns 
   */
  lift(operator) {
    const nextObservable = new Observable(); // 这里new的Observable没有参数
    nextObservable.source = this; // 但是会指定source
    nextObservable.operator = operator; // 还有操作符
    return nextObservable;
  }

  subscribe(next, error, complete) {
    // const subscribe 

    // 
    const { source, operator } = this; // 通过lift方法创建的Observable没有 this._subscribe对象
    const subscribe = {
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

    // 如果有操作符，则要调用操作符方法
    const unsubscribe = operator ? operator.call(subscribe, source) : this._subscribe(subscribe);
    return new Subscription(unsubscribe);
  }

  pipe(...args) {
    args.reduce(
      /**
       * 
       * @param {any} prev 
       * @param {(source: Observable) => Observable} curr 
       * @param {*} index 
       */
      (prev, fn, index) => {
        return fn(this)()
      })
    return this;
  }
}

class Subscription {

  constructor(unsubscribe) {
    this.unsubscribe = unsubscribe;
    this.subscribes = [];
  }

  add(subscribe) {
    this.subscribes.push(subscribe);
  }


  unsubscribe() {
    this.unsubscribe();
    this.subscribes.forEach(f => {
      f();
    })
  }
}

class Subject extends Observable {
  constructor() {
    super();
    this.observers = [];
  }

  next(value) {
    if (this._complete) {
      throw new Error('this observable has completed!')
    }
    // this.observer.next(value);
    this.observers.forEach(observer => {
      observer.next(value);
    })
  }

  error(e) {
    this.observers.forEach(observer => {
      observer.error(value);
    })
  }

  complete() {
    if (this._complete) {
      throw new Error('this observable has completed!')
    }
    this._complete = true;
    this.observers.forEach(observer => {
      observer.complete(value);
    })
  }

  subscribe(next, error, complete) {
    const subscribe = {
      next,
      error,
      complete
    }
    const { source, operator } = this;
    const unsubscribe = operator ? operator.call(subscribe, source) : new Subscription(() => {
      const index = this.observers.findIndex(o => o === subscribe);
      // console.log('取消订阅', index)
      this.observers.splice(index, 1);
    });
    this.observers.push(subscribe)
    return unsubscribe;
  }
}


exports.Observable = Observable;
exports.Subject = Subject;
exports.Subscription = Subscription;


