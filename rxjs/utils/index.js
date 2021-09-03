

const isSubscribe = (nextOrSubscribe) => {
  if (nextOrSubscribe.next && typeof nextOrSubscribe.next === 'function') {
    return true;
  }
  return false;
}

exports.isSubscribe = isSubscribe;
