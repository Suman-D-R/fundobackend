import { client } from '../config/redis';

const cacheMiddleware = async (req, res, next) => {
  const uniqueKey = req.body.user_id;
  console.log(uniqueKey);

  try {
    const cachedData = await client.get(uniqueKey);
    console.log("cash data>>>>",cachedData);
    if (cachedData) {
      console.log("Data retrieved from cache", cachedData);
      return res.json(JSON.parse(cachedData));
    }
    next();
  } catch (error) {
    console.error("Error retrieving data from cache", error);
    next();
  }
};

export default cacheMiddleware;
