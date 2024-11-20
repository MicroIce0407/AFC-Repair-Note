import express from "express";
import {
  addNewRoute,
  getRoutes,
  getRouteById,
  updateRoute,
  deleteRoute,
} from "../controllers/routeController";

const router = express.Router();

router.post("/", addNewRoute);
router.get("/", getRoutes);
router.get("/:id", getRouteById);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

export default router;
