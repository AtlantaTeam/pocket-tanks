import { AxiosResponse } from 'axios';
import type { Response } from 'express';
import { lowerCaseFirstChar } from './lowerCaseFirstChar';

export const cookieParser = (res: Response, response: AxiosResponse) => {
    Object.keys(response.headers['set-cookie']).forEach((item) => {
        const cookie = response.headers['set-cookie'][item].split('; ');
        const CookieNameAndValue = cookie[0].split('=');
        const options = {};
        for (let i = 1; i < cookie.length; i++) {
            const option = cookie[i].split('=');
            const key = lowerCaseFirstChar(option[0]);
            // Domain не проставляет в браузер, и всю куку с ним тоже. Поэтому не нужно указывать его.
            if (key !== 'domain') {
                if ((option.length > 1)) {
                    if (key === 'expires') {
                        options[key] = new Date(Date.parse(option[1]));
                    } else options[key] = String(option[1]);
                } else options[key] = true;
            }
        }
        res.cookie(CookieNameAndValue[0], CookieNameAndValue[1], options);
    });
};
