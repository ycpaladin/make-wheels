const { Observable } = require("./Observable");
const { combineLatest } = require('./combineLatest');

describe('测试 combineLatest ', () => {
    /**
     * @type {Observable}
     */
    let source$;
    beforeEach(() => {
        const source1$ = new Observable(observer => {
            const t = setTimeout(() => {
                observer.next(1);
            }, 1000);
            return () => {
                observer.complete();
                window.clearTimeout(t);
            }
        })

        const source2$ = new Observable(observer => {
            const t = setTimeout(() => {
                observer.next(2);
            }, 2000);
            return () => {
                observer.complete();
                window.clearTimeout(t);
            }
        })
        source$ = combineLatest([source1$, source2$]);
    })

    it('2s后结束', (done) => {
        source$.subscribe(v => {
            // console.log(v);
            expect(v).toEqual([1, 2]);
            done();
        })
    })
});