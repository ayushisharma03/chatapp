import mongoose from 'mongoose';
const conversationSchema=new mongoose.Schema({
    participants:[    //A list of participants (users in the chat).
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
        }
    ],
    messages:[         //A list of messages exchanged in the conversation.
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message',
            default:[],
        },
    ],
},{timestamps:true});

const Conversation=mongoose.model("Conversation",conversationSchema);
export default Conversation;