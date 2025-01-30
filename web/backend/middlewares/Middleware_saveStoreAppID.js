import shopify from "../../shopify.js";
import Helper_currentAppInstallationId from "../helpers/Helper_currentAppInstallationId.js";
import Stores from "../models/storeModel.js";

const Middleware_saveStoreAppID = async (req, res, next) => {
  try {
    const shopData = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });

    let store = await Stores.findOne({
      store_domain: res.locals.shopify.session.shop,
    });

    const { id } = await Helper_currentAppInstallationId(
      res.locals.shopify.session
    );

    if (store) {
      // update store app id
      await Stores.updateOne(
        {
          _id: store._id,
        },
        {
          app_id: id,
          storeEmail: shopData.data[0].email,
          storeName: shopData.data[0].name,
          storePhone: shopData.data[0].phone,
          storeProvience: shopData.data[0].province,
          storeCountry: shopData.data[0].country,
          storeAddress1: shopData.data[0].address1,
          storeAddress2: shopData.data[0].address2,
          storeZipCode: shopData.data[0].zip,
          storeCity: shopData.data[0].city,
          firstVisit: true,
        }
      );
    } else if (!store && id) {
      // create new store
      await Stores.create({
        store_domain: res.locals.shopify.session.shop,
        app_id: id,
        storeEmail: shopData.data[0].email,
        storeName: shopData.data[0].name,
        storePhone: shopData.data[0].phone,
        storeProvience: shopData.data[0].province,
        storeCountry: shopData.data[0].country,
        storeAddress1: shopData.data[0].address1,
        storeAddress2: shopData.data[0].address2,
        storeZipCode: shopData.data[0].zip,
        storeCity: shopData.data[0].city,
      });
    }
  } catch (error) {
    console.log("error:--", error);
  }

  next();
};

export default Middleware_saveStoreAppID;
