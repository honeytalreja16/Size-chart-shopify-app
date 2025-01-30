const _UploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .send({ uploaded: false, error: "File not Uploaded" });
    }
    // console.log("success", req.file);
    const response = {
      uploaded: true,
      message: "Image uploaded successfully!",
      image: req.file,
    };
    return res.json(response);
  } catch (error) {
    console.log(error, "uploadImage error");
  }
};

export default _UploadImage;
