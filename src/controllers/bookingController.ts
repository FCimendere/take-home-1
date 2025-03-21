import { Request, Response } from "express";
import bookingService from "../services/bookingService";

class BookingController {
  async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      const bookings = await bookingService.getAllBookings();
      res.json(bookings);
    } catch (error) {
      console.error("Error getting all bookings:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving bookings" });
    }
  }

  async getBookingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const booking = await bookingService.getBookingById(id);

      if (!booking) {
        res.status(404).json({ error: "Booking not found" });
        return;
      }

      res.json(booking);
    } catch (error) {
      console.error("Error getting booking by ID:", error);
      res
        .status(500)
        .json({ error: "An error occurred while retrieving booking" });
    }
  }

  async deleteBookingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await bookingService.deleteBookingById(id);

      if (deleted.length === 0) {
        res.status(404).json({ error: "Booking not found" });
        return;
      }

      res.json(deleted);
    } catch (error) {
      console.error("Error deleting booking:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting booking" });
    }
  }

  async approveBookingById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const approvedBooking = await bookingService.approveBooking(id);

      if (!approvedBooking) {
        res.status(400).json({ error: "Cannot be approved" });
        return;
      }

      res.json({
        message: "Booking approved!",
        approvedBooking,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Error Approving booking:", errorMessage);
      res.status(500).json({ error: errorMessage });
    }
  }

  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      const createdBooking = await bookingService.createBooking(data);
      res.status(201).json(createdBooking);
    } catch (error: any) {
      console.error("Error Creating booking:", error);
      res.status(400).json({ error: error.message });
    }
  }
}

export default new BookingController();
