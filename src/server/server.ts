import path from 'path';
import express, { RequestHandler } from 'express';
import cors from 'cors';
import http from 'http';
import https from 'https';

import compression from 'compression';
import 'babel-polyfill';
import webpack from 'webpack';
import selfSigned from 'openssl-self-signed-certificate';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import { sequelize } from 'db';
import { dbRouter } from 'db/routes/dbRouter';
import { populateDB } from 'db/seeds/seeder';
import { csp } from './middlewares/csp';

import { serverRenderMiddleware } from './middlewares/serverRenderMiddleware';

import { clientConfig } from '../../configs/webpack/client.config';
import { checkAuth } from './middlewares/checkAuthMiddleware';

import { authRouter } from './routers/authRouter';
import { errorsMiddleware } from './middlewares/errorsMiddleware';
import { userRouter } from './routers/userRouter';

const { NODE_ENV, IS_POPULATE_DB } = process.env;
const IS_DEV = NODE_ENV === 'development';

// Эта функция возвращает middleware для локального девсервера и HMR
// Она должна работать только для режима разработки
function getWebpackMiddlewares(
    config: webpack.Configuration,
): RequestHandler[] {
    if (IS_DEV) {
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
    return [];
}

const app = express();

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
    .use(express.json())
    .use(checkAuth())
    .use('/', authRouter)
    .use('/', userRouter)
    .use('/', dbRouter)
    .use(errorsMiddleware)
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

const initDB = async () => {
    // console.log(process.env);
    try {
        if (IS_POPULATE_DB === 'true') {
            await sequelize.sync({ force: true });
            try {
                await populateDB();
                console.log('Populate DB: Ok!');
            } catch (err) {
                console.log('Populate DB Error: ', err);
            }
        } else {
            await sequelize.sync();
        }
        console.log('Inited DB: Ok!');
    } catch (err) {
        console.log('sequelize err:', err);
    }
};
initDB()
    .then(() => true)
    .catch((err) => {
        console.log('Failed to init DB', err);
    });

const server = serverApp;

export { server };
