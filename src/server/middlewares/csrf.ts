import csrfMiddleware from 'csurf';

export const csrf = () => csrfMiddleware({ cookie: true });
