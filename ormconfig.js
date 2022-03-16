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
