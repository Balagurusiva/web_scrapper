import mongoose from 'mongoose'

let isConnected = false

export const connectToDB =async () =>{
    mongoose.set('strictQuery', true)

    if(!process.env.MONGODB_URI) return console.log("MONGODB_URI ins not defind")

    if(isConnected) return console.log("already db is connected")

     try {
        await mongoose.connect(process.env.MONGODB_URI)
        isConnected = true
        console.log("DB connected ")
     } catch (error) {
        console.log(error)
     }

}