const express = require("express");
const router = express.Router();

router.get("/", require("@/controllers/measurements/getMeasurements"));
router.post("/", require("@/controllers/measurements/addMeasuremet"));
router.get("/:id", require("@/controllers/measurements/getMeasurement"));
router.patch("/:id", require("@/controllers/measurements/updateMeasurement"));
router.delete("/:id", require("@/controllers/measurements/deleteMeasurement"));

module.exports = router;
