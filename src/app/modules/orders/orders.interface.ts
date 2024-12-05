import { Types } from 'mongoose'

// Defines the structure for order fields in the database.
export type TOrders = {
   email: string
   product: Types.ObjectId
   quantity: number
   totalPrice?: number
   isDeleted?: boolean
}
