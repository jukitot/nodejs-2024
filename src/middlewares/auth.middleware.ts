import { NextFunction, Request, Response } from "express";

import { RoleEnum } from "../enums/role.enum";
import { StatusCodesEnum } from "../enums/status-codes.enum";
import { ApiErrors } from "../errors/api.errors";
import { IRefresh, ITokenPayload } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";
import { userService } from "../services/user.service";

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

      const isActive = await userService.isActive(tokenPayload.userId);
      if (!isActive) {
        throw new ApiErrors("Account is not active", StatusCodesEnum.FORBIDDEN);
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
  public isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const { role } = req.res.locals.tokenPayload as ITokenPayload;
      if (role !== RoleEnum.ADMIN) {
        throw new ApiErrors("No has permissions", StatusCodesEnum.FORBIDDEN);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
