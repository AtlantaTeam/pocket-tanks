import { httpToAPI } from '../../modules/http-service/http-service';

import * as userController from '../user-controller';
import { USER_ROUTES } from '../../constants/api-routes';

describe('user controller', () => {
    const dummyResponse = { data_data: 'data_data' };
    const dummyResponseTransformed = { dataData: 'data_data' };

    const dummyForm = new FormData();
    dummyForm.append('data', 'data');

    const dummyConfig = expect.anything();

    const httpModule = httpToAPI.request;

    beforeEach(() => {
        jest.spyOn(httpModule, 'put').mockResolvedValue({ data: dummyResponse });
    });

    afterEach(() => {
        httpModule.put.mockClear();
    });

    it('метод changeProfile выполняет put запрос и преобразует нотацию в camel', () => {
        userController.changeProfile(dummyForm).then((data) => {
            expect(httpModule.put).toBeCalledWith(USER_ROUTES.CHANGE_PROFILE, dummyForm, dummyConfig);
            expect(data).toEqual(dummyResponseTransformed);
        });
    });

    it('метод changeAvatar выполняет put запрос и преобразует нотацию в camel', () => {
        userController.changeAvatar(dummyForm).then((data) => {
            expect(httpModule.put).toBeCalledWith(USER_ROUTES.CHANGE_AVATAR, dummyForm);
            expect(data).toEqual(dummyResponseTransformed);
        });
    });

    it('метод changePassword выполняет put запрос', () => {
        userController.changePassword(dummyForm).then((data) => {
            expect(httpModule.put).toBeCalledWith(USER_ROUTES.CHANGE_PASSWORD, dummyForm, dummyConfig);
            expect(data).toEqual(dummyResponse);
        });
    });
});
