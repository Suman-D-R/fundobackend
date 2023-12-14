import { client } from '../config/redis';

const cacheMiddleware = async (req, res, next) => {
  const uniqueKey = req.body.user_id;
  console.log(uniqueKey);

  try {
    const cachedData = await client.get(uniqueKey);
    if (cachedData) {
      return res.json({
        code: HttpStatus.OK,
        data: JSON.parse(cachedData),
        message: 'Data retrieved from cache'
      });
    }
    next();
  } catch (error) {
    console.error('Error retrieving data from cache', error);
    next();
  }
};

export default cacheMiddleware;
