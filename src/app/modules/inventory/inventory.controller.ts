import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { inventoryFilterableFields } from './inventory.constant';
import { InventoryService } from './inventory.service';

const createInventoryItem = catchAsync(async (req: Request, res: Response) => {
  const result = await InventoryService.createInventoryItem({
    ...req.body,
    createdBy: req.user?.userId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory item created successfully',
    data: result,
  });
});

const getAllInventoryItems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, inventoryFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await InventoryService.getAllInventoryItems(
    filters,
    paginationOptions
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory items retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleInventoryItem = catchAsync(
  async (req: Request, res: Response) => {
    const result = await InventoryService.getSingleInventoryItem(req.params.id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Inventory item retrieved successfully',
      data: result,
    });
  }
);

const updateInventoryItem = catchAsync(async (req: Request, res: Response) => {
  const result = await InventoryService.updateInventoryItem(req.params.id, {
    ...req.body,
    updatedBy: req.user?.userId,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory item updated successfully',
    data: result,
  });
});

const deleteInventoryItem = catchAsync(async (req: Request, res: Response) => {
  const result = await InventoryService.deleteInventoryItem(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inventory item deleted successfully',
    data: result,
  });
});

export const InventoryController = {
  createInventoryItem,
  getAllInventoryItems,
  getSingleInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
