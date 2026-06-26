/** Wraps a route handler so any thrown error (sync or async) reaches errorHandler via next(). */
function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/** Throws a plain Error tagged with an HTTP status, for use inside handlers. */
function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = { asyncHandler, httpError };
