import React from 'react';
import { renderToString } from 'react-dom/server';
import { NextFunction, Request, Response } from 'express';
import { StaticRouter } from 'react-router-dom';
import { StaticRouterContext } from 'react-router';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { SagaMiddleware } from 'redux-saga';

import { App } from 'components/App/App';
import { fetchUserInfoFulfilled } from '../../redux/actions/user-state/user-info';
import { loginFulfilled } from '../../redux/actions/user-state/login';
import { initializeStore } from '../../redux/store';
import { getInitialState } from '../../redux/reducers/getInitalState';
import { getUserInfo, isUserAuth } from '../utils/userLocals';

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

    renderApp();
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
