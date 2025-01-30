import shopify from "../../shopify.js";
import { GET_BLOGS } from "../graphql/app.js";

const Helper_getBlogsUsingGraphql = async ({ session, query }) => {
  try {
    const graphqlClient = new shopify.api.clients.Graphql({
      session,
    });

    const graphqlData = await graphqlClient.query({
      data: GET_BLOGS(query),
    });

    console.log("GraphQL Data:", graphqlData.body.data.blogs); // Debugging log

    return graphqlData.body?.data?.blogs;
  } catch (error) {
    console.error("GraphQL Error:", error); // Debugging log
    return {
      error: error.message || "Blogs not found",
    };
  }
};

export default Helper_getBlogsUsingGraphql;
