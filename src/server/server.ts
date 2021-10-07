import path from 'path';
import express, { RequestHandler } from 'express';
import 'babel-polyfill';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import axios from 'axios';

import { csrf } from './middlewares/csrf';
import { csp } from './middlewares/csp';

import { serverRenderMiddleware } from './middlewares/serverRenderMiddleware';

import { clientConfig } from '../../configs/webpack/client.config';
import { checkAuth } from './middlewares/auth';

// Эта функция возвращает middleware для локального девсервера и HMR
// Она должна работать только для режима разработки
function getWebpackMiddlewares(
    config: webpack.Configuration,
): RequestHandler[] {
    const compiler = webpack({
        ...config,
        mode: 'development',
    });

    return [
        // Middleware для Webpack-билда проекта в реальном времени. Низкоуровневый аналог webpack-dev-server
        devMiddleware(compiler),
        // Middleware для HMR
        hotMiddleware(compiler, { path: '/__webpack_hmr' }),
    ] as RequestHandler[];
}

const app = express();

const rootDir = process.cwd();

// console.log(__dirname);

/* axios.post(`https://ya-praktikum.tech/api/v2/auth/signin`, {
    "login": "Pochta",
    "password": "111111"
  })

// Отдаём статику приложения
 */

app
    .use(express.static(path.resolve(rootDir, 'dist')))
    .use(cookieParser())
    .use(csrf())
    .use(express.json())
    .use(checkAuth());

// На все get запросы запускаем сначала middleware dev server, а потом middleware рендеринга приложения
app.get(
    '/*',
    [
        ...getWebpackMiddlewares(clientConfig),
    ],
    serverRenderMiddleware,
);

export { app };
