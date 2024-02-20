import { Router } from "express";
import { verifyjwt as verifyToken } from "../middlewares/auth.middleware.js";
import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  // getListings,
} from "../controllers/listing.controller.js";

const router = Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
// router.get("/get", getListings);

export default router;
