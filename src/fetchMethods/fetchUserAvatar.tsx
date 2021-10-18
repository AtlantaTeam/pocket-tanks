import axios, { AxiosResponse } from 'axios';
import { Store } from 'redux';
import { avatarFulfilled } from '../redux/actions/user-state/get-avatar';
import { RESOURCES_BASE_URL } from '../constants/api-routes';

export const fetchUserAvatar = (store: Store) => {
    const { dispatch } = store;
    const state = store.getState();
    const cookie = state.authCookieState.authCookie;
    const avatarPath = state.userState.userInfo.avatar;
    axios.defaults.headers.Cookie = cookie;
    axios.defaults.withCredentials = true;
    return axios.get(
        `${RESOURCES_BASE_URL}${encodeURIComponent(avatarPath)}`,
    /*   { responseType: 'arraybuffer' }, */
    )
        .then((img: AxiosResponse) => {
            dispatch(avatarFulfilled(img.data));
            return img.data as string;
        });
};
