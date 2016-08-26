export function throttle(callback, limit, args) {
  var wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, args);
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  }
}
