import Customer from "../models/customerModel.js";

const createCustomerWebhook = async ({ topic, shop, payload, webhookId }) => {
  try {
    const customerData = {
      id: payload.id,
      store_domain: shop,
      firstName: payload.first_name,
      lastName: payload.last_name,
      email: payload.email,
      phone: payload.phone,
      addresses: payload.addresses,
    };
    const newCustomer = new Customer(customerData);
    await newCustomer.save();
  } catch (error) {}
};

export default createCustomerWebhook;
