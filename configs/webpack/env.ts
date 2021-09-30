import path from 'path';

const rootDir = process.cwd();

const IS_DEV = process.env.NODE_ENV !== 'production';
const SRC_DIR = path.join(rootDir, 'src');
const STATIC_DIR = path.join(rootDir, 'static');
const DIST_DIR = path.join(rootDir, 'dist');

export {
    IS_DEV, SRC_DIR, DIST_DIR, STATIC_DIR,
};
