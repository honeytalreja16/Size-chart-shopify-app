import shopify from "../../../shopify.js";

const _getThemeAssets = async (req, res) => {
  try {
    console.log("get assest");
    const session = res.locals.shopify.session;
    const themes = await shopify.api.rest.Theme.all({ session });
    const filteredTheme = themes.data.filter((x) => x.role == "main")[0];

    const allAssets = await shopify.api.rest.Asset.all({
      session: session,
      theme_id: filteredTheme.id,
    });
    res.status(200).send(allAssets);
  } catch (error) {
    console.log(error, "get Assets error");
  }
};

export default _getThemeAssets;
