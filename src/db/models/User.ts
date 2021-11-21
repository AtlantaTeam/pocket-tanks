import {
    Column, CreatedAt, Default, Model, Table, Unique, UpdatedAt,
} from 'sequelize-typescript';
import { Optional } from 'sequelize';

export interface UserAttributes {
    id: number,
    remote_id: number;
    yandex_id: number;
    name: string;
    tankpoints: number;
    theme: string;
    lang: string;
    yandex_token: string;
    created_at: Date,
    updated_at: Date,
}
export type UserCreationAttributes = Optional<UserAttributes, 'id' | 'remote_id' | 'yandex_id' | 'yandex_token'
| 'created_at' | 'updated_at' | 'theme' | 'lang' | 'tankpoints'>;

@Table({
    tableName: 'users',
})
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Unique
    @Column
    remote_id!: number;

    @Unique
    @Column
    yandex_id!: number;

    @Column
    name!: string;

    @Default('night')
    @Column
    theme?: string;

    @Column
    tankpoints!: number;

    @Default('')
    @Column
    lang?: string;

    @Column
    yandex_token?: string;

    @Default(Date.now())
    @CreatedAt
    @Column
    created_at?: Date;

    @Default(Date.now())
    @UpdatedAt
    @Column
    updated_at?: Date;
}
