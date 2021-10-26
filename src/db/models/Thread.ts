import {
    Column, CreatedAt, Default, HasMany, Model, Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Message, MessageAttributes, MessageCreationAttributes } from 'db/models/Message';

export interface ThreadAttributes {
    id: number,
    title: string,
    author: string,
    messages: MessageCreationAttributes[],
    date: Date,
}

export type ThreadCreationAttributes = Optional<ThreadAttributes, 'id' | 'date' >;

@Table({
    timestamps: false,
    tableName: 'threads',
})
export class Thread extends Model<ThreadAttributes, ThreadCreationAttributes> {
    @Column
    title!: string;

    @Column
    author!: string;

    @HasMany(() => Message)
    messages!: Message[];

    @Default(Date.now())
    @Column
    date?: Date;
}
