import { prisma } from "@/server/db/client";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const trips = await prisma.Trip.findMany();
      res.status(200).json(trips);
      break;
    case "POST":

    const session = await getServerSession(req, res, authOptions)
    if (!session) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }
  
    const prismaUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    })
  
    if (!prismaUser) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    const userId = prismaUser.id; 

    const { title, location, content } = req.body;
    if (!title || !location || !content) {
        res.status(400).json({ message: "Missing required fields" });
        break;
    }
    const newTrip = await prisma.Trip.create({
        data: { title, location, content, userId },
    });
    res.status(201).json(newTrip);
    break;
    default:
      res.status(405).end();
  }
}

