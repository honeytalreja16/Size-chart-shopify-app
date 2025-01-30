import Stores from "../../models/storeModel.js";

const _getStoreFrontStoreSettingDetails = async (req, res) => {
  try {
    const store = await Stores.findOne({
      store_domain: req.query.shop,
    });

    res.status(200).json(store);
  } catch (error) {
    console.log(error.message);
    res.status(200).send({
      error: error.message || " store details not found",
    });
  }
};

export default _getStoreFrontStoreSettingDetails;
