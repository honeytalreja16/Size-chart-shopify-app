import shopify from "../../../shopify.js";

const _getBlogs = async (req, res) => {
  const session = res.locals.shopify.session;
  const blogs = await shopify.api.rest.Blog.all({ session: session });
  res.status(200).send(blogs);
};

export default _getBlogs;
