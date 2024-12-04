import app from './app'
import mongoose from 'mongoose'
import config from './app/config'

async function main() {
   try {
      //connect with mongodb via mongoose.
      await mongoose.connect(config.db_url as string)

      // server on
      app.listen(config.port, () => {
         console.log(`Server is Running on PORT : ${config.port}`)
      })
   } catch (err) {
      console.log('Error from Server Connection PORT', err)
   }
}

main()
