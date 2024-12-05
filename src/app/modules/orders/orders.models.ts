import { model, Schema } from 'mongoose'
import { TOrders } from './orders.interface'
import { Products } from '../produtcs/products.models'

// Utility function to set required field validation messages dynamically.
const requiredFun = (subject: string): [boolean, string] => {
   return [true, `${subject} is Required`]
}

// Schema definition for Order model.

const OrderSchema = new Schema<TOrders>(
   {
      email: {
         type: String,
         trim: true,
         required: requiredFun('Email'),
      },
      product: {
         type: Schema.Types.ObjectId,
         trim: true,
         required: requiredFun('Product'),
      },
      quantity: {
         type: Number,
         required: requiredFun('Quantity'),
         min: [1, 'Quantity must be greater than or equal to 1'],
      },
      totalPrice: {
         type: Number,
         required: requiredFun('Total Price'),
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

// Pre-save middleware to validate product stock and calculate total price.

OrderSchema.pre('save', async function (next) {
   try {
      const order = this as any
      const product = await Products.findOne({ _id: order.product })

      // Check if the product exists and is available for ordering.

      if (!product) {
         throw new Error('Product not Found')
      } else if (
         product.isDeleted ||
         !product.inStock ||
         product.quantity < order.quantity ||
         product.quantity <= 0
      ) {
         throw new Error('Requested stock is unavailable.')
      } else if (product) {
         const orderQuantity = order.quantity

         order.totalPrice = product.price * orderQuantity

         const update = await Products.updateOne(
            {
               _id: order.product,
               quantity: { $gte: orderQuantity },
               isDeleted: false,
               inStock: true,
            },
            { $inc: { quantity: -orderQuantity } },
         )

         if (!update.modifiedCount) {
            throw new Error('Stock update failed due to insufficient stock.')
         }
      }

      next()
   } catch (err: any) {
      next(err)
   }
})

// Middleware to exclude `isDeleted: true` items during `find` operations unless skipped.
OrderSchema.pre('find', function (next) {
   const skipMiddleware = this.getOptions().skipMiddleware
   if (!skipMiddleware) {
      this.find({ isDeleted: { $ne: true } })
   }
   next()
})

// Middleware to exclude `isDeleted: true` items during `findOne` operations unless skipped.
OrderSchema.pre('findOne', function (next) {
   const skipMiddleware = this.getOptions().skipMiddleware
   if (!skipMiddleware) {
      this.findOne({ isDeleted: { $ne: true } })
   }
   next()
})

// Middleware to exclude `isDeleted: true` items during aggregation operations.
OrderSchema.pre('aggregate', function (next) {
   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
   next()
})

// Mongoose model for orders.
export const Orders = model<TOrders>('Order', OrderSchema)
