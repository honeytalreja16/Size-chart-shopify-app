import mongoose from "mongoose";

const sizechartModel = mongoose.Schema(
  {
    store_domain: {
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

const Sizecharts = mongoose.model("Sizechart", sizechartModel);

export default Sizecharts;
