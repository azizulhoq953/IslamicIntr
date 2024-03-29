import Donation from "../models/donation.js"
import ApiFeatures from "../utils/apiFeatures.js";

// Create Donation Post   --> Admin
export const createDonationPost = async (req, res) => {
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json({
      success: true,
      donation,
      message: "Donation Post Created Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while creating new donation post",
      error: err.message,
    });
  }
};

// get all the donations
export const getAllDonations = async (req, res) => {
  try {
    const apiFeature = new ApiFeatures(Donation.find(), req.query).search();

    const donations = await apiFeature.query;

    res.status(201).json({
      success: true,
      donations,
      message: "Fetched all the donations successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while getting all the donation post",
      error: err.message,
    });
  }
};

// get donation post details
export const getDonationPostDetails = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation Post Not Found",
      });
    }

    res.status(201).json({
      success: true,
      donation,
      message: "Fetched Donation post details successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while fetching the donation post",
      error: err.message,
    });
  }
};

// Update Product   --> Admin
export const updateDonationPost = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Donation Post Not found",
      });
    }

    const newDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      newDonation,
      message: "Donation Post updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while updating the donation post",
      error: err.message,
    });
  }
};

// Delete Donation Page
export const deleteDonationPage = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      return res.status(404).json({
        success: false,
        message: "Delete the donation post",
      });
    }

    await donation.remove();

    res.status(200).json({
      success: true,
      message: "Donation post deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while deleting the donation post",
      error: err.message,
    });
  }
};
