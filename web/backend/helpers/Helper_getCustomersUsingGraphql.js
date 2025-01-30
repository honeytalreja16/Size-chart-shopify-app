import shopify from "../../shopify.js";
import { GET_CUSTOMERS } from "../graphql/app.js";

const Helper_getCustomersUsingGraphql = async ({ session, cursor }) => {
  try {
    const graphqlClient = new shopify.api.clients.Graphql({
      session,
    });

    const graphqlData = await graphqlClient.query({
      data: GET_CUSTOMERS(cursor),
    });
    return graphqlData.body?.data?.customers;
  } catch (error) {
    console.log(error, "error fro m fsef ");
    return {
      error: error.message || "Customers not found",
    };
  }
};

export default Helper_getCustomersUsingGraphql;
