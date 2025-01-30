const _getSubscriptionPlans = async (req, res) => {
  const plans = [
    {
      id: 1,
      title: "Free Plan",
      price: "Free",
      paidPlan: false,
      description: [
        "Unlimited quotes",
        "Manage all quotes in the admin",
        "Email Notification with auto response",
        "Customize add-to-quote button design",
        "Customize the quotation button and badge",
      ],
    },

    {
      id: 2,
      title: "Premium Plan",
      price: 5.99,
      paidPlan: true,
      description: [
        "All Features of Free Plan",
        " Hide add to cart button from product page",
        "Hide price from product page",
        "Customize quotation button icon",
        "Setup quotation toast popup icon",
        "Customize quotation form",
        "Price negotiation feature for customers",
      ],
    },
  ];

  res.status(200).send(plans);
};

export default _getSubscriptionPlans;
