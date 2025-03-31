import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiErrors } from "../errors/api.errors";
import {
  IUser,
  IUserCreateDTO,
  IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public getAll(): Promise<IUser[]> {
    return userRepository.getAll();
  }
  public create(user: IUserCreateDTO): Promise<IUser> {
    return userRepository.create(user);
  }
  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiErrors("User not found", StatusCodesEnum.NOT_FOUND);
    }
    return user;
  }
  public async updateById(
    userId: string,
    user: IUserUpdateDTO,
  ): Promise<IUser> {
    const data = await userRepository.getById(userId);
    if (!data) {
      throw new ApiErrors("User not found", StatusCodesEnum.NOT_FOUND);
    }
    return await userRepository.updateById(userId, user);
  }

  public async deleteById(userId: string): Promise<void> {
    const data = await userRepository.getById(userId);
    if (!data) {
      throw new ApiErrors("User not found", StatusCodesEnum.NOT_FOUND);
    }
    await userRepository.deleteById(userId);
  }

  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);

    if (user) {
      throw new ApiErrors(
        "User is already exists",
        StatusCodesEnum.BAD_REQUEST,
      );
    }
  }
}

export const userService = new UserService();
