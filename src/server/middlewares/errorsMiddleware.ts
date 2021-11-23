import { NextFunction, Request, Response } from 'express';

export const errorsMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        return next(err);
    }

    const { response, message } = err;
    // res.status(response?.status || 500).json({ error: response?.data?.reason || message });
    res.locals.error = { message: response?.data?.reason || message };

    return next();
};
