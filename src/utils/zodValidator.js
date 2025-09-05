import { ZodError } from "zod";
import ApiError from "./ApiError.js";
import { STATUS_CODE } from "./statuscode.const.js";

export const zodValidator = (schema, data) => {
    try {
        return schema.parse(data);
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessages = error.issues.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));

            throw new ApiError(
                STATUS_CODE.BAD_REQUEST,
                "Validation failed",
                errorMessages
            );
        }

        throw new ApiError(
            STATUS_CODE.INTERNAL_SERVER_ERROR,
            "An unexpected error occurred while validating data."
        );
    }
};
