import { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import pathLib from 'path';
import formidable from 'formidable';
import FormData from 'form-data';
import { setUserInfo } from 'server/utils/userLocals';
import { getUserServerToAPI } from 'server/utils/userServerToAPILocals';
import { objectToCamel } from 'ts-case-convert';
import { BASE_URL, USER_ROUTES } from '../../constants/api-routes';

export const changeProfileController = (req: Request, res: Response, next: NextFunction) => {
    const userServerToAPI = getUserServerToAPI(res);
    userServerToAPI.changeProfile(req.body)
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
        const rootDir = process.cwd();

        const { avatar } = file;
        const { path, name } = avatar as formidable.File;
        const rawData = fs.readFileSync(path);
        const formData = new FormData();
        /*
            const newPath = `${pathLib.join(rootDir, 'static/uploads')}/${encodeURIComponent(name)}`;
            fs.writeFile(decodeURIComponent(newPath), rawData, (errorWriteFile) => {
            if (errorWriteFile) next(errorWriteFile);
            });
         */
        formData.append(
            'avatar',
            rawData,
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            `${name}`,
        );
        const { authCookie, uuid } = req.cookies;
        axios.defaults.headers.Cookie = `authCookie=${authCookie as string}; uuid=${uuid as string}`;
        axios.defaults.withCredentials = true;
        axios.defaults.headers['content-type'] = req.headers['content-type'];
        axios.put(`${BASE_URL}${USER_ROUTES.CHANGE_AVATAR}`, formData)
            .then((response) => {
                console.log(response);
                return response;
            })
            .catch((error) => next(error));
        return true;
    });
};

export const changePasswordController = (req: Request, res: Response, next: NextFunction) => {
    const userServerToAPI = getUserServerToAPI(res);
    userServerToAPI.changePassword(req.body)
        .then((response) => {
            res.status(200);
            res.send('Ок');
            return response;
        })
        .catch((err) => next(err));
};
