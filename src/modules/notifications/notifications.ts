import React from 'react';
import { toast } from 'react-toastify';

import './notifications.css';

export const sendNotificationDefault = (text: string) => {
    toast(text, {
        className: 'notification_default',
        progressClassName: 'notification-progress_default',
        position: toast.POSITION.BOTTOM_RIGHT,
    });
};

export const sendNotificationWithImage = (text: string, src: string) => {
    toast(text, {
        className: 'notification_default notification_with-image',
        progressClassName: 'notification-progress_default',
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2500,
        hideProgressBar: true,
        icon: () => React.createElement('img', { src }),
    });
};
