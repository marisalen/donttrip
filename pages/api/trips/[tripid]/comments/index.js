// pages/api/posts.js
import { prisma } from "@/server/db/client";

export default async function handle(req, res) {
  const { method } = req;
 
  switch (method) {
    case "GET":
      // get all posts from the database
      const comments = await prisma.comment.findMany({
        where: {
          tripId: parseInt(req.query.tripid)
        }
      });
      // send the posts to the client
      res.status(200).json(comments);
      break;

      case "POST":
        const comment = await prisma.comment.create({
          data: {
            content: req.body.content,
            trip: {
              connect: {
                id: parseInt(req.query.tripid)
              }
            }
          }
        });
        res.status(201).json(post);
        break;      
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}