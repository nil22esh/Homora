import Chat from "../models/chat.schema.js";
import Message from "../models/message.schema.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.user._id;
  const chatId = req.params.chatId;
  const text = req.body.text;
  try {
    const chat = await Chat.findOne({
      _id: chatId,
      userIDs: tokenUserId,
    });
    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }
    const message = await Message.create({
      text,
      chatId,
      userId: tokenUserId,
    });
    chat.seenBy = [tokenUserId];
    chat.lastMessage = text;
    await chat.save();
    res.status(200).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add message!" });
  }
};
