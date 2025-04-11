import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

// ========================
// ✅ Send Message Controller
// ========================
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // ✅ from protectRoute middleware

        // ❌ Prevent sending message to self (optional but recommended)
        if (senderId.toString() === receiverId.toString()) {
            return res.status(400).json({ error: "Cannot send message to yourself" });
        }

        // Check if conversation exists between sender and receiver
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        // ✅ Auto-create conversation if not found
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, receiverId],
                messages: [],
            });
            await conversation.save(); // Save it so we can use its _id
        }

        // Create and save the message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        // Push message ID to the conversation
        conversation.messages.push(newMessage._id);

        // Save message and updated conversation in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
};

// ========================
// ✅ Get Messages Controller
// ========================
export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        // ❌ Prevent fetching messages with self (optional, based on your rules)
        // if (senderId.toString() === userToChatId.toString()) {
        //     return res.status(400).json({ error: "Cannot fetch messages with yourself" });
        // }

        // Find conversation between sender and receiver
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // Populate actual message docs

        if (!conversation) {
            return res.status(200).json([]); // Return empty list if no conversation
        }

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.log("Error in getMessages controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
