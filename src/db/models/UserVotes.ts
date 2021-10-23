import {
    Column, ForeignKey, Is, Model, Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { User } from 'db/models/User';
import { Message } from 'db/models/Message';

export interface UserVotesAttributes {
    id: number,
    user_id: number;
    message_id: string;
    vote: number;
}
export type UserVotesCreationAttributes = Optional<UserVotesAttributes, 'id' >;

@Table({
    timestamps: false,
    tableName: 'user_votes',
})
export class UserVotes extends Model<UserVotesAttributes, UserVotesCreationAttributes> {
    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @ForeignKey(() => Message)
    @Column
    message_id!: number;

    @Is('custom', (value) => (value === 1 || value === -1))
    @Column
    vote!: number;
}
