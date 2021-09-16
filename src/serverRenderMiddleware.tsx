import React from 'react';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import { StaticRouterContext } from 'react-router';

import { App } from 'components/App/App';

let jsx: JSX.Element;

export const serverRenderMiddleware = (req: Request, res: Response) => {
    const location = req.url;
    const context: StaticRouterContext = {};

    jsx = (<App context={context} location={location} />);

    const reactHtml = renderToString(jsx);

    if (context.url) {
        res.redirect(context.url);
        return;
    }

    res
        .status(context.statusCode || 200)
        .send(getHtml(reactHtml));
};

function getHtml(reactHtml: string) {
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
            </script>
            <script defer src="/main.js"></script>
        </body>
        </html>
    `;
}
