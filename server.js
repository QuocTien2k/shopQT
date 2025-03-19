import jsonServer from "json-server";
import { fileURLToPath } from "url";
import { dirname } from "path";
import process from "process";

// Lấy đường dẫn tuyệt đối của file db.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(`${__dirname}/db.json`);
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 5000;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`✅ JSON Server is running on port ${port}`);
});
