import React from 'react';
import { Nullable } from 'types/Nullable';
import '../../App/App.css';

interface ErrorButtonProps {
    caption?: string;
}

interface ErrorButtonState {
    caption: string;
    errorChildren: Nullable<Error>;
}

class ErrorButton extends React.Component<
ErrorButtonProps,
ErrorButtonState
> {
    constructor(props: ErrorButtonProps) {
        super(props);
        this.state = {
            caption: 'Нажми на меня',
            errorChildren: null,
        };
    }

    handleClick = () => {
        try {
            throw new Error('Тест работы ErrorBoundary');
        } catch (error) {
            this.setState({ errorChildren: error });
        }
    };

    render = () => {
        if (this.state.errorChildren !== null) {
            throw new Error(this.state.errorChildren.message);
        }
        return (
            <button type="button" onClick={this.handleClick}>
                {this.state.caption}
            </button>
        );
    };
}

export const Main = () => (
    <div>
        <h2 style={{ fontFamily: 'Press Start 2P' }}>Main</h2>
        <ErrorButton />
    </div>
);
