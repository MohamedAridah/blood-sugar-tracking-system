const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const tresibaMeasurementSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: false },
    tresibaDose: { type: Number, required: false },
    notes: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tresiba", tresibaMeasurementSchema);
