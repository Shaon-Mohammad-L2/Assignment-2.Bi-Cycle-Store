import { z } from 'zod'

// Zod schema for product validation
export const productValidationZodSchema = z.object({
   name: z
      .string({
         required_error:
            'Product Name is required. Provide it as a string: "name".',
         invalid_type_error: 'Product Name must be a string.',
      })
      .nonempty('Product Name is required.')
      .max(200, 'Product Name must not exceed 200 characters.'),
   brand: z
      .string({
         required_error:
            'Brand Name is required. Provide it as a string: "brand".',
         invalid_type_error: 'Brand Name must be a string.',
      })
      .nonempty('Brand Name is required.')
      .max(20, 'Brand Name must not exceed 20 characters.'),
   price: z
      .number({
         required_error: 'Price is required. Provide it as a number: "price".',
         invalid_type_error: 'Price must be a number.',
      })
      .nonnegative('Price must be a non-negative number.')
      .gt(0, 'Price must be greater than 0.'),
   type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      required_error:
         'Type is required. Provide one of: "Mountain", "Road", "Hybrid", "BMX", or "Electric".',
      invalid_type_error:
         'Type must be one of: "Mountain", "Road", "Hybrid", "BMX", or "Electric".',
   }),
   description: z
      .string({
         required_error:
            'Description is required. Provide it as a string: "description".',
         invalid_type_error: 'Description must be a string.',
      })
      .nonempty('Description is required.')
      .max(5000, 'Description must not exceed 5000 characters.'),
   quantity: z
      .number({
         required_error:
            'Quantity is required. Provide it as a number: "quantity".',
         invalid_type_error: 'Quantity must be a number.',
      })
      .nonnegative('Quantity must be a non-negative number.')
      .min(0, 'Quantity must be greater than or equal to 0.'),
   inStock: z.boolean({
      required_error:
         'Stock Update is required. Provide it as a boolean: "inStock" (true/false).',
      invalid_type_error: 'Stock Update must be a boolean (true/false).',
   }),
})
