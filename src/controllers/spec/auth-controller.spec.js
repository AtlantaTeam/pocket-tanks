import { httpToAPI } from '../../modules/http-service/http-service';

import * as authController from '../auth-controller';
import { AUTH_ROUTES } from '../../constants/api-routes';

describe('auth controller', () => {
    const dummyResponse = { data_data: 'data_data' };
    const dummyResponseTransformed = { dataData: 'data_data' };

    const dummyForm = new FormData();
    dummyForm.append('data', 'data');

    const dummyConfig = expect.anything();

    const httpModule = httpToAPI.request;

    beforeEach(() => {
        jest.spyOn(httpModule, 'get').mockResolvedValue({ data: dummyResponse });
        jest.spyOn(httpModule, 'post').mockResolvedValue({ data: dummyResponse });
    });

    afterEach(() => {
        httpModule.get.mockClear();
        httpModule.post.mockClear();
    });

    it('метод login выполняет post запрос', () => {
        authController.login(dummyForm).then((data) => {
            expect(httpModule.post).toBeCalledWith(AUTH_ROUTES.LOGIN, dummyForm, dummyConfig);
            expect(data).toEqual(dummyResponse);
        });
    });

    it('метод signup выполняет post запрос', () => {
        authController.signup(dummyForm).then((data) => {
            expect(httpModule.post).toBeCalledWith(AUTH_ROUTES.SIGNUP, dummyForm, dummyConfig);
            expect(data).toEqual(dummyResponse);
        });
    });

    it('метод getUserInfo выполняет get запрос и преобразует нотацию в camel', () => {
        authController.getUserInfo().then((data) => {
            expect(httpModule.get).toBeCalledWith(AUTH_ROUTES.GET_USER_INFO);
            expect(data).toEqual(dummyResponseTransformed);
        });
    });

    it('метод logout выполняет post запрос', () => {
        authController.logout().then((data) => {
            expect(httpModule.post).toBeCalledWith(AUTH_ROUTES.LOGOUT);
            expect(data).toEqual(dummyResponse);
        });
    });
});
