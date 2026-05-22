import { Prisma, InventoryItem } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { inventorySearchableFields } from './inventory.constant';

type IInventoryFilters = {
  searchTerm?: string;
  name?: string;
  sku?: string;
  location?: string;
};

const createInventoryItem = async (
  payload: Prisma.InventoryItemCreateInput
): Promise<InventoryItem> => {
  return prisma.inventoryItem.create({
    data: payload,
  });
};

const getAllInventoryItems = async (
  filters: IInventoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<InventoryItem[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions: Prisma.InventoryItemWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: inventorySearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      AND: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions: Prisma.InventoryItemWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.inventoryItem.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: 'desc' },
  });

  const total = await prisma.inventoryItem.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleInventoryItem = async (
  id: string
): Promise<InventoryItem | null> => {
  return prisma.inventoryItem.findUnique({
    where: {
      id,
    },
  });
};

const updateInventoryItem = async (
  id: string,
  payload: Prisma.InventoryItemUpdateInput
): Promise<InventoryItem> => {
  return prisma.inventoryItem.update({
    where: {
      id,
    },
    data: payload,
  });
};

const deleteInventoryItem = async (id: string): Promise<InventoryItem> => {
  return prisma.inventoryItem.delete({
    where: {
      id,
    },
  });
};

export const InventoryService = {
  createInventoryItem,
  getAllInventoryItems,
  getSingleInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
