import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ApiErrors } from "../errors/api.errors";

class CommonMiddleware {
  public isIdValide(key: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;

      try {
        if (!isObjectIdOrHexString(id)) {
          throw new ApiErrors(`Invalid id [${key}]`, 400);
        }
      } catch (e) {
        next(e);
      }
    };
  }

  public validateBody(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = await validator.validateAsync(req.body);
        next()
      } catch (e) {
        next(new ApiErrors(e.details[0].message, 400));
      }
    };
  }
}

export const commonMiddleware = new CommonMiddleware();
