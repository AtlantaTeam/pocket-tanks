/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable no-console */

import React from 'react';
import { AuthController } from '../../../controllers/auth-controller';

export const Test = () => {
    const login = async () => {
        const form = new FormData();
        form.append('login', 'tank1');
        form.append('password', '321321321');
        try {
            const responce = await AuthController.login(form);
            console.log(responce);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            const responce = await AuthController.logout();
            console.log(responce);
        } catch (error) {
            console.log(error);
        }
    };

    const getUserInfo = async () => {
        try {
            const responce = await AuthController.getUserInfo();
            console.log(responce);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2 style={{ fontFamily: 'Press Start 2P' }}>Тест API (Результаты запросов в консоли)</h2>
            <button type="button" onClick={login}>Login</button>
            <button type="button" onClick={logout}>Logout</button>
            <button type="button" onClick={getUserInfo}>Get User Info</button>
        </div>
    );
};
