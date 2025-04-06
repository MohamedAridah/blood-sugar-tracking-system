const asyncHandler = require("express-async-handler");
const isValidMongooseId = require("@/utils/isMongooseId");
const Measurements = require("@/models/measurement");

const updateMeasurement = asyncHandler(async (req, res) => {
  const { id } = req.params;
  isValidMongooseId(id);

  const isFound = await Measurements.findById(id);
  if (!isFound) return res.status(404).json({message:"No data found"});

  const updatedMeasurement = await Measurements.findByIdAndUpdate(
    id,
    {
      ...req.body,
    },
    { new: true }
  );

  return res.status(200).json(updatedMeasurement);
});

module.exports = updateMeasurement;
