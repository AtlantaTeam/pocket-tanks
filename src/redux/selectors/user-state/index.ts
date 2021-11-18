import type { State } from '../../reducers';

export const getUserState = (state: State) => state.userState;

export const getUserLoaderState = (state: State) => getUserState(state).isLoading;
export const getUserAuthState = (state: State) => getUserState(state).isLoggedIn;
export const getUserProfile = (state: State) => getUserState(state).userInfo;
export const getErrorText = (state: State) => getUserState(state).error;

export const getUserId = (state: State) => {
    const userProfile = getUserProfile(state);
    if (!userProfile || !('id' in userProfile)) {
        return null;
    }
    return userProfile.id;
};

export const getUserNickname = (state: State) => {
    const userProfile = getUserProfile(state);
    if (!userProfile || (!('firstName' in userProfile) && !('displayName' in userProfile))) {
        return null;
    }
    return userProfile.displayName || userProfile.firstName;
};

export const getUserLang = (state: State) => {
    const userProfile = getUserProfile(state);
    if (!userProfile || !('language' in userProfile)) {
        return null;
    }
    return userProfile.language;
};

export const getUserAvatarResourse = (state: State) => {
    const userProfile = getUserProfile(state);
    if (!userProfile || !('avatar' in userProfile)) {
        return null;
    }
    return userProfile.avatar;
};

export const getUserAvatar = (state: State) => {
    const isUserAvatarResourse = getUserAvatarResourse(state);
    const isUserAvatar = getUserState(state).avatar;
    if (isUserAvatar && isUserAvatarResourse) {
        return isUserAvatar;
    }
    return null;
};
