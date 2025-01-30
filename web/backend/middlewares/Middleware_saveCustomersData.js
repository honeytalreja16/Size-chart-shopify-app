import shopify from "../../shopify.js";
import Helper_getCustomersUsingGraphql from "../helpers/Helper_getCustomersUsingGraphql.js";
import Customer from "../models/customerModel.js";

const Middleware_saveCustomersData = async (req, res, next) => {
  try {
    next();
    const shopData = await shopify.api.rest.Shop.all({
      session: res.locals.shopify.session,
    });
    console.log("hitting middleware --======+++_---//???");
    console.log(shopData, "shopdata====");
    let hasNextPage = true;
    let cursor = null;

    while (hasNextPage) {
      const { edges, pageInfo } = await Helper_getCustomersUsingGraphql({
        session: res.locals.shopify.session,
        cursor: cursor,
      });

      let customers = edges || [];
      console.log(pageInfo, "page info---");

      for (const customer of customers) {
        cursor = customer.cursor;
        const customerExists = await Customer.findOne({
          email: customer.node.email,
        });
        let customerData = customer.node;
        customerData.store_domain = res.locals.shopify.session.shop;
        if (!customerExists) {
          const newCustomer = new Customer(customerData);
          await newCustomer.save();
          //   console.log(newCustomer, "new customer ---==---");
        } else {
          //   console.log("updated");
          await Customer.updateOne({ _id: customerExists._id }, customerData);
        }
      }

      hasNextPage = pageInfo.hasNextPage;
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching and saving customers");
  }
};

export default Middleware_saveCustomersData;
