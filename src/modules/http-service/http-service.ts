import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosTransformer } from 'axios';
import qs from 'qs';
import { BASE_URL } from '../../constants/api-routes';

class HTTPService {
    private httpTransport: AxiosInstance;

    constructor() {
        this.httpTransport = axios.create({
            baseURL: BASE_URL,
            timeout: 5000,
            withCredentials: true,
            paramsSerializer: (params) => qs.stringify(params),
        });
    }

    get request() {
        return this.httpTransport;
    }

    get configFormDataAsJSON(): AxiosRequestConfig {
        return {
            transformRequest: [
                ...axios.defaults.transformRequest as AxiosTransformer[],
                (formData: FormData) => JSON.stringify(Object.fromEntries(formData.entries())),
            ],
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
        };
    }
}

export const http = new HTTPService();
