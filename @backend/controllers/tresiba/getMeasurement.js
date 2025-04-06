const asyncHandler = require("express-async-handler");
const isValidMongooseId = require("@/utils/isMongooseId");
const Tresiba = require("@/models/tresiba");

const getMeasurement = asyncHandler(async (req, res) => {
  console.log("get measurement called", req.params.id);

  const { id } = req.params;
  isValidMongooseId(id);

  const measurement = await Tresiba.findById(id);
  if (!measurement) return res.status(404).json({ message: "No data found" });

  return res.status(200).json(measurement);
});

module.exports = getMeasurement;
