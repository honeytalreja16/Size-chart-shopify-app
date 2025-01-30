import shopify from "../../shopify.js";
import Stores from "../models/storeModel.js";
import Helper_getSessionByShopName from "./Helper_getSessionByShopName.js";

const Helper_AddLoyaltyPoints = async (order, shop) => {
  try {
    // Retrieve store data and session
    let storeData = await Stores.findOne({ store_domain: shop });
    let Session = await Helper_getSessionByShopName({ shop: shop });

    if (!storeData?.loyaltyPointEnabled) {
      return { message: "Loyalty point system Disabled from settings" };
    }

    // Get necessary order details
    let customerID = order.customer.admin_graphql_api_id;
    let totalPrice = Number(order.total_line_items_price);
    let OrderCurrencyCode = order.total_price_set.shop_money.currency_code;

    // Define loyalty points settings based on storeData
    const {
      loyaltyPointType,
      loyaltyPointValue,
      minimumPurchase,
      minPurchaseValue,
      limit,
      limitValue,
      expiryEnabled,
      expiryDays,
    } = storeData;

    let pointsEarned = 0;

    // Check for minimum purchase requirement
    if (minimumPurchase && totalPrice < minPurchaseValue) {
      console.log(
        "Order does not meet the minimum purchase requirement for points."
      );
      return;
    }

    // Calculate points based on the type
    if (loyaltyPointType === "percentage") {
      pointsEarned = (totalPrice * (loyaltyPointValue / 100)).toFixed(2);
    } else if (loyaltyPointType === "fixed") {
      pointsEarned = loyaltyPointValue; // Fixed value per order
    }

    // Apply limit if specified
    if (limit) {
      pointsEarned = Math.min(pointsEarned, limitValue);
    }

    // Only proceed if points were earned
    if (pointsEarned > 0) {
      const graphqlClient = new shopify.api.clients.Graphql({
        session: Session.session,
      });

      const expiryDate = expiryEnabled
        ? new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000) // Calculate expiry date
        : null;

      const graphqlData = await graphqlClient.query({
        data: {
          query: `
            mutation storeCreditAccountCredit($id: ID!, $creditInput: StoreCreditAccountCreditInput!) {
              storeCreditAccountCredit(id: $id, creditInput: $creditInput) {
                storeCreditAccountTransaction {
                  amount {
                    amount
                    currencyCode
                  }
                  account {
                    id
                    balance {
                      amount
                      currencyCode
                    }
                  }
                }
                userErrors {
                  message
                  field
                }
              }
            }
          `,
          variables: {
            id: customerID,
            creditInput: {
              creditAmount: {
                amount: pointsEarned,
                currencyCode: OrderCurrencyCode,
              },
              expiresAt: expiryDate,
            },
          },
        },
      });

      console.log(graphqlData, "graphql data ------------");
    } else {
      console.log("No points earned for this order based on store settings.");
    }
  } catch (error) {
    console.log(error, "error in create credit -----");
  }
};

export default Helper_AddLoyaltyPoints;
