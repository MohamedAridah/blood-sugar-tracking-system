// Helper function to build the filter for blood sugar level range
const buildBloodSugarFilter = (minBloodSugar, maxBloodSugar) => {
  const filter = {};

  if (minBloodSugar) {
    filter.$gte = minBloodSugar; // Greater than or equal to minBloodSugar
  }

  if (maxBloodSugar) {
    filter.$lte = maxBloodSugar; // Less than or equal to maxBloodSugar
  }

  return Object.keys(filter).length ? filter : undefined; // Return undefined if filter is empty
};

// Helper function to build the filter for blood sugar level range
const buildTresibaFilter = (minTresibaValue, maxTresibaValue) => {
  const filter = {};

  if (minTresibaValue) {
    filter.$gte = minTresibaValue; // Greater than or equal to minTresibaValue
  }

  if (maxTresibaValue) {
    filter.$lte = maxTresibaValue; // Less than or equal to maxTresibaValue
  }

  return Object.keys(filter).length ? filter : undefined; // Return undefined if filter is empty
};

// Helper function to build the filter for date range
const buildDateRangeFilter = (startDate, endDate) => {
  const filter = {};

  if (startDate) {
    // Ensure the date is a valid Date object
    const start = new Date(startDate);
    if (isNaN(start)) {
      throw new Error("Invalid startDate format");
    }
    filter.$gte = start; // Greater than or equal to startDate
  }

  if (endDate) {
    // Ensure the date is a valid Date object
    const end = new Date(endDate);
    if (isNaN(end)) {
      throw new Error("Invalid endDate format");
    }
    filter.$lte = end; // Less than or equal to endDate
  }

  return Object.keys(filter).length ? filter : undefined; // Return undefined if filter is empty
};

// Main function to build the full filter object
const buildFilter = ({
  userId,
  measurementType,
  startDate,
  endDate,
  minBloodSugar,
  maxBloodSugar,
  minTresibaValue,
  maxTresibaValue,
}) => {
  console.log("buildFilter ex");

  const filter = {};

  if (userId) filter.userId = userId; // Filter by user ID
  if (measurementType) filter.measurementType = measurementType; // Filter by measurement type

  // Date range filter for createdAt field
  const dateRangeFilter = buildDateRangeFilter(startDate, endDate);
  if (dateRangeFilter) filter.createdAt = dateRangeFilter;

  // Blood sugar level range filter
  const bloodSugarFilter = buildBloodSugarFilter(minBloodSugar, maxBloodSugar);
  if (bloodSugarFilter) filter.bloodSugarLevel = bloodSugarFilter;

  // Tresiba value range filter
  const tresibaValueFilter = buildTresibaFilter(
    minTresibaValue,
    maxTresibaValue
  );
  if (tresibaValueFilter) filter.tresibaDose = tresibaValueFilter;

  return filter;
};

module.exports = { buildFilter };
