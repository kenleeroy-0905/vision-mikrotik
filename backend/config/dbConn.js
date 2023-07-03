const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  mongoose
    .set("strictQuery", false)
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas");
      console.error(error);
    });
};

module.exports = dbConnect;
