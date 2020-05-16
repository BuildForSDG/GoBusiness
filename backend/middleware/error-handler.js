/* eslint-disable no-case-declarations */
// global error handling for routes
const errorHandler = (err, req, res, next) => {
  switch (true) {
    case typeof err === 'string':
      // custom application error
      const is404 = err.toLowerCase().endsWith('not found');
      const statusCode = is404 ? 404 : 400;
      res.status(statusCode).json({
        message: err
      });
      break;
    case err.name === 'ValidationError':
      // mongoose validation error
      res.status(400).json({
        message: err.message
      });
      break;
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      res.status(401).json({
        message: 'Invalid Token'
      });
      break;
    default:
      res.status(500).json({
        message: err.message
      });
      next();
  }
};

module.exports = errorHandler;
