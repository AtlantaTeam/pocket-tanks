import path from 'path';
import express, { RequestHandler } from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';
import selfSigned from 'openssl-self-signed-certificate';

import compression from 'compression';
import 'babel-polyfill';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';

import { csrf } from './middlewares/csrf';
import { csp } from './middlewares/csp';

import { serverRenderMiddleware } from './middlewares/serverRenderMiddleware';

import { clientConfig } from '../../configs/webpack/client.config';
import { checkAuth } from './middlewares/checkAuthMiddleware';

import { authRouter } from './routes/authRouter';

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
const { NODE_ENV } = process.env;

const IS_DEV = NODE_ENV === 'development';

const rootDir = process.cwd();

// нужно будет настроить на свой сайт
app.use(
    cors({
        origin: '*',
        credentials: true,
        optionsSuccessStatus: 200,
    }),
);

app.use(express.static(path.resolve(rootDir, 'dist')))
    .use(cookieParser())
    .use(csrf())
    .use(express.json())
    .use(checkAuth())
    .use('/', authRouter)
    .get(
        '/*',
        [
            ...getWebpackMiddlewares(clientConfig),
        ],
        serverRenderMiddleware,
    )
    .use(csp)
    .use(compression);

let serverApp = http.createServer(app);

if (IS_DEV) {
    serverApp = https
        .createServer({ key: selfSigned.key, cert: selfSigned.cert }, app);
}

const server = serverApp;

export { server };