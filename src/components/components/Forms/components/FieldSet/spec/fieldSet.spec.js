import React from 'react';
import { mount } from 'enzyme';

import { Formik, Form } from 'formik';
import { FieldSet } from '../FieldSet';

describe('<FieldSet />', () => {
    let wrapper;
    let props = {
        className: "input",
        placeholder: "placeholder",
        name: "test",
        id: "test",
        type: "text",
        labelText: "labelText",
        errorText: "",
        viewError: false,
    };

    it('рендерится корректно', () => {
        wrapper = mount(
            <Formik
                initialValues={{
                    test: '',
                }}
                onSubmit={() => {}}
            >
                {() => (
                    <Form>
                        <FieldSet
                            {...props}
                        />
                    </Form>
                )}
            </Formik>
        );

        const htmlInput = wrapper.find('FieldSet').find('input');
        const htmlLabel = wrapper.find('FieldSet').find('label');
        const errorLabel = wrapper.find('FieldSet').find('span.error-label');

        expect(wrapper.find('FieldSet')).toHaveLength(1);

        expect(errorLabel.hasClass('error-label_hidden')).toBeTruthy();

        expect(htmlInput).toHaveLength(1);
        expect(htmlInput.props().className).toEqual(props.className);
        expect(htmlInput.props().placeholder).toEqual(props.placeholder);
        expect(htmlInput.props().name).toEqual(props.name);
        expect(htmlInput.props().id).toEqual(props.id);
        expect(htmlInput.props().type).toEqual(props.type);

        expect(htmlLabel).toHaveLength(1);
        expect(htmlLabel.props().htmlFor).toEqual(props.name);
        expect(htmlLabel.text()).toEqual(props.labelText);
    });

    it('сообщения о неправильном заполнении поля работают корректно', () => {
        const errorText = 'errorText';

        wrapper = mount(
            <Formik
                initialValues={{
                    test: '',
                }}
                onSubmit={() => {}}
            >
                {() => (
                    <Form>
                        <FieldSet
                            {...props}
                            errorText={errorText}
                            viewError={true}
                        />
                    </Form>
                )}
            </Formik>
        );

        const errorLabel = wrapper.find('FieldSet').find('span.error-label');

        expect(errorLabel.hasClass('error-label_hidden')).toBeFalsy();
        expect(errorLabel.text()).toEqual(errorText);
    });
});
