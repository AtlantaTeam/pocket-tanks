import { NextFunction, Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
import formidable from 'formidable';
import FormData from 'form-data';
import { getUserInfo, setUserInfo } from 'server/utils/userLocals';
import { getUserServerToAPI } from 'server/utils/userServerToAPILocals';
import { objectToCamel } from 'ts-case-convert';
import {
    BASE_URL, RESOURCES_BASE_URL, USER_ROUTES, YANDEX_OAUTH_AVATAR,
} from '../../constants/api-routes';

export const changeProfileController = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const userServerToAPI = getUserServerToAPI(res);
    userServerToAPI
        .changeProfile({
            ...req.body,
            phone: '+7 (111) 111-11-11',
        })
        .then((userInfo) => {
            setUserInfo(res, objectToCamel(userInfo.data));
            res.status(200);
            res.send(userInfo.data);
            return userInfo.data;
        })
        .catch((err) => next(err));
};

export const changeAvatarController = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, file) => {
        if (err) {
            next(err);
            return false;
        }
        const { avatar } = file;
        const { path, name } = avatar as formidable.File;
        const formData = new FormData();
        /*
            const rootDir = process.cwd();
            const rawData = fs.readFileSync(path);
            const newPath = `${pathLib.join(rootDir, 'static/uploads')}/${encodeURIComponent(name)}`;
            fs.writeFile(decodeURIComponent(newPath), rawData, (errorWriteFile) => {
            if (errorWriteFile) next(errorWriteFile);
            });
         */
        formData.append(
            'avatar',
            fs.createReadStream(path),
            {
                filename: String(name),
            },
        );

        const { authCookieForAuth, uuidForAuth } = req.cookies;
        axios.defaults.headers.Cookie = `authCookie=${authCookieForAuth as string}; uuid=${uuidForAuth as string}`;
        axios.defaults.withCredentials = true;
        axios.defaults.headers['content-type'] = req.headers['content-type'];
        // eslint-disable-next-line promise/no-promise-in-callback
        axios
            .create({
                headers: formData.getHeaders(),
            })
            .put(
                `${BASE_URL}${USER_ROUTES.CHANGE_AVATAR}`,
                formData,
            )
            .then((response) => {
                const { data } = response;
                if ('status' in data) {
                    delete data.status;
                }
                res.status(200);
                res.send(data);
                return response;
            })
            .catch((error) => next(error));
        return true;
    });
};

export const changePasswordController = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const userServerToAPI = getUserServerToAPI(res);
    userServerToAPI
        .changePassword(req.body)
        .then((response) => {
            res.status(200);
            res.send('Ок');
            return response;
        })
        .catch((err) => next(err));
};

export const getUserAvatarController = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const userInfo = getUserInfo(res);
    const {
        authCookieForAuth, uuidForAuth, yandexToken, googleToken,
    } = req.cookies;
    let avatarURL = `${RESOURCES_BASE_URL}${encodeURIComponent(userInfo.avatar)}`;
    if (yandexToken) {
        avatarURL = `${YANDEX_OAUTH_AVATAR.replace(':avatarId', userInfo.defaultAvatarId)}`;
    } else if (googleToken) {
        avatarURL = userInfo.avatar;
    }
    axios.defaults.headers.Cookie = `authCookie=${authCookieForAuth as string}; uuid=${uuidForAuth as string}`;

    if (userInfo && 'avatar' in userInfo) {
        axios.defaults.withCredentials = true;
        axios.get(avatarURL, { responseType: 'arraybuffer' })
            .then(translateImageToBase64())
            .catch((err) => next(err));
    }
    res.status(404);

    function translateImageToBase64() {
        return (img: AxiosResponse) => {
            const contentType = String(
                img.headers['content-type'],
            );
            const imgSrc = `data:${contentType};base64,${Buffer.from(
                img.data,
            ).toString('base64')}`;
            res.status(200);
            res.send(imgSrc);
            return imgSrc;
        };
    }
};
