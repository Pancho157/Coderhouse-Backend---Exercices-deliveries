import { Application } from "./dependencies/dependencies.ts";
import router from "./routes/routes.ts";

const PORT = 8080

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running on port:", PORT);
await app.listen({ port: PORT });