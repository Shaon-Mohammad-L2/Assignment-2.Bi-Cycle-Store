import express from 'express'
import { productControllers } from './app/modules/produtcs/products.controllers'
import { orderControllers } from './app/modules/orders/orders.controllers'

const router = express.Router()

// Routes for product-related operations.
router.get('/products', productControllers.getAllProdcuts)
router.get('/products/:productId', productControllers.getSingleProduct)
router.post('/products', productControllers.createProduct)
router.put('/products/:productId', productControllers.updateProduct)
router.delete('/products/:productId', productControllers.deleteProduct)

// Routes for order-related operations.
router.get('/orders', orderControllers.getAllOrders)
router.get('/orders/revenue', orderControllers.ordersRevenue)
router.get('/orders/:orderId', orderControllers.getSingleOrder)
router.post('/orders', orderControllers.createOrder)
router.delete('/orders/:orderId', orderControllers.deleteOrder)

export const Routes = router
