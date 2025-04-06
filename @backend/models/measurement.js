const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const bloodSugarMeasurementSchema = new Schema(
  {
    bloodSugarLevel: { type: Number, required: true },
    measurementType: { type: String, required: false }, // could be enum
    insulinDose: { type: Number, required: false },
    notes: { type: String, required: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Measurement", bloodSugarMeasurementSchema);
