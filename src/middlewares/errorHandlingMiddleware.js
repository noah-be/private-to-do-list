function errorHandlingMiddleware(error, req, res, next) {
    console.error(error);

    if (process.env.NODE_ENV === 'development') {
        errorResponse.error.stack = error.stack;
    }

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            type: 'GenericError',
            message: message,
        }
    });
}

export default errorHandlingMiddleware;