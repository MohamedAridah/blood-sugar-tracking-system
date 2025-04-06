const asyncHandler = require("express-async-handler");
const Measurements = require("@/models/measurement");
const { buildFilter } = require("@/utils/buildFilter");

const getMeasurements = asyncHandler(async (req, res) => {
  const {
    limit,
    userId,
    measurementType,
    startDate,
    endDate,
    minBloodSugar,
    maxBloodSugar,
  } = req.query;

  // Build the filter object based on query params
  const filter = buildFilter({
    userId,
    measurementType,
    startDate,
    endDate,
    minBloodSugar,
    maxBloodSugar,
  });
  const measurements = await Measurements.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit || null);

  console.log(measurements);
  console.log(measurements.length);

  return res.status(200).json(measurements);
});

module.exports = getMeasurements;
