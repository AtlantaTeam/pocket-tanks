import { http } from '../../modules/http-service/http-service';

import * as userController from '../user-controller';
import { USER_ROUTES } from '../../constants/api-routes';

describe('user controller', () => {
    const dummyResponse = { data_data: 'data_data' };
    const dummyResponseTransformed = { dataData: 'data_data' };

    const httpModule = http.request;

    beforeEach(() => {
        jest.spyOn(httpModule, 'put').mockResolvedValue({ data: dummyResponse });
    });

    afterEach(() => {
        httpModule.put.mockClear();
    });

    it('метод changeProfile выполняет put запрос и преобразует нотацию в camel', () => {
        userController.changeProfile(new FormData()).then((data) => {
            expect(httpModule.put).toBeCalledTimes(1);
            expect(httpModule.put.mock.calls[0][0]).toEqual(USER_ROUTES.CHANGE_PROFILE);
            expect(data).toEqual(dummyResponseTransformed);
        });
    });

    it('метод changeAvatar выполняет put запрос и преобразует нотацию в camel', () => {
        userController.changeAvatar(new FormData()).then((data) => {
            expect(httpModule.put).toBeCalledTimes(1);
            expect(httpModule.put.mock.calls[0][0]).toEqual(USER_ROUTES.CHANGE_AVATAR);
            expect(data).toEqual(dummyResponseTransformed);
        });
    });

    it('метод changePassword выполняет put запрос', () => {
        userController.changePassword(new FormData()).then((data) => {
            expect(httpModule.put).toBeCalledTimes(1);
            expect(httpModule.put.mock.calls[0][0]).toEqual(USER_ROUTES.CHANGE_PASSWORD);
            expect(data).toEqual(dummyResponse);
        });
    });
});
