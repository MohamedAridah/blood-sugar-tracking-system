const mongoose = require("mongoose");

const isValidMongooseId = (id) => {
  if (!mongoose.isValidObjectId(id)) {
    const error = new Error("Invalid mongoose ID format");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = isValidMongooseId;
