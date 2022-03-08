import mongoose from 'mongoose';

const Connection = async (username, password) => {
   
    const URL =`mongodb+srv://${username}:${password}@cluster0.zsiui.mongodb.net/Vkart?retryWrites=true&w=majority`;
    try{  
   await mongoose.connect(URL,{
       useNewUrlParser: true,
       useUnifiedTopology: true,
       useFindAndModify:false,
       useCreateIndex: true 
    
    })
    console.log("database connected successfully")}
    catch(err){
        console.log(err.message)
    }
}



export default Connection;