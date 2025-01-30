import shopify from "../../../shopify.js";

const _getShopifyShopDetails = async (req, res) => {
  try {
    const query = `
      {
        shop {
          customerAccounts
          customerAccountsV2{
            customerAccountsVersion
          }
        }
      }
    `;

    // Execute the GraphQL query
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });

    const response = await client.query({ data: query });
    res.status(200).send({ response });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export default _getShopifyShopDetails;
