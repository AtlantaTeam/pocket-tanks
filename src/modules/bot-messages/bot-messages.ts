import { sendNotificationWithImage } from 'modules/notifications/notifications';
import imgBotAvatar from 'images/bot.jpg';

const botSarcasm = ['Хаха, ты решил самоуничтожиться от страха?', 'Это что, харакири? :D'];
const botHappy = ['Hasta la vista, baby', 'Бум!', 'Как тебе такое?', 'Как я хорош! :)',
    'Точно в цель!', 'Ух, как зарядил!', 'Бью без промаха!'];
const botAngry = ['Эй, полегче!', 'Я тебе это припомню!', 'Не честно!', 'Ах, вот ты как?',
    'Меня подбили!', 'Не так сильно!', 'Да как так то?'];

const getRandomMessage = (messages: string[]) => messages[Math.floor(Math.random() * messages.length)];

export const sendBotSarcasmMessage = () => {
    sendNotificationWithImage(getRandomMessage(botSarcasm), imgBotAvatar as string);
};

export const sendBotHappyMessage = () => {
    sendNotificationWithImage(getRandomMessage(botHappy), imgBotAvatar as string);
};

export const sendBotAngryMessage = () => {
    sendNotificationWithImage(getRandomMessage(botAngry), imgBotAvatar as string);
};
