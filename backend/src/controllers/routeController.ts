import { Request, Response } from "express";
import Route from "../models/route";

export const addNewRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { station, apparatus, number, module, description } = req.body;
    const newRoute = new Route({
      station,
      apparatus,
      number,
      module,
      description,
    });

    const savedRoute = await newRoute.save();
    res
      .status(201)
      .json({ message: "New route added successfully", data: savedRoute });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while adding the new route", error });
  }
};

export const getRoutes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { date, station, apparatus } = req.query;

    const query: any = {};

    if (date) {
      query.date = date;
    }

    if (station) {
      query.station = station;
    }

    if (apparatus) {
      query.apparatus = apparatus;
    }

    const routes = await Route.find(query).sort({ date: -1, time: -1 });
    res.status(200).json(routes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching routes", error });
  }
};

export const getRouteById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) {
      res.status(404).json({ message: "Route not found" });
    } else {
      res.status(200).json(route);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching route", error });
  }
};

export const updateRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id, date, time, station, apparatus, number, module, description } =
      req.body;

    const updatedRoute = await Route.findByIdAndUpdate(
      _id,
      {
        date,
        time,
        station,
        apparatus,
        number,
        module,
        description,
      },
      { new: true }
    );

    if (!updatedRoute) {
      res.status(404).json({ message: "Route not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "Route updated successfully", data: updatedRoute });
  } catch (error) {
    console.error("Error while updating the route:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the route", error });
  }
};

export const deleteRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id);
    if (!deletedRoute) {
      res.status(404).json({ message: "Route not found" });
    } else {
      res.status(200).json({ message: "Route deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting route", error });
  }
};
