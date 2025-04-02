const errorMiddleware = (err, req, res, next) => {
  try {
    console.error(err);

    let error = { ...err };
    error.message = err.message;

    //Mongoose bad ObjectId
    if (err.name === "CastError") {
      const message = `Resource with this ${err.path}: ${err.value} not found`;
      error = new Error(message);
      error.statusCode = 404;
    }

    //Mongoose duplicate key
    if (err.code === 11000) {
      const message =
        "Resource with this ${err.path}: ${err.value} already exists";
      error = new Error(message);
      error.statusCode = 400;
    }

    //Mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((el) => el.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
