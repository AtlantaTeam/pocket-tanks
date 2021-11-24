import React from 'react';
import { FormSignIn } from 'components/components/Forms/FormSignIn/FormSignIn';
import { FormOAuth } from 'components/components/Forms/FormOAth/FormOAuth';
import { Page } from '../components/Page/Page';

export const Login = () => (
    <Page>
        <div>
            <FormSignIn />
            <FormOAuth />
        </div>
    </Page>
);
