import mongoose from "mongoose";

const storeModel = mongoose.Schema(
  {
    store_domain: {
      type: String,
      required: true,
    },
    app_id: {
      type: String,
      required: true,
    },
    Product: {
      type: Array,
      default: [],
    },
    Collection :{
      type: Array,
      default:[],
    },
    Title: {
      type: String,
      default: "",
    },
    // Password: {
    //   type: String,
    //   default: "",
    // },

    // Checked: {
    //   type: Boolean,
    //   default: false,
    // },
    Image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Stores = mongoose.model("Store", storeModel);

export default Stores;
