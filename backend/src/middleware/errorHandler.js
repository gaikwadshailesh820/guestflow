/**
 * Central error-handling middleware (must be registered last, after all
 * routes). Any route handler that calls next(err) — or throws inside an
 * async handler wrapped with asyncHandler — ends up here.
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error(`[error] ${req.method} ${req.originalUrl} ->`, err.message);

  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Internal server error" : err.message,
  });
}

module.exports = errorHandler;
