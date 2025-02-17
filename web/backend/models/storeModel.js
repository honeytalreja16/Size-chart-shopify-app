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
