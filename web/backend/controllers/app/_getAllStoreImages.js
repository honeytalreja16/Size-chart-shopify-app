const _getAllStoreImages = async (req, res) => {
  try {
    const imageData = await client.query({
      data: `query {
      files(query: "media_type:IMAGE", first: 250) {
        edges {
          node {
          alt
            ... on MediaImage {
              id
              image {
                id
                originalSrc: url
                width
                height
              }
            }
          }
        }
      }
    },`,
    });
  } catch (error) {}
};

export default _getAllStoreImages;
