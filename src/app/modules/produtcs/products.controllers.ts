import { Request, Response } from 'express'
import { productValidationZodSchema } from './products.validation.zod'
import { ProductService } from './products.service'

// Controller to retrieve all products.

const getAllProdcuts = async (req: Request, res: Response) => {
   try {
      const result = await ProductService.getAllProductFromDB()
      res.status(200).json({
         success: true,
         message: 'All Product Successfully Loaded!',
         data: result,
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: 'Product Loading Failed!',
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
         message: 'Product Successfully Loaded!',
         data: result,
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message || 'Unable to retrieve product.',
         err,
      })
   }
}

// Controller to create a new product.

const createProduct = async (req: Request, res: Response) => {
   try {
      const { product: productData } = req.body

      const zodParsedData = productValidationZodSchema.parse(productData)

      const result = await ProductService.createProductIntoDB(zodParsedData)

      res.status(200).json({
         success: true,
         message: 'Product Successfully Created!',
         data: result,
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.issues
            ? err.issues[0]?.message
            : 'Product Creating Failed!',
         err,
      })
   }
}

// Controller to update an existing product by ID.

const updateProduct = async (req: Request, res: Response) => {
   try {
      const { productId } = req.params

      const { updateProduct: productData } = req.body

      const zodParsedData = productValidationZodSchema.parse(productData)

      const result = await ProductService.updateSingleProductIntoDB(
         productId,
         zodParsedData,
      )
      res.status(200).json({
         success: true,
         message: 'Product Successfully Updated!',
         data: result,
      })
   } catch (err: any) {
      res.status(400).json({
         success: false,
         message: err.issues
            ? err.issues[0]?.message
            : err.message || 'Product Updating Failed!',
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
         message: 'Product Successfully Deleted!',
         data: result,
      })
   } catch (err: any) {
      res.status(400).json({
         success: false,
         message: 'Product Deleting Failed!',
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
