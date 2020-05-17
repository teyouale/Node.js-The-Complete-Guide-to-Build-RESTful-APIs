function log(req, res, next) {
  console.log('Logging');
  next(); ////--> if we didn't use Next Function it Didn't Exceture Other Middlewares
}

module.exports = log;
