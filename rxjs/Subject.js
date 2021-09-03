const { Observable } = require('./Observable');
const { isSubscribe } = require('./utils');
const { Subscription } = require('./Subscription');

class Subject extends Observable {
  constructor() {
    super();
    this.observers = []; // 将订阅者添加到此数组中
  }

  next(value) {
    if (this._complete) {
      throw new Error('this observable has completed!')
    }
    // 给每一个订阅者发送消息
    this.observers.forEach(observer => {
      observer.next(value);
    })
  }

  error(e) {
    this.observers.forEach(observer => {
      observer.error(e);
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

  subscribe(nextOrSubscriber, error, complete) {

    const subscriber = isSubscribe(nextOrSubscriber) ? nextOrSubscriber : {
      next: nextOrSubscriber,
      error,
      complete
    }
    const { source, operator } = this;
    const unsubscribe = operator ? operator.call(subscriber, source) : new Subscription(() => {
      const index = this.observers.findIndex(o => o === subscriber);
      this.observers.splice(index, 1);
    });
    this.observers.push(subscriber)
    return unsubscribe;
  }
}

Subject.prototype.lift = function (operator) {
  const liftedSource = new Subject();
  liftedSource.source = this;
  liftedSource.operator = operator;
  return liftedSource;
}

exports.Subject = Subject;
