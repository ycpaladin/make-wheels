const { Observable } = require('../Observable');
const { Subscription } = require('../Subscription');


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