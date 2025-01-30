import shopify from "../../../shopify.js";

const _getAssetFile = async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const file = await shopify.api.rest.Asset.all({
      session: session,
      theme_id: 136880193735,
      asset: { key: "config/settings_data.json" },
    });
    res.status(200).send(file);
  } catch (error) {}
};

export default _getAssetFile;
