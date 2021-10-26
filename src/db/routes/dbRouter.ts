import { Router } from 'express';
import { Message } from 'db/models/Message';
import { User } from 'db/models/User';
import { UserVotes } from 'db/models/UserVotes';
import { Op } from 'sequelize';
import { Thread } from '../models/Thread';

export const dbRouter = Router();

dbRouter.post('/thread/create', async (req, res, next) => {
    try {
        res.status(201).json(await Thread.create(req.body, {
            include: [{ model: Message }],
        }));
    } catch (e) {
        next(e);
    }
});

dbRouter.get('/thread/:id/messages', async (req, res, next) => {
    try {
        res.json(
            await Message.findAll({
                where: {
                    thread_id: req.params.id,
                },
            }),
        );
    } catch (e) {
        next(e);
    }
});

dbRouter.post('/message/create', async (req, res, next) => {
    try {
        res.status(201).json(await Message.create(req.body));
    } catch (e) {
        next(e);
    }
});

dbRouter.post('/message/:id/vote', async (req, res, next) => {
    try {
        const { ratingVote, userId } = req.body;
        if (!ratingVote) {
            throw new Error('Vote error: vote is empty');
        }
        if (!userId) {
            throw new Error('Vote error: user is empty');
        }
        if (!req.params.id) {
            throw new Error('Vote error: message id is empty');
        }
        const msg = await Message.findOne({
            where: { id: req.params.id },
        });
        const user = await User.findOne({
            where: { remote_id: userId },
        });
        const userVote = await UserVotes.findOne({
            where: {
                [Op.and]: [
                    { user_id: userId },
                    { message_id: req.params.id },
                ],
            },
        });
        if (userVote && userVote.get('vote') === ratingVote && msg) {
            res.status(201).json(msg);
        } else if (msg && user) {
            const sumVote = (msg.get('rating') || 0) + parseInt(ratingVote, 10);
            if (userVote) {
                await userVote.destroy();
            } else {
                await UserVotes.create({
                    user_id: userId,
                    message_id: req.params.id,
                    vote: ratingVote,
                });
            }
            msg.set('rating', sumVote);
            res.status(201).json(await msg.save());
        } else {
            throw new Error('Failed to find message');
        }
    } catch (e) {
        next(e);
    }
});

dbRouter.get('/threads', async (req, res, next) => {
    try {
        res.json(await Thread.findAll());
    } catch (e) {
        next(e);
    }
});

dbRouter.get('/thread/:id', async (req, res, next) => {
    try {
        res.json(await Thread.findByPk(req.params.id));
    } catch (e) {
        next(e);
    }
});

dbRouter.get('/user/:id/theme', async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { remote_id: req.params.id },
        });
        res.json({ theme: user?.get('theme') || 'night' });
    } catch (e) {
        next(e);
    }
});

dbRouter.post('/user/:id/theme', async (req, res, next) => {
    try {
        const { theme } = req.body;
        const user = await User.findOne({
            where: { remote_id: req.params.id },
        });
        if (user) {
            user.set('theme', theme);
            res.status(201).json(await user.save());
        } else {
            throw new Error('Failed to set theme');
        }
    } catch (e) {
        next(e);
    }
});
