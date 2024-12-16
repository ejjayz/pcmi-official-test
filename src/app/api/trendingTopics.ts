import { NextApiRequest, NextApiResponse } from 'next';
import { getTrendingTopics } from '@/app/actions/getTrendingTopics';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const trendingTopics = await getTrendingTopics();
    res.status(200).json(trendingTopics);
  } catch (error) {
    console.error('Error fetching trending topics:', error);
    res.status(500).json({ error: 'Failed to fetch trending topics' });
  }
}