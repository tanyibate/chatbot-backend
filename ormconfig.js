module.exports = {
  url: process.env.DATABASE_URL,
  type: "postgres",
  synchronize: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  } /*if using a local database turn ssl off*/,
  entities: [require("./db/entities/User")],
};

/* local database config
module.exports = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities: [require("./db/entities/User")],
};
*/
