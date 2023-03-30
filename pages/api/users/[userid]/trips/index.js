// pages/api/posts.js
import { prisma } from "@/server/db/client";

export default async function handle(req, res) {
  const { method } = req;
 
  switch (method) {
    case "GET":
      // get all posts from the database
      const trip = await prisma.Trip.findMany({
        where: {
          userId: req.query.userid
        }
      });
      // send the posts to the client
      res.status(200).json(trip);
      break;

    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
