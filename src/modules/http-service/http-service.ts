import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosTransformer } from 'axios';
import qs from 'qs';
import { isServer } from 'utils/isServer';
import { BASE_URL, SERVER_URL } from '../../constants/api-routes';

export class HTTPService {
    public httpTransport: AxiosInstance;

    constructor(baseUrlHTTP: string) {
        this.httpTransport = axios.create({
            baseURL: baseUrlHTTP,
            timeout: 10000,
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
                (formData: FormData) => this.configDataAsJSON(formData),
            ],
            headers: {
                'Content-type': 'application/json; charset=utf-8',
            },
        };
    }

    static getByUrl(url: string, config: AxiosRequestConfig) {
        return axios.get(url, config);
    }

    private configDataAsJSON(data: FormData) {
        return isServer
            ? data
            : JSON.stringify(Object.fromEntries(data.entries()));
    }
}

export const httpToAPI = new HTTPService(BASE_URL);
export const httpToServer = new HTTPService(SERVER_URL);
