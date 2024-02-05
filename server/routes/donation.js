import express from "express";
import {
  createDonationPost,
  deleteDonationPage,
  getAllDonations,
  getDonationPostDetails,
  updateDonationPost,
} from "../controllers/donation.js";
import { verifyToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", verifyToken, authorizeRoles("admin"), createDonationPost);
router.get("/all", verifyToken, getAllDonations);
router.get("/:id", verifyToken, getDonationPostDetails);
router.put(
  "/update/:id",
  verifyToken,
  authorizeRoles("admin"),
  updateDonationPost
);
router.delete(
  "/delete/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteDonationPage
);

export default router;
