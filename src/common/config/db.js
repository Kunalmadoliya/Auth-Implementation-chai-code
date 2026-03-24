import mongoose from "mongoose"

const connectToDB = async() =>{
    const conn = await mongoose.connect(process.env.MNGODB_URI)
    console.log(conn);

    console.log(`MongoDB Connected : ${conn.connection.host}`);
    
    
}

export default connectToDB