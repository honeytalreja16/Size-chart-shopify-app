import shopify from "../../../shopify.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const upload = multer({ dest: "./frontend/uploads" });

const _uploadCompressedImage = async (req, res) => {
  try {
    console.log("hit");
    const session = res.locals.shopify.session;
    const { imageId } = req.params;
    const image = req.file;

    const originalImagePath = path.join(image.destination, image.filename);
    const copyImagePath = `${originalImagePath}-wt-copy`;

    // Create a copy of the original image with the '-wt-copy' suffix
    fs.copyFileSync(originalImagePath, copyImagePath);

    const originalImageFile = fs.readFileSync(copyImagePath);
    const compressedImageFile = fs.readFileSync(originalImagePath);

    const client = new shopify.api.clients.Graphql({ session });

    // Upload the uncompressed image with the suffix
    const uploadOriginal = await client.query({
      data: {
        query: `mutation FileCreate($files: [FileCreateInput!]!) {
          fileCreate(files: $files) {
            files {
              id
              alt
              createdAt
              fileStatus
            }
            userErrors {
              field
              message
            }
          }
        }`,
        variables: {
          files: [
            {
              alt: `Original Image ${image.originalname}-wt-copy`,
              contentType: "IMAGE",
              originalSource: `data:${
                image.mimetype
              };base64,${originalImageFile.toString("base64")}`,
            },
          ],
        },
      },
    });

    console.log("Upload Original Response:", uploadOriginal);

    if (uploadOriginal.errors) {
      console.error("GraphQL Errors:", uploadOriginal.errors);
      throw new Error(uploadOriginal.errors[0].message);
    }

    if (uploadOriginal.data.fileCreate.userErrors.length > 0) {
      console.error("User Errors:", uploadOriginal.data.fileCreate.userErrors);
      throw new Error(uploadOriginal.data.fileCreate.userErrors[0].message);
    }

    // Upload the compressed image
    const uploadCompressed = await client.query({
      data: {
        query: `mutation FileCreate($files: [FileCreateInput!]!) {
          fileCreate(files: $files) {
            files {
              id
              alt
              createdAt
              fileStatus
            }
            userErrors {
              field
              message
            }
          }
        }`,
        variables: {
          files: [
            {
              alt: `Compressed Image ${image.originalname}`,
              contentType: "IMAGE",
              originalSource: `data:${
                image.mimetype
              };base64,${compressedImageFile.toString("base64")}`,
            },
          ],
        },
      },
    });

    console.log("Upload Compressed Response:", uploadCompressed);

    if (uploadCompressed.errors) {
      console.error("GraphQL Errors:", uploadCompressed.errors);
      throw new Error(uploadCompressed.errors[0].message);
    }

    if (uploadCompressed.data.fileCreate.userErrors.length > 0) {
      console.error(
        "User Errors:",
        uploadCompressed.data.fileCreate.userErrors
      );
      throw new Error(uploadCompressed.data.fileCreate.userErrors[0].message);
    }

    res.status(200).send({ uploaded: true });
  } catch (error) {
    console.log("upload image error: ", error);
    res.status(500).send({ uploaded: false, error: error.message });
  }
};

export default _uploadCompressedImage;

// Add this to your route configuration
// import _uploadCompressedImage from './path_to_this_file';
// app.post('/api/uploadCompressedImage/:imageId', upload.single('image'), _uploadCompressedImage);
