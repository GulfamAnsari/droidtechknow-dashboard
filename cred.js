module.exports = CRED_OBJECTS = {
  MYSQL: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  },
  MONGO: {
    host: process.env.MONGO_HOST,
    user: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE
  },
  CLOUDINARY: {
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  },
  WEATHER: {
    API_KEY: process.env.WEATHER_API_KEY
  },
  SECRET_KEY: process.env.SECRET_KEY
}

