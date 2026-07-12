require("dotenv").config();

const cloudinary = require("./config/cloudinary");

console.log("Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

cloudinary.api
  .ping()
  .then((result) => {
    console.log("✅ Cloudinary Connected");
  })
  .catch((err) => {
    console.error(err);
  });
