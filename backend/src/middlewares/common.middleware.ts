import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiErrors } from "../errors/api.errors";

class CommonMiddleware {
  public isIdValidate(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const id = req.params[key];

      try {
        if (!isObjectIdOrHexString(id)) {
          throw new ApiErrors(`${key} : ${id} invalid ID `, 400);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public validateBody(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next();
      } catch (e) {
        next(new ApiErrors(e.details[0].message, 400));
      }
    };
  }
  public isFileExist() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.file) {
          throw new ApiErrors("No File upload", StatusCodesEnum.BAD_REQUEST);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
