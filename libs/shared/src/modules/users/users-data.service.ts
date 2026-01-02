import { BaseRepository } from "@app/core/repositories/model.repository";
import { UserModel } from "@app/shared/models";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UsersDataService extends BaseRepository<UserModel> {
  constructor(
    @InjectModel(UserModel)
    userModel: typeof UserModel,
  ) {
    super(userModel);
  }
}