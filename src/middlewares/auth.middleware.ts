import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiErrors } from "../errors/api.errors";
import { IRefresh } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const authorizationsHeader = req.headers.authorization;
      if (!authorizationsHeader) {
        throw new ApiErrors("No token provided", StatusCodesEnum.UNAUTHORIZED);
      }
      const accessToken = authorizationsHeader.split(" ")[1];
      if (!accessToken) {
        throw new ApiErrors("No token provided", StatusCodesEnum.UNAUTHORIZED);
      }
      const tokenPayload = tokenService.verifyToken(accessToken, "access");
      const isTokenExists = await tokenService.isTokenExists(
        accessToken,
        "accessToken",
      );
      if (!isTokenExists) {
        throw new ApiErrors("Invalid token", StatusCodesEnum.UNAUTHORIZED);
      }

      req.res.locals.tokenPayload = tokenPayload;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { refreshToken } = req.body as IRefresh;
      if (!refreshToken) {
        throw new ApiErrors(
          "No refresh token provided",
          StatusCodesEnum.FORBIDDEN,
        );
      }
      const tokenPayload = tokenService.verifyToken(refreshToken, "refresh");
      const isTokenExists = await tokenService.isTokenExists(
        refreshToken,
        "refreshToken",
      );
      if (!isTokenExists) {
        throw new ApiErrors("Invalid token", StatusCodesEnum.FORBIDDEN);
      }

      req.res.locals.tokenPayload = tokenPayload;
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
