const { Observable, Subscription } = require('../cyRxjs');

module.exports.tap = (callback) => {
  /**
   * @param {Observable} source
   */
  return source => {
    return source.lift(
      /**
       * 
       * @param {Observable} leftedSource 
       * @this {Observable}
       * @returns {Subscription}
       */
      function (leftedSource) {
        const sub = leftedSource.subscribe({
          ...this,
          next: value => {
            callback(value);
            this.next(value);
          }
        })
        return sub;
      }
    )
  }
}