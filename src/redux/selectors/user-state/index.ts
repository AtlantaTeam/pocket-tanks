import type { State } from '../../reducers';

export const getUserState = (state: State) => state.userState;

export const getUserLoaderState = (state: State) => getUserState(state).isLoading;
export const getUserAuthState = (state: State) => getUserState(state).isLoggedIn;
export const getUserProfile = (state: State) => getUserState(state).userInfo;

export const getUserNickname = (state: State) => {
    const userProfile = getUserProfile(state);
    if (!('firstName' in userProfile) && !('displayName' in userProfile)) {
        return null;
    }
    return userProfile.displayName || userProfile.firstName;
};

export const getUserAvatar = (state: State) => {
    const userProfile = getUserProfile(state);
    if (!('avatar' in userProfile)) {
        return null;
    }
    return userProfile.avatar;
};
