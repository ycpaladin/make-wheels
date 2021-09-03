exports.Subscription = class Subscription {

  constructor(unsubscribe) {
    this.unsubscribe = unsubscribe;
    /**
     * @type {((() => void)[])} 
     */
    this.subscribes = [];
  }

  /**
   * 
   * @param {() => void} subscribe 
   */
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
