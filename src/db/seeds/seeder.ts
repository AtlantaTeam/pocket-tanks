import { Thread } from 'db/models/Thread';
import { Message } from 'db/models/Message';
import { User } from 'db/models/User';

export const populateDB = async () => {
    const batman = await User.create({
        remote_id: 1,
        name: 'Batman',
    });
    const superman = await User.create({
        remote_id: 2,
        name: 'Superman',
    });
    const spiderman = await User.create({
        remote_id: 3,
        name: 'Spiderman',
    });

    const threadBatman = await Thread.create({
        author: batman.get('name'),
        title: 'Хочу поменять танк на Бэтмобиль!',
        messages: [{
            author: batman.get('name'),
            title: 'Бэтмобиль',
            text: 'Как тут поменять танк на Бэтмобиль?',
            parent_id: null,
        }],
    }, {
        include: [{ model: Message }],
    });
    // const msgBatman = await Message.create();

    const threadSuperman = await Thread.create({
        author: superman.get('name'),
        title: 'Как тут летать?',
        messages: [{
            author: superman.get('name'),
            title: 'Хочу летать!',
            text: 'Как летать? Плащ есть!',
            parent_id: null,
        }],
    }, {
        include: [{ model: Message }],
    });

    const threadSpiderman = await Thread.create({
        author: spiderman.get('name'),
        title: 'А паутиной стрелять можно?',
        messages: [{
            author: spiderman.get('name'),
            title: 'Паутина',
            text: 'Как тут переключить на паутину?',
            parent_id: null,
        }],
    }, {
        include: [{ model: Message }],
    });
};
