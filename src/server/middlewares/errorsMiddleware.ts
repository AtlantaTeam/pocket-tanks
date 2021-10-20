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
    res.status(response?.status || 500).send(response?.data?.reason || message);

    return next();
};
