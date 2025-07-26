import Chat from "../models/chat.schema.js";
import User from "../models/user.schema.js";

export const addChat = async (req, res) => {
  const tokenUserId = req.user._id;
  const { receiverId } = req.body;
  try {
    const existingChat = await Chat.findOne({
      userIDs: { $all: [tokenUserId, receiverId] },
    });
    if (existingChat) {
      return res.status(200).json(existingChat);
    }
    const newChat = await Chat.create({
      userIDs: [tokenUserId, receiverId],
      seenBy: [tokenUserId],
    });
    res.status(201).json(newChat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create chat!" });
  }
};

export const getChats = async (req, res) => {
  const tokenUserId = req.user._id;
  try {
    const chats = await Chat.find({ userIDs: tokenUserId })
      .sort({ updatedAt: -1 })
      .lean();
    const enrichedChats = await Promise.all(
      chats.map(async (chat) => {
        const receiverId = chat.userIDs.find(
          (id) => id.toString() !== tokenUserId.toString()
        );
        const receiver = await User.findById(receiverId).select(
          "id username avatar"
        );
        return {
          ...chat,
          receiver,
        };
      })
    );
    res.status(200).json(enrichedChats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get chats!" });
  }
};

export const getChat = async (req, res) => {
  const tokenUserId = req.user._id;
  try {
    const chat = await Chat.findOne({
      _id: req.params.id,
      userIDs: tokenUserId,
    });
    //   .populate({
    //     path: "messages",
    //     options: { sort: { createdAt: 1 } },
    //   })
    //   .lean();
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    if (!chat.seenBy.includes(tokenUserId)) {
      await Chat.findByIdAndUpdate(chat._id, {
        $addToSet: { seenBy: tokenUserId },
      });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to get chat!" });
  }
};

export const readChat = async (req, res) => {
  const tokenUserId = req.user._id;
  try {
    const chat = await Chat.findOneAndUpdate(
      {
        _id: req.params.id,
        userIDs: tokenUserId,
      },
      {
        $addToSet: { seenBy: tokenUserId },
      },
      { new: true }
    );
    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }
    res.status(200).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to mark chat as read!" });
  }
};
