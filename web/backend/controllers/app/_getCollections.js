import Helper_getCollectionsUsingGraphql from "../../helpers/Helper_getCollectionsUsingGraphql.js";

const _getCollections = async (req, res) => {
  const cursor = req.query.cursor
    ? `first:20,after: "${req.query.cursor}"`
    : "first:20";
  const { edges, pageInfo } = await Helper_getCollectionsUsingGraphql({
    session: res.locals.shopify.session,
    query: cursor,
  });

  let collections = edges || [];
  res.status(200).send({ collections, pageInfo } || {});
};

export default _getCollections;
