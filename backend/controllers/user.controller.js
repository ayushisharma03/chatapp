// What getUsersForSidebar Does
// This controller function:
// Gets the logged-in user's ID from the request.
// Finds all conversations that include this user.
// Extracts the other participants in each conversation.
// Fetches those users, name, email, avatar for display in the sidebar.
import User from '../models/user.model.js';
export const getUsersForSidebar=async(req,res)=>{
    try{

        const loggedInUserId = req.user._id;

        //Find all conversations that include this user except for the current logged in user
        const filteredUsers=await User.find({
            _id:{$in :[loggedInUserId]}
        }).select("-password");
        res.status(200).json(filteredUsers);

    }catch(error){
        console.error("Error in getUsersForSidebar:",error.message)
       res.status(500).json({error:"Internal server error"});

    }
}