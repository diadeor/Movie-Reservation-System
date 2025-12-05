const ErrorMiddleware = async (err, req, res, next) => {
  try {
    res.status(err.statusCode || 400).json({
      success: false,
      error: err.message,
    });
  } catch (error) {
    console.log("Error in error middleware", error.message);
    res.status(error.statusCode || 500).send("Internal server error while handling another error");
  }
};

export default ErrorMiddleware;
