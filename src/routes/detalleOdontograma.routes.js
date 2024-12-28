import { Router } from "express";
import {
  createOdontograma,
  deleteOdontogramas,
  getOdontograma,
  getOdontogramas,
  updateOdontograma,
} from "../controllers/detalleOdontograma.controller.js";

const router = Router();

// GET all Odontograma detalle
router.get("/odontogramaDetalle", getOdontogramas);

// GET An Odontograma detalle
router.get("/odontogramaDetalle/:id", getOdontograma);

// DELETE An Odontograma detalle
router.delete("/odontogramaDetalle/:id", deleteOdontogramas);

// INSERT An Odontograma detalle
router.post("/odontogramaDetalle", createOdontograma);

router.patch("/odontogramaDetalle/:id", updateOdontograma);

export default router;
