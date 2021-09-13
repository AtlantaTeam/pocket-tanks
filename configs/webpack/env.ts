import path from 'path';

const IS_DEV = process.env.NODE_ENV !== 'production';
const SRC_DIR = path.join(__dirname, '../../src');
const STATIC_DIR = path.join(__dirname, '../../static');
const DIST_DIR = path.join(__dirname, '../../dist');

export {
    IS_DEV, SRC_DIR, DIST_DIR, STATIC_DIR,
};
