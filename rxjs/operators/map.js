const { Observable } = require('../Observable');
/**
 * 
 * @param {(value: any) => any} project 
 */
module.exports.map = function (project) {
  /**
   * @param {Observable} source
   */
  return function (source) {
    return source.lift(
      /**
       * 此时的function的上下文this是一个 subscriber
       * @param {Observable} liftedSource 
       * @this {{ next: (value: any) => void}}
       */
      function (liftedSource) {
        // this is subscriber
        const sub = liftedSource.subscribe({
          ...this,
          next: value => {
            this.next(project.call(null, value));
          }
        })
        // return () => {
        //   sub.unsubscribe();
        // }
        return sub;
      }
    )
  }
}