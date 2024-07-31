import express from 'express';
import initializeUser from '../utils/initializeUser';
import { User } from '../models/userModel';

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    await initializeUser(userId);
    res.status(200).json({ message: 'User initialized successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to initialize user' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve user data' });
  }
});


export default router;
