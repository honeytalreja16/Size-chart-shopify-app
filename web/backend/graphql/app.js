// App Metafields
export const GET_APP_INSTALLATION_ID = () => `query {
  currentAppInstallation {
    id
    app {
      handle
    }
  }
}`;

export const GET_APP_METAFIELDS = (query) => `query {
    currentAppInstallation {
      metafields(${query}) {
        pageInfo{
          hasNextPage
          hasPreviousPage
        }
      edges {
        cursor
        node {
          id
          value
          type
          key
          namespace
        }
      }
    }
  }
}`;

export const CREATE_UPDATE_APP_METAFIELD =
  () => `mutation CreateAppDataMetafield($metafieldsSetInput: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafieldsSetInput) {
    metafields {
      id
      namespace
      key
      value
      type
    }
    userErrors {
      field
      message
    }
  }
}`;

// Collections
export const GET_COLLECTIONS = (query) => `
{
  collections(${query || "first:20"}){
    pageInfo{
      hasNextPage
      hasPreviousPage
    }
    edges{
      node{
        id
        title
        handle
        updatedAt
        image {  
              src  
          }
         
        metafields(first:10){
          edges{
            node{
              key
              value
            }
          }
        }
      }
    }
  }
}`;
// products
export const GET_PRODUCTS = (query) => `
{
  products(${query || "first:20"}){
    pageInfo{
      hasNextPage
      hasPreviousPage
      endCursor
    }
    edges{
      cursor
      node{
        id
        title
        handle
        onlineStorePreviewUrl
        updatedAt
        images(first: 1) {  
          edges {
            node {
              src  
            }
          }
        } 
        variants(first:20){
          edges{
            node{
              id
              title
              price
            }
          }
        }
      }
    }
  }
}`;

// Customers
export const GET_CUSTOMERS_FOR_SYNC = (query) => `{
  customers(${query || "first:20"}){
    pageInfo{
      hasNextPage
      hasPreviousPage
    }
    edges{
      cursor
      node{
        id
        metafields(first:20){
          edges{
            node{
              key
              value
            }
          }
        }
      }
    }
  }
}`;

export const GET_CUSTOMERS = (query) => `
{
  customers(${query || "first:20"}){
    pageInfo{
      hasNextPage
      hasPreviousPage
    }
    edges{
      cursor
      node{
        id
        firstName
        lastName
        email
        phone
      }
    }
  }
}`;
export const GET_BLOGS = (query) => `
{
  articles(${query}){
    pageInfo{
      hasNextPage
      hasPreviousPage
      endCursor
    }
    edges{
      cursor
      node{
        id
        title
        handle
        updatedAt
        image {
          src  
        }
        content
        publishedAt
      }
    }
  }
}`;
