const errorHandler = async (err, req, res, next) => {
  if (!err) return;

  console.log(err.statusCode);

  const statusCode = res.statusCode
    ? res.statusCode
    : err.statusCode
    ? err.statusCode
    : 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error",
    err: process.env.NODE_ENV === "production" ? undefined : err,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });

  next();
};

module.exports = errorHandler;
