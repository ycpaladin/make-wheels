

function EventBus() {
  const observer = new Map();
  return {
    on(type, callback) {
      const target = observer.get(type) || [];
      target.push(callback);
      observer.set(type, target);
      return () => {
        const index = target.findIndex(o => o === callback);
        target.splice(index, 1);
      }
    },
    emit(type, value) {
      const target = observer.get(type);
      if (target && target.length) {
        target.forEach(fn => fn(value))
      }
    },
    off(type) {
      observer.delete(type);
    }
  }
}