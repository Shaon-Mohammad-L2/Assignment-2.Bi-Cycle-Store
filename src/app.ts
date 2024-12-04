import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { Routes } from './routes'

const app: Application = express()

// Middleware for parsing JSON requests and enabling CORS.

app.use(express.json())
app.use(cors())

// Main API routes.

app.use('/api', Routes)

// Default home route for testing server health.

const getHomeRoute = (req: Request, res: Response) => {
   res.status(200).json({
      server: 'Active',
      success: true,
      message: 'This is Home Route.',
   })
}
app.get('/', getHomeRoute)

export default app
