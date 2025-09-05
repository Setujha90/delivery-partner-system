class ApiError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }

    send(res) {
        console.error(this.stack, this.errors);
        res.status(this.statusCode).json({
            success: false,
            message: this.message,
            errors: this.errors || [],
        });
    }
}

export default ApiError;
