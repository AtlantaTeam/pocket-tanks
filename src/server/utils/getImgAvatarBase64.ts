import axios from 'axios';
import { RESOURCES_BASE_URL } from 'constants/api-routes';
import { NextFunction, Request, Response } from 'express';
import { getUserInfo, setUserInfo } from './userLocals';

export const getImgAvatarBase64 = (req: Request, res: Response, next: NextFunction, pathAvatar: string) => {
    const { authCookie, uuid } = req.cookies;
    axios.defaults.headers.Cookie = `authCookie=${authCookie as string}; uuid=${uuid as string}`;
    return axios
        .get(
            `${RESOURCES_BASE_URL}${encodeURIComponent(pathAvatar)}`,
            { responseType: 'arraybuffer' },
        )
        .then((img) => {
            const base64: string = img.data.toString('base64');
            const imgAvatar = `data:image/jpeg;base64;${base64}`;
            setUserInfo(res, { ...getUserInfo(res), imgAvatarBase64: imgAvatar });
            return getUserInfo(res);
        })
        .catch((error) => next(error));
};
