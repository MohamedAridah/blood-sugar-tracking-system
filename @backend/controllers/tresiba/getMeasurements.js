const asyncHandler = require("express-async-handler");
const Tresiba = require("@/models/tresiba");
const { buildFilter } = require("@/utils/buildFilter");

const getMeasurements = asyncHandler(async (req, res) => {
  console.log("get measurements exucted");

  const {
    limit,
    userId,
    startDate,
    endDate,
    minTresibaValue,
    maxTresibaValue,
  } = req.query;

  // Build the filter object based on query params
  const filter = buildFilter({
    limit,
    userId,
    startDate,
    endDate,
    minTresibaValue,
    maxTresibaValue,
  });
  const measurements = await Tresiba.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit || null);

  // console.log(measurements);
  // console.log(measurements.length);

  return res.status(200).json(measurements);
});

module.exports = getMeasurements;
