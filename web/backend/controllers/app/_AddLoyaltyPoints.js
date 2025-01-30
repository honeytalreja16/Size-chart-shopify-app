import shopify from "../../../shopify.js";

const _AddLoyaltyPoints = async (req, res) => {
  try {
    const graphqlClient = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    });
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
          id: "gid://shopify/Customer/7365887000775",
          creditInput: {
            creditAmount: {
              amount: 10,
              currencyCode: "INR",
            },
          },
        },
      },
    });
    console.log(graphqlData, "grapql data ------------");
  } catch (error) {
    console.log(error, "errror in create credit -----");
  }
};

export default _AddLoyaltyPoints;
