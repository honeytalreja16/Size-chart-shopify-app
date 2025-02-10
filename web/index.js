import dotenv from "dotenv";
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";
import fs from "fs";

import shopify from "./shopify.js";
import GDPRWebhookHandlers from "./gdpr.js";

import cors from "cors";

import connectDB from "./backend/configs/db.js";

// app
import _getStoreDetails from "./backend/controllers/app/_getStoreDetails.js";
import _updateStoreDetails from "./backend/controllers/app/_updateStoreDetails.js";
import _getCollections from "./backend/controllers/app/_getCollections.js";
import _UploadImage from "./backend/controllers/app/_UploadImage.js";
import _getProducts from "./backend/controllers/app/_getProducts.js";
import multer from "multer";
import Middleware_saveStoreAppID from "./backend/middlewares/Middleware_saveStoreAppID.js";
import _getSubscriptionPlans from "./backend/controllers/app/_getSubscriptionPlans.js";
import _createSubscriptionPlan from "./backend/controllers/app/_createSubscriptionPlan.js";
import { _getSubscriptionDetalis } from "./backend/controllers/app/_getSubscriptionDetalis.js";
import _getStoreFrontStoreSettingDetails from "./backend/controllers/store-front/_getStoreFrontStoreSettingDetails.js";
import _cancelSubscription from "./backend/controllers/app/_cancelSubscription.js";
import _getThemeAssets from "./backend/controllers/app/_getThemeAssets.js";
import _uploadCompressedImage from "./backend/controllers/app/_uploadCompressedImage.js";
import _getAssetFile from "./backend/controllers/app/_getAssetFile.js";
import _getBlogs from "./backend/controllers/app/_getBlogs.js";
import _getPages from "./backend/controllers/app/_getPages.js";
import _sendqueryMail from "./backend/controllers/app/_sendqueryMail.js";
import _AddLoyaltyPoints from "./backend/controllers/app/_AddLoyaltyPoints.js";
import _getShopifyShopDetails from "./backend/controllers/app/_getShopifyShopDetails.js";
import _addNewSizeChart from "./backend/controllers/app/_addNewSizeChart.js";
// store front

dotenv.config({});
const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);
const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
console.log(process.env.NODE_ENV);

// Connect MongoDB
connectDB();

app.use(cors());

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  Middleware_saveStoreAppID, // save store id and domain and app id
  // Middleware_saveCustomersData,
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

app.use(express.json());
app
  .route("/api/store-front/store-details")
  .get(_getStoreFrontStoreSettingDetails);
// app.route("/api/store-front/get-top-bars").get(_getStoreFrontTopBars);

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({ limit: "10mb" }));

const getFormattedDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${date}${hours}${minutes}${seconds}`;
};

const storage = multer.diskStorage({
  destination: "./frontend/uploads",
  filename: function (req, file, cb) {
    const userId = getFormattedDateTime();
    console.log(userId, "user id ------");
    cb(null, `${userId}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.route("/api/store-details").get(_getStoreDetails).post(_updateStoreDetails);

app.route("/api/getCollections").get(_getCollections);
app.route("/api/getProducts").get(_getProducts);
app.route("/api/getBlogs").get(_getBlogs);
app.route("/api/getPages").get(_getPages);
app.route("/api/getSubscriptionPlans").get(_getSubscriptionPlans);
app.post("/api/uploadImage", upload.single("image"), _UploadImage);
app.post("/api/createSubscriptionPlan", _createSubscriptionPlan);
app.get("/api/getSubscriptionPlan:chargeId", _getSubscriptionDetalis);
app.post("/api/cancelSubscription", _cancelSubscription);
app.get("/api/getThemeAssets", _getThemeAssets);
app.post(
  "/api/uploadCompressedImage/:imageId",
  upload.single("image"),
  _uploadCompressedImage
);
app.post("/api/addnewSizeChart",_addNewSizeChart);
// app.get("/api/getItems",_getItems)

app.get("/api/getAssetFile", _getAssetFile);
app.post("/api/query-email", _sendqueryMail);
app.post("/api/addLoyaltyPoints", _AddLoyaltyPoints);
app.get("/api/shopifyStoreDetails", _getShopifyShopDetails);

app.post("/api/deleteImage", function (req, res) {
  const imgurlArr = req.body.imgUrl.split("/");
  const imgName = imgurlArr[imgurlArr.length - 1];

  fs.unlink(`./frontend/uploads/${imgName}`, (error) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log("deleted");
    return res.json({ deleted: true });
  });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

// // Used middlewares for error handling
// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT);
