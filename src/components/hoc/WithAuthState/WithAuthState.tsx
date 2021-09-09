import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getUserAuthState } from '../../../redux/selectors/user-state';

export const withAuthState = (requiredAuthState: boolean, redirect: string, Component: React.FC) => {
    const wrappedComponent = () => {
        const isUserAuthorized = useSelector(getUserAuthState);

        return (isUserAuthorized !== requiredAuthState
            ? <Redirect to={{ pathname: redirect }} />
            : <Component />
        );
    };

    return wrappedComponent;
};
