import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IUser extends IBase {
  _id: string;
  email: string;
  password: string;
  role: RoleEnum;
  avatar:String;
  isDeleted: boolean;
  isVerified: boolean;
  isActive: boolean;
  name: string;
  surname: string;
  age: number;
}

type IUserCreateDTO = Pick<
  IUser,
  "email" | "password" | "name" | "surname" | "age"
>;

type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;
export type { IUser, IUserCreateDTO, IUserUpdateDTO };
