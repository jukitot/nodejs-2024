import {} from "mongoose";

import {
  IUser,
  IUserCreateDTO,
  IUserQuery,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public getAll(query: IUserQuery): Promise<[IUser[], number]> {
    const skip = query.pageSize * (query.page - 1);

    return Promise.all([
      User.find().limit(query.pageSize).skip(skip),
      User.countDocuments(),
    ]);
  }
  public create(user: IUserCreateDTO): Promise<IUser> {
    return User.create(user);
  }
  public getById(userId: string): Promise<IUser> {
    return User.findById(userId);
  }
  public updateById(userId: string, user: Partial<IUser>): Promise<IUser> {
    return User.findByIdAndUpdate(userId, user, { new: true });
  }

  public deleteById(userId: string): Promise<IUser> {
    return User.findByIdAndDelete(userId);
  }

  public getByEmail(email: string): Promise<IUser> {
    return User.findOne({ email });
  }
  public blockUser(userId: string): Promise<IUser> {
    return User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
  }
  public unblockUser(userId: string): Promise<IUser> {
    return User.findByIdAndUpdate(userId, { isActive: true }, { new: true });
  }
}

export const userRepository = new UserRepository();
