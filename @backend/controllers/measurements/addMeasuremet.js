const asyncHandler = require("express-async-handler");
const Measurements = require("@/models/measurement");

const addMeasurement = asyncHandler(async (req, res) => {
  const {
    bloodSugarLevel,
    measurementType,
    insulinDose,
    notes,
    createdAt,
    userId,
  } = req.body;

  console.log(req.body);

  if (!bloodSugarLevel || !measurementType)
    return res
      .status(400)
      .json({ message: "Both BloodSuger and Meal are required." });

  if (typeof bloodSugarLevel !== "number" && typeof insulinDose !== "number")
    return res
      .status(400)
      .json({ message: "Both BloodSuger and InsulineDose must be numbers." });

  const newMeasurement = {
    bloodSugarLevel,
    measurementType,
    insulinDose,
    notes,
    createdAt,
  };
  const measurement = await Measurements.create(newMeasurement);

  return res.status(201).json({
    message: "Measurement added successfully!",
    data: measurement,
  });
});

module.exports = addMeasurement;
