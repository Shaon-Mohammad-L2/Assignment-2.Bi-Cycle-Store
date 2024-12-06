import { TOrders } from './orders.interface'
import { Orders } from './orders.models'

const getAllOrdersFromDB = async () => {
   const result = await Orders.find()
   return result
}

const getSingleOrderFromDB = async (orderId: string) => {
   const result = await Orders.findOne({ _id: orderId })
   return result
}

const createOrderIntoDB = async (orderData: TOrders) => {
   const result = await Orders.create(orderData)
   return result
}

const deleteSingleOrderFromDB = async (orderId: string) => {
   const result = await Orders.updateOne({ _id: orderId }, { isDeleted: true })
   return result
}

const revenueCalculateForAllOrdersFromDB = async () => {
   const result = await Orders.aggregate(
      [
         {
            $group: {
               _id: null,
               totalRevenue: { $sum: '$totalPrice' },
            },
         },
         {
            $project: {
               _id: 0,
               totalRevenue: 1,
            },
         },
      ],
      { skipMiddleware: true },
   )

   const totalRevenue = result[0] || 0

   return totalRevenue
}

export const orderService = {
   getAllOrdersFromDB,
   getSingleOrderFromDB,
   createOrderIntoDB,
   deleteSingleOrderFromDB,
   revenueCalculateForAllOrdersFromDB,
}
