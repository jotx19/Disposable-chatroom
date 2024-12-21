import Room from '../models/room.model.js';

const generateJoinCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars[randomIndex];
  }
  return code;
};

export const createRoom = async (req, res) => {
  try {
    const { name, participants = [] } = req.body;
    const user = req.user;

    if (!name) {
      return res.status(400).json({ error: 'Room name is required' });
    }

    const joinCode = generateJoinCode();
    const uniqueParticipants = Array.from(new Set([user._id, ...participants]));

    const room = new Room({
      name,
      createdBy: user._id,
      participants: uniqueParticipants,
      joinCode,
    });

    await room.save();
    res.status(201).json({
      message: 'Room created successfully',
      room: {
        id: room._id,
        name: room.name,
        joinCode: room.joinCode,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create room' });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const { joinCode } = req.body;
    const user = req.user;

    const room = await Room.findOne({ joinCode });
    if (!room) {
      return res.status(404).json({ error: 'Room not found or invalid join code' });
    }

    if (room.participants.includes(user._id)) {
      return res.status(400).json({ error: 'You are already in this room' });
    }

    room.participants.push(user._id);
    await room.save();

    res.status(200).json({ message: 'Successfully joined the room', room });
  } catch (error) {
    res.status(500).json({ error: 'Failed to join room' });
  }
};

export const getUserRooms = async (req, res) => {
  try {
    const user = req.user;
    const rooms = await Room.find({ participants: user._id }).populate('participants', 'name email');

    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get rooms' });
  }
};
