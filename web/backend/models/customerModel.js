import mongoose from "mongoose";
import connectDB from "../configs/db.js";

const customerSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    store_domain: {
      type: String,
    },
    appName: {
      type: String,
      default: "Wt loyalty point app",
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    addresses: {
      type: Array,
      default: [],
    },
    amountSpent: {
      type: Array,
      default: [],
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "CustomersInfo",
  }
);
const initializeDB = async () => {
  try {
    const { conn2 } = await connectDB();

    const Customers = conn2.model("CustomersInfo", customerSchema);
    return Customers;
  } catch (error) {
    console.error("Error initializing database:", error);
    process.exit(1);
  }
};

const Customer = await initializeDB();

export default Customer;
// const Customer = (conn2) => conn2.model("Customer", customerSchema);

// export default Customer;
