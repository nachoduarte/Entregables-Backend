import { Application, config , oakCors } from "../deps.ts";

import { router } from "./routes/index.ts";

const { PORT } = config();
const app = new Application();
app.use(oakCors())
app.use(router.routes());

console.log(`Servidor corriendo en el puerto ${PORT}`);

await app.listen({ port: Number(PORT) });