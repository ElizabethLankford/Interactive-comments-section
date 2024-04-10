import fastify from "fastify";
import dotenv from "dotenv";
import sensible from "@fastify/sensible";
import cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();
const app = fastify();
app.register(sensible);
app.register(cors, {
  origin: process.env.CLIENT_URL,
  credentials: true,
});

const prisma = new PrismaClient();

app.get("/posts", async (req, res) => {
  // const posts = await prisma.post.findMany({
  //   select: {
  //     id: true,
  //     title: true,
  //   },
  // });
  // res.send(posts);
  return await commitToDb(
    prisma.post.findMany({
      select: {
        id: true,
        title: true,
      },
    })
  );
});

async function commitToDb(promise) {
  const [error, data] = await app.to(promise);
  if (error) return app.httpErrors.internalServerError(error.message);
  return data;
}
app.listen({ port: process.env.PORT });
