
const { Observable, Subject } = require('./rxjs');
const { map, tap } = require('./rxjs/operators');
// const { map, tap } = require('rxjs/operators');
// const { Observable, Subject } = require('rxjs');

const subject = new Subject();
const source$ = subject.pipe(
  map(v => {
    return v * 2;
  }),
  tap(v => {
    console.log('tap', v);
  }),
  map(v => v * 4),
  // tap(v => {
  //   console.log('tap', v);
  // })
)
const sub = source$.subscribe(v => {
  console.log('===>', v);
})

const sub2 = source$.subscribe(v  => {
  console.log('sub2', v)
})

subject.next(22);
// subject.next(33);

sub.unsubscribe();
sub2.unsubscribe();
