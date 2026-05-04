import express from 'express';
import mongoose from 'mongoose';
import User from '../../models/model/user.js';
import chatModel from '../../models/model/chatModel.js';
import requireAuth from '../auth/authMiddleware.js';

const chatApi = express.Router();

chatApi.use(requireAuth);

chatApi.get('/contacts', async (req, res) => {
  try {
    const userId = req.user._id;
    const toIds = await chatModel.distinct('to', { by: userId });
    const fromIds = await chatModel.distinct('by', { to: userId });
    const partnerIds = Array.from(new Set([...toIds, ...fromIds])).filter(
      (id) => id.toString() !== userId.toString()
    );

    const users = await User.find({ _id: { $in: partnerIds } }).select('username email role');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load chat contacts', error: error.message });
  }
});

chatApi.get('/users', async (req, res) => {
  try {
    const userId = req.user._id;
    const initiatedChats = await chatModel.distinct('to', { by: userId });
    const users = await User.find({ _id: { $in: initiatedChats } }).select('username email role');
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load initiated chats', error: error.message });
  }
});

chatApi.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findById(id).select('username email role');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load user', error: error.message });
  }
});

chatApi.get('/conversation/:otherId', async (req, res) => {
  try {
    const { otherId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(otherId)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const messages = await chatModel.find({
      $or: [
        { by: req.user._id, to: otherId },
        { by: otherId, to: req.user._id },
      ],
    })
      .sort({ createdAt: 1 })
      .lean();

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: 'Unable to load conversation', error: error.message });
  }
});

chatApi.post('/conversation/:otherId', async (req, res) => {
  try {
    const { otherId } = req.params;
    const { message } = req.body;

    if (!mongoose.Types.ObjectId.isValid(otherId)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    const chat = await chatModel.create({
      by: req.user._id,
      to: otherId,
      message: message.trim(),
    });

    res.status(201).json({ message: chat });
  } catch (error) {
    res.status(500).json({ message: 'Unable to save message', error: error.message });
  }
});

export default chatApi;
