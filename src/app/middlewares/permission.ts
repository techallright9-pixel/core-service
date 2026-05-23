import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { ENUM_USER_ROLE } from '../../enums/user';

const permission =
  (...requiredPermissions: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      if (
        user.role === ENUM_USER_ROLE.SUPER_ADMIN ||
        user.role === ENUM_USER_ROLE.ADMIN
      ) {
        return next();
      }

      const userPermissions = user.staffPermissions || [];
      const hasPermission = requiredPermissions.every(item =>
        userPermissions.includes(item)
      );

      if (!hasPermission) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default permission;
