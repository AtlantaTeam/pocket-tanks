import { HTTPService } from '../modules/http-service/http-service';

export abstract class BaseAPI {
    private HTTPService: typeof HTTPService;

    private httpServiceInstance: HTTPService;

    constructor(endpoint: string) {
        this.HTTPService = HTTPService;
        this.httpServiceInstance = new this.HTTPService(endpoint);
    }

    get http() {
        return this.httpServiceInstance.request;
    }

    protected configureFormAsJSON(formData: FormData) {
        return this.HTTPService.configureFormAsJSON(formData);
    }
}
