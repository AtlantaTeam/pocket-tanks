import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import {
    StaticRouter,
    StaticRouterContext,
} from 'react-router';
import { Provider } from 'react-redux';

import { App } from 'components/App/App';
import { history, initializeStore } from './redux/store';
import { getInitialState } from './redux/reducers/getInitalState';

export const serverRenderMiddleware = (
    req: Request,
    res: Response,
) => {
    const location = req.url;
    const context: StaticRouterContext = {};
    const { store } = initializeStore(getInitialState());

    console.log(store);

    const jsx = (
        <Provider store={store}>
            <StaticRouter context={context} location={location}>
                <App history={history} />
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
        .status(context.statusCode || 200)
        .send(getHtml(reactHtml, reduxState));
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
