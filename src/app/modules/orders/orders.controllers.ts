import { Request, Response } from 'express'
import { orderService } from './orders.service'
import { orderValidationZodSchema } from './orders.validation.zod'
import { Types } from 'mongoose'

// Fetches all orders from the database.

const getAllOrders = async (req: Request, res: Response) => {
   try {
      const result = await orderService.getAllOrdersFromDB()
      res.status(200).json({
         success: true,
         message: 'Orders retrieved successfully.',
         data: result || 'No orders found',
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: 'Failed to retrieve orders.',
         err,
      })
   }
}

// Fetches a single order by ID.

const getSingleOrder = async (req: Request, res: Response) => {
   try {
      const { orderId } = req.params
      const result = await orderService.getSingleOrderFromDB(orderId)
      res.status(200).json({
         success: true,
         message: 'Order retrieved successfully.',
         data: result || 'Order not found.',
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message || 'Failed to retrieve the order.',
         err,
      })
   }
}

// Creates a new order in the database.

const createOrder = async (req: Request, res: Response) => {
   try {
      const orderData = req.body
      const zodParsedData = orderValidationZodSchema.parse(orderData)

      const orderDataForDB = {
         ...zodParsedData,
         product: new Types.ObjectId(zodParsedData.product),
      }

      const result = await orderService.createOrderIntoDB(orderDataForDB)

      res.status(200).json({
         success: true,
         message: 'Order Successfully Created!',
         data: result,
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.issues
            ? err.issues[0]?.message
            : err.message || 'Failed to create the order.',
         err,
      })
   }
}

// Deletes an order by ID.

const deleteOrder = async (req: Request, res: Response) => {
   try {
      const { orderId } = req.params
      const result = await orderService.deleteSingleOrderFromDB(orderId)
      res.status(200).json({
         success: true,
         message: 'Order deleted successfully.',
         data: result,
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message || 'Failed to delete the order.',
         err,
      })
   }
}

// Calculates revenue from all orders.

const ordersRevenue = async (req: Request, res: Response) => {
   try {
      const result = await orderService.revenueCalculateForAllOrdersFromDB()
      res.status(200).json({
         success: true,
         message: 'Revenue calculated successfully.',
         data: result || 'No data available for revenue calculation.',
      })
   } catch (err: any) {
      res.status(500).json({
         success: false,
         message: err.message || 'Failed to calculate revenue.',
         err,
      })
   }
}

// Exports all order controllers.

export const orderControllers = {
   getAllOrders,
   getSingleOrder,
   createOrder,
   deleteOrder,
   ordersRevenue,
}
