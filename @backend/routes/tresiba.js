const express = require("express");
const router = express.Router();

router.get("/", require("@/controllers/tresiba/getMeasurements"));
router.post("/", require("@/controllers/tresiba/addMeasuremet"));
router.get("/:id", require("@/controllers/tresiba/getMeasurement"));
router.patch("/:id", require("@/controllers/tresiba/updateMeasurement"));
router.delete("/:id", require("@/controllers/tresiba/deleteMeasurement"));

module.exports = router;
