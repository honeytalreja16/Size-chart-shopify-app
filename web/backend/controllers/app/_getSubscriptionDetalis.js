import shopify from "../../../shopify.js";

export const _getSubscriptionDetalis = async (req, res) => {
  try {
    const { chargeId } = req.params;
    // console.log(chargeId, "charge id---");
    const session = res.locals.shopify.session;
    const planInfo = await shopify.api.rest.RecurringApplicationCharge.find({
      session: session,
      id: chargeId,
    });
    // console.log(planInfo);
    res.status(200).send(planInfo);
  } catch (error) {}
};
