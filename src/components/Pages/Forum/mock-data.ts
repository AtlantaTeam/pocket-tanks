export type MessageData = {
    id: string;
    by: string;
    for: string | null;
    date: number;
    text: string;
    rating: number | null;
    replies: MessageData[];
};

export type ThreadData = {
    id: string;
    title: string;
    messages: MessageData[];
};

export const dummy: ThreadData[] = [
    {
        id: 't1',
        title: 'Всем привет в этом чатике!',
        messages: [{
            id: 'm132',
            by: 'Batman',
            for: null,
            date: 1634514857444,
            text: 'Как дела?',
            rating: null,
            replies: [],
        }],
    }, {
        id: 't2',
        title: 'Памагите срочно',
        messages: [{
            id: 'm154',
            by: 'Cowboy',
            for: null,
            date: 1634515085619,
            text: 'Почему все сломалось и не работает?',
            rating: 3,
            replies: [],
        }],
    }, {
        id: 't3',
        title: 'Тактика, стратегия',
        messages: [{
            id: 'm134',
            by: 'King Kong',
            for: null,
            date: 1634515311952,
            text: 'Как лучше стрелять?',
            rating: 2,
            replies: [{
                id: 'm544',
                by: 'Super Tankist 9000',
                for: 'King Kong',
                date: 1634615311952,
                text: 'Как-нибудь по дуге, главное попасть, попробуй сам',
                rating: 5,
                replies: [{
                    id: 'm394',
                    by: 'King Kong',
                    for: 'Super Tankist 9000',
                    date: 1634715311952,
                    text: 'Спасибо, пошел пробовать!',
                    rating: null,
                    replies: [],
                }],
            }],
        }],
    }, {
        id: 't4',
        title: 'Как тут вообще играть?',
        messages: [{
            id: 'm224',
            by: 'Winny Pooh',
            for: null,
            date: 1634514857444,
            text: 'Ничего не понятно! Где подсказки с управлением??',
            rating: null,
            replies: [],
        }],
    }, {
        id: 't5',
        title: 'Очень важная тема',
        messages: [{
            id: 'm335',
            by: 'Стрелок',
            for: null,
            date: 1634415196037,
            text: 'Почему такой сложный бот???',
            rating: 2,
            replies: [],
        }],
    },
];
