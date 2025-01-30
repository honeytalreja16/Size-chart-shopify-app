import shopify from "../../../shopify.js";

const _getPages = async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const pages = await shopify.api.rest.Page.all({ session: session });
    res.status(200).send(pages);
  } catch (err) {
    console.log(err, "get page error =========---=-00000000=");
  }
};

export default _getPages;
