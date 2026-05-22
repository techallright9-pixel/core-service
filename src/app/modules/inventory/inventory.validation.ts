import { z } from 'zod';

const createInventoryItem = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    sku: z.string({ required_error: 'SKU is required' }),
    description: z.string().optional(),
    quantity: z.number().int().nonnegative().optional(),
    unit: z.string().optional(),
    location: z.string().optional(),
  }),
});

const updateInventoryItem = z.object({
  body: z.object({
    name: z.string().optional(),
    sku: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().int().nonnegative().optional(),
    unit: z.string().optional(),
    location: z.string().optional(),
  }),
});

export const InventoryValidation = {
  createInventoryItem,
  updateInventoryItem,
};
