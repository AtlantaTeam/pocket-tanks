import React from 'react';
import { FormSignIn } from 'components/components/Forms/FormSignIn/FormSignIn';
import { FormOAuthYandex } from 'components/components/Forms/FormOAth/FormOAuthYandex';
import { Page } from '../components/Page/Page';

export const Login = () => (
    <Page>
        <div>
            <FormSignIn />
            <FormOAuthYandex />
        </div>
    </Page>
);
