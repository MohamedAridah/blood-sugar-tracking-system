const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const {
      connection: { name, host, port },
    } = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "BSLT",
    });
    console.log(
      `Connected To MongoDB Completed. Connected to ${name} Databse on host ${host} and port ${port}`
    );
  } catch (err) {
    console.error("Failed to connect to MongoDB: ", err);
    process.exit(1);
  }
};

module.exports = connectDB;
