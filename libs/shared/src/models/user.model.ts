import {
    AllowNull,
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    DeletedAt,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

@Table({
    tableName: 'it_users',
    timestamps: true,
    underscored: true,
    deletedAt: 'deleted_at',
})
export class UserModel extends Model<UserModel> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column({
        field: 'email',
        type: DataType.STRING,
    })
    email: string;

    @AllowNull(true)
    @Column({
        field: 'password_hash',
        type: DataType.STRING,
    })
    passwordHash: string;

    @AllowNull(true)
    @Column({
        field: 'google_id',
        type: DataType.STRING,
    })
    googleId: string;

    @AllowNull(true)
    @Column({
        field: 'avatar',
        type: DataType.STRING,
    })
    avatar: string;

    @AllowNull(true)
    @Column({
        field: 'full_name',
        type: DataType.STRING,
    })
    fullName: string;

    @AllowNull(false)
    @Column({
        field: 'is_activated',
        type: DataType.BOOLEAN,
        defaultValue: false,
    })
    isActivated: boolean;

    @AllowNull(true)
    @Column({
        field: 'activation_token',
        type: DataType.STRING,
    })
    activationToken: string;

    @AllowNull(true)
    @Column({
        field: 'activation_token_expires',
        type: DataType.DATE,
    })
    activationTokenExpires: Date;

    @AllowNull(false)
    @Column({
        type: DataType.ENUM(...Object.values(UserRole)),
        defaultValue: UserRole.USER,
    })
    role: UserRole;
}
