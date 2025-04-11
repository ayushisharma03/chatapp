import mongoose from "mongoose";

//Schema
const messageSchema=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,
        required:true
     }
},{timestamps:true});//createdAt,updatedAt=>message.createdAt:15:30(Automatically adds createdAt & updatedAt)


//model
const Message=mongoose.model("Message",messageSchema);
export default Message;

