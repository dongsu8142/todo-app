import "reflect-metadata";
import app from "./app";
import { createConnection } from "typeorm";
import { Todo } from "./entity/todo";

const PORT = process.env.PORT || 3000;

createConnection({
  type: "mysql",
  host: process.env.MYSQL_DB_HOST,
  username: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  entities: [Todo],
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
