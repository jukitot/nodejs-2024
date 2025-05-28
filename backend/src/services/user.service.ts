import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiErrors } from "../errors/api.errors";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import {
  IUser,
  IUserCreateDTO,
  IUserQuery,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(query: IUserQuery): Promise<IPaginatedResponse<IUser>> {
    const [data, totalItems] = await userRepository.getAll(query);

    return {};
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
    user: Partial<IUser>,
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

  public async isActive(id: string): Promise<boolean> {
    const user = await this.getById(id);
    return user.isActive;
  }

  public blockUser(user_id: string): Promise<IUser> {
    return userRepository.blockUser(user_id);
  }
  public unblockUser(user_id: string): Promise<IUser> {
    return userRepository.unblockUser(user_id);
  }

  public getByEmail(email: string): Promise<IUser> {
    return userRepository.getByEmail(email);
  }
}

export const userService = new UserService();
