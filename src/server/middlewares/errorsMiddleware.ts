import {
    NextFunction,
    Request,
    Response,
} from 'express';

export const errorsMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        return next(err);
    }

    const { response } = err;
    const { status, data } = response;
    const { reason } = data;
    if (status) res.status(status);
    if (reason) res.send({ reason });

    return next();
};
