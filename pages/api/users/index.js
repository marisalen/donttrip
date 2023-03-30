// pages/api/posts.js
import { use } from "react";
import { prisma } from "@/server/db/client";

export default async function handle(req, res) {
  const { method } = req;
  const { userId } = req.query;

  switch (method) {
    case "GET":
      // Get a single trip by id
      const user = await prisma.user.findUnique({
        where: { id: Number(userId) },
      });
      if (!user) {
        res.status(404).json({ message: "user not found" });
        break;
      }
      res.status(200).json(user);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
