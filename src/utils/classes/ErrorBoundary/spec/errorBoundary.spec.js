import React from 'react';
import { mount } from 'enzyme';

import { ErrorBoundary } from '../ErrorBoundary';
import { Main } from '../../../../components/Pages/Main/Main';

jest.mock('react-router-dom', () => ({
    Link() {
        return null;
    }
}));

describe('<ErrorBoundary />', () => {
    let wrapper;
    let errorText = 'Текст ошибки';

    beforeEach(() => {
        wrapper = mount(
            <ErrorBoundary>
                <Main />
            </ErrorBoundary>
        );
    });

    it('основной компонент рендерится корректно', () => {
        expect(wrapper.find('Main')).toHaveLength(1);
    });

    it('при возникновении ошибки рендерится запасной UI', () => {
        wrapper.find('ErrorBoundary').find('Main').simulateError(new Error(errorText));

        expect(wrapper.find('Main')).toHaveLength(0);
        expect(wrapper.find('SpareUI')).toHaveLength(1);
    });

    it('пользователь может прочитать текст ошибки', () => {
        wrapper.find('ErrorBoundary').find('Main').simulateError(new Error(errorText));

        expect(wrapper.find('SpareUI').find('Text').text()).toEqual(errorText);
    });
});
