import shopify from "../../../shopify.js";

const _createSubscriptionPlan = async (req, res) => {
  const session = res.locals.shopify.session;
  const plan = req.body;
  const shopName = session.shop.replace(".myshopify.com", "");
  try {
    const client = new shopify.api.clients.Graphql({ session });
    const data = await client.query({
      data: {
        query: `mutation AppSubscriptionCreate($name: String!, $lineItems: [AppSubscriptionLineItemInput!]!, $returnUrl: URL!,$test: Boolean!) {
          appSubscriptionCreate(name: $name, returnUrl: $returnUrl,test: $test, lineItems: $lineItems) {
            userErrors {
              field
              message
            }
            appSubscription {
              id
            }
            confirmationUrl
          }
        }`,
        variables: {
          name: plan.title,
          returnUrl: `https://admin.shopify.com/store/${shopName}/apps/seo-app-dev-1/subscription`,
          test: true,
          lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  price: {
                    amount: plan.price,
                    currencyCode: "USD",
                  },
                  interval: "EVERY_30_DAYS",
                  discount: {
                    value: {
                      amount: 4.99,
                    },
                    durationLimitInIntervals: 3,
                  },
                },
              },
            },
          ],
        },
      },
    });

    if (data.body.data.appSubscriptionCreate.userErrors.length > 0) {
      console.log(
        data.body.data.appSubscriptionCreate.userErrors,
        "subscription use errors"
      );
      return res
        .status(400)
        .json(data.body.data.appSubscriptionCreate.userErrors);
    }

    console.log("Subscription created: ", data.body.data.appSubscriptionCreate);
    res.status(200).json(data.body.data.appSubscriptionCreate);
  } catch (error) {
    console.log("Subscription creation error: ", error);
    res.status(500).send({ error: "Failed to create subscription plan" });
  }
};

export default _createSubscriptionPlan;
