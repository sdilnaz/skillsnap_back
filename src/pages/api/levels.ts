import { NextApiRequest, NextApiResponse } from 'next';
import connectToMongoDB from '../../database/connect';
import Lesson from '../../models/lessonsModel';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await connectToMongoDB();
  const levels = await Lesson.find({});
  res.json(levels);
};

export default handler;
