import express from 'express'
import { productControllers } from './app/modules/produtcs/products.controllers'

const router = express.Router()

// Routes for product-related operations.

router.get('/products', productControllers.getAllProdcuts)
router.get('/products/:productId', productControllers.getSingleProduct)
router.post('/products', productControllers.createProduct)
router.put('/products/:productId', productControllers.updateProduct)
router.delete('/products/:productId', productControllers.deleteProduct)

// this route for orders.

// this route for revenue.

export const Routes = router
