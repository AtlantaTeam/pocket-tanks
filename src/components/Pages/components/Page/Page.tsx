import React from 'react';

import './Page.css';

interface PageProps {
    children: JSX.Element;
}

export const Page = (props: PageProps) => (
    <div className="page-wrap-row">
        <div className="page-wrap-column">
            {props.children}
        </div>
    </div>
);
