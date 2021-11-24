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
        title: 'Want Bat-mobile!',
        messages: [{
            author: batman.get('name'),
            title: 'Bat-mobile',
            text: 'How can I change my tank on Bat-mobile?',
            parent_id: null,
        }],
    }, {
        include: [{ model: Message }],
    });
    // const msgBatman = await Message.create();

    const threadSuperman = await Thread.create({
        author: superman.get('name'),
        title: 'How to fly?',
        messages: [{
            author: superman.get('name'),
            title: 'Wonna fly!',
            text: 'How to fly? I have a cape!',
            parent_id: null,
        }],
    }, {
        include: [{ model: Message }],
    });

    const threadSpiderman = await Thread.create({
        author: spiderman.get('name'),
        title: 'Can I shoot with spider web?',
        messages: [{
            author: spiderman.get('name'),
            title: 'Spider web',
            text: 'How Can I shoot with spider web?',
            parent_id: null,
        }],
    }, {
        include: [{ model: Message }],
    });
};
