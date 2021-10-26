import {
    BelongsTo,
    Column, DataType, Default, ForeignKey, Model, Table,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Thread } from 'db/models/Thread';

export interface MessageAttributes {
    id: number,
    title: string,
    text: string,
    author: string,
    date: Date,
    rating: number,
    thread_id: number,
    parent_id: number | null,
    replies?: MessageAttributes[],
}

export type MessageCreationAttributes = Optional<MessageAttributes, 'id' | 'title' | 'date' | 'rating' | 'thread_id'>;

@Table({
    timestamps: false,
    tableName: 'messages',
})
export class Message extends Model<MessageAttributes, MessageCreationAttributes> {
    @Column
    title?: string;

    @Column(DataType.TEXT)
    text!: string;

    @Column
    author!: string;

    @Default(Date.now())
    @Column
    date?: Date;

    @Default(0)
    @Column
    rating?: number;

    @ForeignKey(() => Thread)
    @Column({ type: DataType.INTEGER })
    thread_id!: number;

    @BelongsTo(() => Thread)
    thread!: Thread;

    @ForeignKey(() => Message)
    @Column({ type: DataType.INTEGER })
    parent_id?: number;

    @BelongsTo(() => Message)
    parent?: Message;
}
