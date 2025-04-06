const asyncHandler = require("express-async-handler");
const isValidMongooseId = require("@/utils/isMongooseId");
const Tresiba = require("@/models/tresiba");

const deleteMeasurement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  isValidMongooseId(id);

  const isFound = await Tresiba.findById(id);
  if (!isFound) return res.status(404).json({ message: "No data found" });

  const deletedMeasurement = await Tresiba.findByIdAndDelete(id);

  return res.status(200).json(deletedMeasurement);
});

module.exports = deleteMeasurement;
