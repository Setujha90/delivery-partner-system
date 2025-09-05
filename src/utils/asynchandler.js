import ApiError from "./ApiError.js";

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            if (err instanceof ApiError) {
                return err.send(res);
            }
            console.error("Unhandled error:", err);
            const statusCode = err.statusCode || 500;
            const message = err.message || "Internal Server Error";
            new ApiError(
                statusCode,
                message,
                err.errors || []
            ).send(res);
        });
    };
};

export default asyncHandler;
