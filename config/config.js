module.exports = {
    mongoURI: process.env.MONGO_URI,
    jwtSecret: process.env.SECRET_KEY,
    jwtExpiration: '24h'
  };
  