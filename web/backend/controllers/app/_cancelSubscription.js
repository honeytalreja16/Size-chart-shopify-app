import shopify from "../../../shopify.js";
const _cancelSubscription = async (req, res) => {
  const session = res.locals.shopify.session;
  const { planId } = req.body;
  try {
    const planRes = await shopify.api.rest.RecurringApplicationCharge.delete({
      session: session,
      id: planId,
    });
    res.status(200).send({ planRes });
  } catch (error) {
    console.log("error: ", error);
  }
};

export default _cancelSubscription;
