import { sendNotificationWithImage } from 'modules/notifications/notifications';
import imgBotAvatar from 'images/bot.jpg';
import { i18n } from 'i18n';

const botSarcasm = [i18n.t('selfDestruct1'), i18n.t('selfDestruct2')];
const botHappy = [i18n.t('hastaLaVista'), i18n.t('hastaLaVista'), i18n.t('boom'), i18n.t('howIsThat'),
    i18n.t('iamGood'), i18n.t('rightOnTarget'), i18n.t('wowThatWasHuge'), i18n.t('blastingWithoutAMiss')];
const botAngry = [i18n.t('heyTakeItEasy'), i18n.t('iWillFlipYaForIt'), i18n.t('notFare'),
    i18n.t('ohThatsHowYouAre'), i18n.t('iamHit'), i18n.t('thatHurts'), i18n.t('ohComeOn')];

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
