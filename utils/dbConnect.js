import mongoose from 'mongoose'

const dbConnect = () =>{
if (mongoose.connections[0].readyState){
    console.log('Already connected Biatch!')
    return;
}
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true 
}, err =>{
    if(err) throw err;
    console.log("Connected to Mongodb bitch!")
})
}

export default dbConnect