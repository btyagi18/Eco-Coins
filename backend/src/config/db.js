const mongoose = require("mongoose");

const connectdb = async () => {
  if (!process.env.db_url) {
    console.log("MongoDB skipped: db_url is missing.");
    return;
  }

  await mongoose
    .connect(process.env.db_url)
    .then(() => console.log("mongodb is Connected"))
    .catch((err) => console.log("error aagaya h:", err));
};

module.exports = connectdb;
