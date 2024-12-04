import { model, Schema } from 'mongoose'
import { ProductModel, TProducts } from './products.interface'

// Utility function for setting required field validation messages.
const requiredFun = (subject: string): [boolean, string] => {
   return [true, `${subject} is Required`]
}

// Mongoose schema definition for products.
const productSchema = new Schema<TProducts, ProductModel>(
   {
      code: {
         type: String,
         required: requiredFun('Product Code'),
         unique: true,
         trim: true,
      },
      name: {
         type: String,
         required: requiredFun('Product Name'),
         trim: true,
         maxlength: [200, 'Product Name must not exceed 200 characters'],
      },
      brand: {
         type: String,
         required: requiredFun('Brand Name'),
         trim: true,
         maxlength: [20, 'Brand Name must not exceed 20 characters'],
      },
      price: {
         type: Number,
         required: requiredFun('Price'),
         trim: true,
         min: [0.01, 'Price must be greater than 0'],
      },
      type: {
         type: String,
         required: requiredFun('Product Type'),
         enum: {
            values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
            message:
               'Type must be one of Mountain, Road, Hybrid, BMX, or Electric',
         },
      },
      description: {
         type: String,
         required: requiredFun('Product description'),
         trim: true,
         maxlength: [5000, 'Description must not exceed 5000 characters'],
      },
      quantity: {
         type: Number,
         required: requiredFun('Quantity'),
         trim: true,
         min: [0, 'Quantity must be greater than or equal to 0'],
      },
      inStock: {
         type: Boolean,
         required: requiredFun('Stock Update'),
      },
      isDeleted: {
         type: Boolean,
         default: false,
      },
   },
   {
      timestamps: true,
   },
)

// Middleware to update `inStock` based on `quantity` before creating.
productSchema.pre('save', function (next) {
   const product = this as TProducts
   if (product.quantity <= 0) {
      product.inStock = false
   }

   next()
})

// Middleware to update `inStock` based on `quantity` before updating.
productSchema.pre('findOneAndUpdate', function (next) {
   const product = this as any
   if (product._update.quantity <= 0) {
      product._update.inStock = false
   }

   next()
})

// Middleware to exclude `isDeleted: true` items during `find` operations unless skipped.
productSchema.pre('find', function (next) {
   const skipMiddleware = this.getOptions().skipMiddleware
   if (!skipMiddleware) {
      this.find({ isDeleted: { $ne: true } })
   }
   next()
})

// Middleware to exclude `isDeleted: true` items during `findOne` operations unless skipped.
productSchema.pre('findOne', function (next) {
   const skipMiddleware = this.getOptions().skipMiddleware
   if (!skipMiddleware) {
      this.findOne({ isDeleted: { $ne: true } })
   }
   next()
})

// Middleware to exclude `isDeleted: true` items during aggregation operations.
productSchema.pre('aggregate', function (next) {
   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
   next()
})

// Custom static method to check if a product is marked as deleted.
productSchema.statics.isDeletedTrue = async function (productId: string) {
   const existingIsDeletedTrue = await Products.findOne(
      {
         _id: productId,
         isDeleted: true,
      },
      {},
      { skipMiddleware: true },
   )
   return existingIsDeletedTrue
}

// Mongoose model for products.
export const Products = model<TProducts, ProductModel>('Product', productSchema)
