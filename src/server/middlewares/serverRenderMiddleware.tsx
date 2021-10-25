import url from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { NextFunction, Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';
import { matchPath, StaticRouterContext } from 'react-router';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { SagaMiddleware } from 'redux-saga';

import { ROUTES } from 'utils/constants/routes';
import { App } from 'components/App/App';
import { fetchUserInfoFulfilled } from '../../redux/actions/user-state/user-info';
import { loginFulfilled } from '../../redux/actions/user-state/login';
import { initializeStore } from '../../redux/store';
import { getInitialState } from '../../redux/reducers/getInitalState';
import { getUserInfo, isUserAuth } from '../utils/userLocals';
import { rootSaga } from '../../redux/sagas';
import { setAuthCookie } from '../../redux/actions/auth-cookie-state';

export type AppStore = Store & {
    runSaga: SagaMiddleware['run'];
    close: () => void;
};
export const serverRenderMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const location = req.url;
    const xsrf = req.csrfToken();
    const context: StaticRouterContext = {};

    const { store } = initializeStore(
        getInitialState(location),
        location,
    );

    if (isUserAuth(res)) {
        const userInfo = getUserInfo(res);
        store.dispatch(loginFulfilled());
        store.dispatch(fetchUserInfoFulfilled(userInfo));
        const { authCookie, uuid } = req.cookies;
        if (authCookie && uuid) {
            const cookie = `authCookie=${authCookie as string}; uuid=${uuid as string}`;
            store.dispatch(setAuthCookie(cookie));
        }
    }

    const renderApp = () => {
        const jsx = (
            <Provider store={store}>
                <StaticRouter context={context} location={location}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        const reactHtml = renderToString(jsx);
        const reduxState = store.getState();

        if (context.url) {
            res.redirect(context.url);
            return;
        }
        res
            .cookie('XSRF-TOKEN', xsrf)
            .status(context.statusCode || 200)
            .send(getHtml(reactHtml, reduxState));
    };

    store
        .runSaga(rootSaga)
        .toPromise()
        .then(() => renderApp())
        .catch((err) => next(err));

    const dataRequirements: (Promise<void> | void)[] = [];

    ROUTES.some((route) => {
        if ('fetchData' in route) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const { fetchData: fetchMethod } = route;
            const match = matchPath<{ slug: string }>(
                String(url.parse(location).pathname),
                route,
            );

            if (fetchMethod && match) {
                const data = {
                    storeItem: store,
                    match,
                };
                dataRequirements.push(
                    fetchMethod(data),
                );
            }
            return Boolean(match);
        }
        return false;
    });

    // When all async actions will be finished,
    // dispatch action END to close saga
    return Promise.all(dataRequirements)
        .then(() => store.close())
        .catch((err) => next(err));
};

function getHtml(reactHtml: string, reduxState = {}) {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Pocket-Tanks || SSR</title>
            <link href="css/style.css" rel="stylesheet">
        </head>
        <body>
            <div id="root">${reactHtml}</div>
            <script>
                // Записываем состояние редакса, сформированное на стороне сервера в window
                // На стороне клиента применим это состояние при старте
                window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
            </script>
            <script defer src="/main.js"></script>
        </body>
        </html>
    `;
}
