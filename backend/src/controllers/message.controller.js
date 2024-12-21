import Message from '../models/message.model.js';
import Room from '../models/room.model.js';
import cloudinary from '../lib/cloudinary.js';

export const sendMessage = async (req, res) => {
  try {
    const { roomId, content, image } = req.body;
    const user = req.user;

    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    let imageUrl = null;

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        folder: 'chat_app',
      });

      imageUrl = uploadResponse.secure_url;
    }

    const message = new Message({
      room: roomId,
      sender: user._id,
      content,
      image: imageUrl,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ room: roomId })
      .populate('sender', 'name email')
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get messages' });
  }
};
