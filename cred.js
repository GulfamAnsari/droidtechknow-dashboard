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
  SECRET_KEY: process.env.SECRET_KEY
}

