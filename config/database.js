require('dotenv').config()

module.exports = {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DB || "database_development",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: process.env.DB_DIALECT || "mysql",
    define: {
      timestamps: false,
      underscored: true
    }
  }