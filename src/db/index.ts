import { Sequelize } from 'sequelize-typescript';
import { User } from 'db/models/User';
import { Message } from 'db/models/Message';
import { Thread } from 'db/models/Thread';
import { UserVotes } from 'db/models/UserVotes';

if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    require('dotenv').config({ path: './stage/dev.env' });
}
const {
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_HOST,
    POSTGRES_PORT,
} = process.env;

export const sequelize = new Sequelize(
    POSTGRES_DB || 'tanksdb',
    POSTGRES_USER || 'postgres',
    POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        port: parseInt(POSTGRES_PORT || '5432', 10),
        database: POSTGRES_DB,
        host: POSTGRES_HOST,
        pool: {
            max: 20,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        quoteIdentifiers: false,
        models: [Thread, Message, User, UserVotes],
    },
);
