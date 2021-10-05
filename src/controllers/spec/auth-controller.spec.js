import { http } from '../../modules/http-service/http-service';

import * as authController from '../auth-controller';
import { AUTH_ROUTES } from '../../constants/api-routes';

describe('auth controller', () => {
    const dummyResponse = { data_data: 'data_data' };
    const dummyResponseTransformed = { dataData: 'data_data' };

    const httpModule = http.request;
    jest.spyOn(httpModule, 'get').mockResolvedValue({ data: dummyResponse });
    jest.spyOn(httpModule, 'post').mockResolvedValue({ data: dummyResponse });

    afterEach(() => {
        httpModule.get.mockClear();
        httpModule.post.mockClear();
    });

    it('метод login выполняет post запрос', () => {
        authController.login(new FormData()).then((data) => {
            expect(httpModule.post).toBeCalledTimes(1);
            expect(httpModule.post.mock.calls[0][0]).toEqual(AUTH_ROUTES.LOGIN);
            expect(data).toEqual(dummyResponse);
        });
    });

    it('метод signup выполняет post запрос', () => {
        authController.signup(new FormData()).then((data) => {
            expect(httpModule.post).toBeCalledTimes(1);
            expect(httpModule.post.mock.calls[0][0]).toEqual(AUTH_ROUTES.SIGNUP);
            expect(data).toEqual(dummyResponse);
        });
    });

    it('метод getUserInfo выполняет get запрос и преобразует нотацию в camel', () => {
        authController.getUserInfo().then((data) => {
            expect(httpModule.get).toBeCalledTimes(1);
            expect(httpModule.get.mock.calls[0][0]).toEqual(AUTH_ROUTES.GET_USER_INFO);
            expect(data).toEqual(dummyResponseTransformed);
        });
    });

    it('метод logout выполняет post запрос', () => {
        authController.logout().then((data) => {
            expect(httpModule.post).toBeCalledTimes(1);
            expect(httpModule.post.mock.calls[0][0]).toEqual(AUTH_ROUTES.LOGOUT);
            expect(data).toEqual(dummyResponse);
        });
    });
});
