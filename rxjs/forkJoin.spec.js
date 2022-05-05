const { Observable } = require("./Observable");
const { forkJoin } = require('./forkJoin');

describe('测试 forkJoin ', () => {
    /**
     * @type {Observable}
     */
    let source$;
    beforeEach(() => {
        const source1$ = new Observable(observer => {
            const t = setTimeout(() => {
                observer.next(1);
                observer.complete();
            }, 1000);
            return () => {
                window.clearTimeout(t);
            }
        })

        const source2$ = new Observable(observer => {
            const t = setTimeout(() => {
                observer.next(2);
                observer.complete();
            }, 2000);
            return () => {
                window.clearTimeout(t);
            }
        })
        source$ = forkJoin([source1$, source2$]);
    })

    it('2s后结束', (done) => {
        source$.subscribe(v => {
            // console.log(v);
            expect(v).toEqual([1, 2]);
            done();
        })
    })
});