import { Request, RequestHandler, Response } from 'express'
import { productValidationZodSchema } from './products.validation.zod'
import { ProductService } from './products.service'

// Controller to retrieve all products.

const getAllProdcuts: RequestHandler = async (req: Request, res: Response) => {
   try {
      const { searchTerm } = req.query
      const result = await ProductService.getAllProductFromDB(
         searchTerm as string,
      )

      res.status(200).json({
         success: true,
         message: 'Bicycles retrieved successfully',
         data: result.length > 0 ? result : 'No Bi-Cycle found',
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: 'Bicycle Loading Failed!',
         err,
      })
   }
}

// Controller to retrieve a single product by ID.

const getSingleProduct = async (req: Request, res: Response) => {
   try {
      const { productId } = req.params
      const result = await ProductService.getSingleProductFromDB(productId)
      res.status(200).json({
         success: true,
         message: 'Bicycle retrieved successfully!',
         data: result || 'No Bi-Cycle found',
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message || 'Unable to retrieve Bicycle.',
         err,
      })
   }
}

// Controller to create a new product.

const createProduct = async (req: Request, res: Response) => {
   try {
      const productData = req.body

      const zodParsedData = productValidationZodSchema.parse(productData)

      const result = await ProductService.createProductIntoDB(zodParsedData)

      res.status(200).json({
         success: true,
         message: 'Bicycle created successfully!',
         data: result,
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.issues
            ? err.issues[0]?.message
            : err.message || 'Bicycle Creating Failed!',
         err,
      })
   }
}

// Controller to update an existing product by ID.

const updateProduct = async (req: Request, res: Response) => {
   try {
      const { productId } = req.params

      const productData = req.body

      const zodParsedData = productValidationZodSchema.parse(productData)

      const result = await ProductService.updateSingleProductIntoDB(
         productId,
         zodParsedData,
      )

      res.status(200).json({
         success: true,
         message: 'Bicycle updated successfully!',
         data: result,
      })
   } catch (err: any) {
      res.status(400).json({
         success: false,
         message: err.issues
            ? err.issues[0]?.message
            : err.message || 'Bicycle Updating Failed!',
         err,
      })
   }
}

// Controller to delete a product (soft delete by marking as `isDeleted`).

const deleteProduct = async (req: Request, res: Response) => {
   try {
      const { productId } = req.params

      const result = await ProductService.deleteSingleProductFromDB(productId)

      res.status(200).json({
         success: true,
         message: 'Bicycle deleted successfully!',
         data: result,
      })
   } catch (err: any) {
      res.status(400).json({
         success: false,
         message: 'Bicycle deleting Failed!',
         err,
      })
   }
}

// Export all product-related controllers.

export const productControllers = {
   getAllProdcuts,
   getSingleProduct,
   createProduct,
   updateProduct,
   deleteProduct,
}
