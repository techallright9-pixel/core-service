import express from 'express';
import { STAFF_PERMISSIONS } from '../../../constants/permissions';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import permission from '../../middlewares/permission';
import validateRequest from '../../middlewares/validateRequest';
import { InventoryController } from './inventory.controller';
import { InventoryValidation } from './inventory.validation';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STAFF),
  permission(STAFF_PERMISSIONS.INVENTORY_READ),
  InventoryController.getAllInventoryItems
);

router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STAFF),
  permission(STAFF_PERMISSIONS.INVENTORY_READ),
  InventoryController.getSingleInventoryItem
);

router.post(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STAFF),
  permission(STAFF_PERMISSIONS.INVENTORY_CREATE),
  validateRequest(InventoryValidation.createInventoryItem),
  InventoryController.createInventoryItem
);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STAFF),
  permission(STAFF_PERMISSIONS.INVENTORY_UPDATE),
  validateRequest(InventoryValidation.updateInventoryItem),
  InventoryController.updateInventoryItem
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.STAFF),
  permission(STAFF_PERMISSIONS.INVENTORY_DELETE),
  InventoryController.deleteInventoryItem
);

export const InventoryRoutes = router;
