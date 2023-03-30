import { prisma } from "@/server/db/client";

export default async function handler(req, res) {
  const { tripId } = req.query;

  switch (req.method) {
    case "GET":
      // Get a single trip by id
      const trip = await prisma.trip.findUnique({
        where: { id: Number(tripId) },
      });
      if (!trip) {
        res.status(404).json({ message: "Trip not found" });
        break;
      }
      res.status(200).json(trip);
      break;

    case "PUT":
      // Update a trip by id
      const { title, location, startDate, endDate } = req.body;
      if (!title) {
        res.status(400).json({ message: "Missing trip title" });
        break;
      }
      const updatedTrip = await prisma.trip.update({
        where: { id: Number(tripId) },
        data: {
          title,
          location,
          startDate,
          endDate,
        },
      });
      if (!updatedTrip) {
        res.status(404).json({ message: "Trip not found" });
        break;
      }
      res.status(200).json(updatedTrip);
      break;

    case "DELETE":
      // Delete a trip by id
      await prisma.trip.delete({ where: { id: Number(tripId) } });
      res.status(204).end();
      break;

    default:
      res.status(405).end();
  }
}
