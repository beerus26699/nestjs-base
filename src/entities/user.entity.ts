import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

@Table({
    tableName: 'users',
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column({
        field: 'username',
        type: DataType.STRING,
    })
    username: string;

    @AllowNull(false)
    @Column({
        field: 'password',
        type: DataType.STRING,
    })
    password: string;

    @CreatedAt
    @Column({
        field: 'created_at',
    })
    createdAt: Date;

    @UpdatedAt
    @Column({
        field: 'updated_at',
    })
    updatedAt: Date;

    @DeletedAt
    @Column({
        field: 'deleted_at',
    })
    deletedAt: Date;
}
