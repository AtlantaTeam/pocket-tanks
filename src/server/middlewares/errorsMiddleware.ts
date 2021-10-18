import { NextFunction, Request, Response } from 'express';
import { IS_DEV } from '../../../configs/webpack/env';

export const errorsMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        return next(err);
    }
    if (IS_DEV) {
        console.log(err);
    } else if (err.response.status !== undefined) {
        res.status(err.response.status);
        res.send(err.response.reason);
    } else {
        res.status(500);
        res.send(err);
    }

    return next();
};
