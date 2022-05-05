const { Observable } = require("./Observable");

/**
 * 
 * @param {Observable[]} source 
 */
module.exports = {
    combineLatest: function combineLatest(source) {
        return new Observable(subscribe => {
            const listOfValue = [];
            const subscription = source.map((item, index) => item.subscribe(value => {
                listOfValue[index] = value;
                if (source.length === listOfValue.length) {
                    subscribe.next(listOfValue);
                }
            }))

            return () => {
                subscribe.complete();
                subscription.forEach(s => s.subscribes());
            }
        })
    }
}