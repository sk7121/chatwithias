const Conversation = require("../models/Conversation");

exports.createConversation = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    }).populate("participants", "username email avatar isOnline");

    if (conversation) {
      return res.json(conversation);
    }

    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });

    conversation = await Conversation.findById(conversation._id).populate(
      "participants",
      "username email avatar isOnline",
    );

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user.id,
    })
      .populate("participants", "username email avatar isOnline")
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
