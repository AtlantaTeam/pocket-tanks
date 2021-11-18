import {
    Column, CreatedAt, Default, Model, Table, Unique, UpdatedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface UserAttributes {
    id: number,
    remote_id: number;
    name: string;
    theme: string;
    lang: string;
    created_at: Date,
    updated_at: Date,
}
export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'created_at' | 'updated_at' | 'theme' | 'lang' >;

@Table({
    tableName: 'users',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Unique
    @Column
    remote_id!: number;

    @Column
    name!: string;

    @Default('night')
    @Column
    theme?: string;

    @Default('')
    @Column
    lang?: string;

    @Default(Date.now())
    @CreatedAt
    @Column
    created_at?: Date;

    @Default(Date.now())
    @UpdatedAt
    @Column
    updated_at?: Date;
}
