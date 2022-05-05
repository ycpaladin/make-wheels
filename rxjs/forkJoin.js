const { Observable } = require("./Observable");



module.exports = {
    /**
     * 
     * @param {Observable[]} source 
     */
    forkJoin: function forkJoin(source) {
        return new Observable(subscribe => {
            const listOfValue = [];
            const subscription = source.map((item, index) => item.subscribe(
                value => {
                    listOfValue[index] = value;
                },
                () => { },
                () => { // complete
                    if (source.length === listOfValue.length) {
                        subscribe.next(listOfValue);
                        subscribe.complete();
                    }
                }))

            return () => {
                subscription.forEach(s => s.subscribes());
            }
        })
    }
}