import { Router } from "express";

import {
  adminLogin,
  getAllListings,
  getAllUsers,
} from "../controllers/admin.controller.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").post(adminLogin);
router.route("/get-all-users").get(getAllUsers);
router.route("/get-all-listings").get(getAllListings);

export default router;
