import Helper_getProductsUsingGraphql from "../../helpers/Helper_getProductsUsingGraphql.js";

const _getProducts = async (req, res) => {
  console.log("hit----")
  const cursor = req.query.cursor
    ? `first:20,after: "${req.query.cursor}"`
    : "first:20";
    console.log(cursor,"cursor---")
  const { edges, pageInfo } = await Helper_getProductsUsingGraphql({
    session: res.locals.shopify.session,
    query: cursor,
  });

  let products = edges || [];
  res.status(200).send({ products, pageInfo });
};

export default _getProducts;
