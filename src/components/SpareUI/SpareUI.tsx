import React from 'react';

interface SpareUIProps {
    errorMessage: string;
}

export function SpareUI(props: SpareUIProps) {
    return (
        <div>
            <p>Что-то пошло не так...</p>
            <p>{props.errorMessage}</p>
        </div>
    );
}
