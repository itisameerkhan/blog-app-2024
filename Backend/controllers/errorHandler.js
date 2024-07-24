export const errorHandler = (err, req, res, next) => {
  res.json({
    success: false,
    errorCode: err.code || 200,
    message: err.message || "No Error Message",
    data: [],
  });
};
