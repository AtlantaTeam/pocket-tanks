import axios, { AxiosInstance, AxiosRequestConfig, AxiosTransformer } from 'axios';
import qs from 'qs';

const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export class HTTPService {
    private httpTransport: AxiosInstance;

    constructor(endpoint: string) {
        this.httpTransport = axios.create({
            baseURL: BASE_URL + endpoint,
            timeout: 5000,
            withCredentials: true,
            paramsSerializer: (params) => qs.stringify(params),
        });
    }

    get request() {
        return this.httpTransport;
    }

    public static configureFormAsJSON(): AxiosRequestConfig {
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
