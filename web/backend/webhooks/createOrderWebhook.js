import Helper_AddLoyaltyPoints from "../helpers/Helper_AddLoyaltyPoints.js";

const createOrderWebhook = async ({ topic, shop, payload, webhookId }) => {
  try {
    console.log(payload, "order webhook trigger");
    Helper_AddLoyaltyPoints(payload, shop);
  } catch (error) {}
};

export default createOrderWebhook;
