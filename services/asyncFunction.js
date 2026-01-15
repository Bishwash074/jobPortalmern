

const asyncError = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Server Error",
        error: err.message,
      });
    }
  };
};

module.exports = { asyncError };

