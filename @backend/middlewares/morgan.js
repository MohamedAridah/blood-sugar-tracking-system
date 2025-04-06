const morganLogger = async (req, res, next) => {
  console.log(
    `${req.method.toUpperCase()}\t${req.headers.origin}\t${req.originalUrl}`
  );
  next();
};

module.exports = morganLogger;
