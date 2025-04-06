const asyncHandler = require("express-async-handler");
const Tresiba = require("@/models/tresiba");

const addTresibaMeasurement = asyncHandler(async (req, res) => {
  const { tresibaDose, notes, createdAt, userId } = req.body;
  console.log(req.body);

  if (!tresibaDose)
    return res.status(400).json({ message: "Tresiba dose is required." });

  // if (typeof tresibaDose !== "number")
  // return res.status(400).json({ message: "TresibaDose must be number." });

  const newTresibaMeasurement = {
    tresibaDose,
    notes,
    createdAt,
    userId,
  };
  const measurement = await Tresiba.create(newTresibaMeasurement);

  return res.status(201).json({
    message: "Tresiba Measurement added successfully!",
    data: measurement,
  });
});

module.exports = addTresibaMeasurement;
