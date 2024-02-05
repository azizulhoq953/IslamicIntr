import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name of the donation Post"],
  },
  description: {
    type: String,
    required: [true, "Please enter description of the donation Post"],
  },
  price: {
    type: Number,
    required: [true, "Please enter price of the donation Post"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: [true, "Please Enter url of the donation post image"],
      },
    },
  ],
  amountGained: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please Enter the user ID"],
      },
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: String,
    default: Date.now,
  },
});

const Donation = mongoose.model("Donation", donationSchema);

export default Donation;
