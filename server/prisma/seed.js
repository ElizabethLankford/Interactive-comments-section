import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();
  const kyle = await prisma.user.create({ data: { name: "Kyle" } });
  const sally = await prisma.user.create({ data: { name: "Sally" } });

  const post1 = await prisma.post.create({
    data: {
      body: "Seed data for post one.",
      title: "Post One",
    },
  });
  const post2 = await prisma.post.create({
    data: {
      body: "Post two seed data random.",
      title: "Post Two",
    },
  });
  const comment1 = await prisma.comment.create({
    data: {
      message: "this is root comment",
      userId: kyle.id,
      postId: post1.id,
    },
  });
  const comment2 = await prisma.comment.create({
    data: {
      parentId: comment1.id,
      message: "this is a nested comment",
      userId: sally.id,
      postId: post1.id,
    },
  });
  const comment3 = await prisma.comment.create({
    data: {
      message: "this is another root comment",
      userId: sally.id,
      postId: post1.id,
    },
  });
}
seed();
