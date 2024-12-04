import { Model } from 'mongoose'

//type safety for product fields.
export type TProducts = {
   code: string
   name: string
   brand: string
   price: number
   type: 'Mountain' | 'Road' | 'Hybrid' | 'BMX' | 'Electric'
   description: string
   quantity: number
   inStock: boolean
   isDeleted?: boolean
}

// mongoose custom static methods for product operations
export interface ProductModel extends Model<TProducts> {
   isDeletedTrue(id: string): Promise<TProducts>
}
