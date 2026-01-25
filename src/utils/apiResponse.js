// Success response helper
class ApiResponse {
    static success(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    static created(res, data, message = 'Resource created successfully') {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }

    static error(res, message = 'Error', statusCode = 500, errors = null) {
        const response = {
            success: false,
            message
        };

        if (errors) {
            response.errors = errors;
        }

        return res.status(statusCode).json(response);
    }

    static badRequest(res, message = 'Bad request', errors = null) {
        return ApiResponse.error(res, message, 400, errors);
    }

    static unauthorized(res, message = 'Unauthorized') {
        return ApiResponse.error(res, message, 401);
    }

    static forbidden(res, message = 'Forbidden') {
        return ApiResponse.error(res, message, 403);
    }

    static notFound(res, message = 'Resource not found') {
        return ApiResponse.error(res, message, 404);
    }

    static validationError(res, errors) {
        return res.status(422).json({
            success: false,
            message: 'Validation failed',
            errors
        });
    }

    static paginated(res, data, page, limit, total, message = 'Success') {
        const totalPages = Math.ceil(total / limit);
        
        return res.status(200).json({
            success: true,
            message,
            data,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        });
    }
}

export default ApiResponse;
