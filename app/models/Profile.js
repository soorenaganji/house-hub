import { Schema, model, models } from "mongoose";

const profileSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    bedroomsCount: {
      type: Number,
      required: true,
    },
    bathroomsCount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rentalOrSell: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: false,
    },
    deposit: {
      type: Number,
      required: false,
    },
    mortgage: {
      type: Number,
      required: false,
    },
    facilities: {
      type: [String],
      default: [],
    },
    rules: {
      type: [String],
      default: [],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Profile = models.Profile || model("Profile", profileSchema);

export default Profile;
