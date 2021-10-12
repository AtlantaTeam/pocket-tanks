import React from 'react';
import { toast } from 'react-toastify';

import './notifications.css';

export const sendNotificationDefault = (text: string) => {
    toast(text, {
        className: 'notification_default',
        progressClassName: 'notification-progress_default',
        position: toast.POSITION.BOTTOM_CENTER,
    });
};

export const sendNotificationWithImage = (text: string, src: string) => {
    toast(text, {
        className: 'notification_default notification_with-image',
        progressClassName: 'notification-progress_default',
        position: toast.POSITION.BOTTOM_CENTER,
        icon: () => React.createElement('img', { src }),
    });
};
