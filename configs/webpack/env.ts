import path from 'path';

const rootDir = process.cwd();

const {
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, YANDEX_CLIENT_ID, YANDEX_CLIENT_SECRET, NODE_ENV,
} = process.env;
const IS_DEV = NODE_ENV === 'development';
const SRC_DIR = path.join(rootDir, 'src');
const STATIC_DIR = path.join(rootDir, 'static');
const DIST_DIR = path.join(rootDir, 'dist');

export {
    IS_DEV, SRC_DIR, DIST_DIR, STATIC_DIR,
    GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, YANDEX_CLIENT_ID, YANDEX_CLIENT_SECRET, NODE_ENV,
};
