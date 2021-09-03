



function EventEmitter() {
  const observers = [];
  return {
    emit(value) {
      observers.forEach(fn => fn(value))
    },
    subscribe(observer) {
      observers.push(observer)
      return () => {
        const index = observers.findIndex(o => o === observer);
        observers.splice(index, 1);
      }
    }
  }
}

const eventEmitter = EventEmitter();

const subscribe1 = eventEmitter.subscribe(value => {
  console.log('subscribe1', value)
});

const subscribe2 = eventEmitter.subscribe(value => {
  console.log('subscribe2', value)
});

eventEmitter.emit('hello, world!!')
