
// const { Observable, Subject } = require('./rxjs/cyRxjs');
const { map, tap } = require('rxjs/operators');
const { Observable, Subject } = require('rxjs');

const subject = new Subject();
const sub = subject.pipe(
  map(v => v * 2),
  tap(v => {
    console.log('tap', v);
  })
).subscribe(v => {
  console.log(v);
})
subject.next(22);

sub.unsubscribe();

