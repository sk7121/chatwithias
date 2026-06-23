const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const { onlineUsers } = require("../socket/socket");

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, text, receiverId } = req.body;

    const message = await Message.create({
      conversationId,
      sender: req.user.id,
      text,
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessage: text,
      lastMessageAt: new Date(),
    });

    const populatedMessage = await Message.findById(message._id).populate(
      "sender",
      "username email avatar",
    );

    const io = req.app.get("io");
    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", {
        conversationId,
        receiverId,
        message: populatedMessage,
      });
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    })
      .populate("sender", "username email avatar")
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
