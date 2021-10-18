import type { State } from '../../reducers';

export const getUserState = (state: State) => state.userState;

export const getUserLoaderState = (state: State) => getUserState(state).isLoading;
export const getUserAuthState = (state: State) => getUserState(state).isLoggedIn;
export const getUserProfile = (state: State) => getUserState(state).userInfo;
export const getErrorText = (state: State) => getUserState(state).error;
export const getUserAvatar = (state: State) => getUserState(state).avatar;

export const getUserNickname = (state: State) => {
    const userProfile = getUserProfile(state);
    if (!('firstName' in userProfile) && !('displayName' in userProfile)) {
        return null;
    }
    return userProfile.displayName || userProfile.firstName;
};
