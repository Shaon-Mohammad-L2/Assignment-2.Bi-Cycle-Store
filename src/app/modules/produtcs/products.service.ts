import { TProducts } from './products.interface'
import { Products } from './products.models'

// Fetch all products from the database

const getAllProductFromDB = async (searchTerm: string) => {
   const query: any = {}
   if (searchTerm) {
      query.$text = { $search: searchTerm }
   }
   const result = await Products.find(query)
   return result
}

// Fetch a single product by its ID, ensuring it is not marked as deleted.

const getSingleProductFromDB = async (productId: string) => {
   if (await Products.isDeletedTrue(productId)) {
      throw new Error(
         'The requested product has been marked as deleted and is no longer available.',
      )
   }

   const result = await Products.findOne({ _id: productId })

   return result
}

// Create a new product in the database.

const createProductIntoDB = async (productData: TProducts) => {
   const result = await Products.create(productData)
   return result
}

// Update a product by its ID, ensuring it is not marked as deleted.

const updateSingleProductIntoDB = async (
   productId: string,
   productData: TProducts,
) => {
   if (await Products.isDeletedTrue(productId)) {
      throw new Error('Cannot modify a deleted product. It is read-only.')
   }

   const result = await Products.findOneAndUpdate(
      { _id: productId },
      productData,
   )

   return result
}

// Soft-delete a product by setting `isDeleted` to true.

const deleteSingleProductFromDB = async (productId: string) => {
   const result = await Products.updateOne(
      { _id: productId },
      { $set: { isDeleted: true } },
   )

   return result
}

// Exporting the service functions for product-related operations.

export const ProductService = {
   getAllProductFromDB,
   getSingleProductFromDB,
   createProductIntoDB,
   updateSingleProductIntoDB,
   deleteSingleProductFromDB,
}
