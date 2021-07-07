import { createConnection, Connection } from "typeorm";

export const connection = await createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "admin",
  password: "password",
  database: "chatbot",
  synchronize: true,
  entities: [require("./entities/User")],
});
