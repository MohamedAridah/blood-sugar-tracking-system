const asyncHandler = require("express-async-handler");
const isValidMongooseId = require("@/utils/isMongooseId");
const Measurements = require("@/models/measurement");

const getMeasurement = asyncHandler(async (req, res) => {
  const { id } = req.params;

  isValidMongooseId(id);

  const measurements = await Measurements.findById(id);
  console.log(measurements);

  if (!measurements) return res.status(404).json({ message: "No data found" });

  return res.status(200).json(measurements);
});

module.exports = getMeasurement;
