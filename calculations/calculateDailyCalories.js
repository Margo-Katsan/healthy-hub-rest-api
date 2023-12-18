const { MEN_BMR_CONSTANTS, WOMEN_BMR_CONSTANTS } = require("../constants/caloriesConstants")

const calculateDailyCalories = (userData) => {
  const { age, weight, height, gender, coefficientOfActivity } = userData;
  
  let { BASE_METABOLIC_RATE, WEIGHT_COEFFICIENT, HEIGHT_COEFFICIENT, AGE_COEFFICIENT } = {};

  switch (gender) {
    case "male":
      ({ BASE_METABOLIC_RATE, WEIGHT_COEFFICIENT, HEIGHT_COEFFICIENT, AGE_COEFFICIENT } = MEN_BMR_CONSTANTS);
      break;
    case "female":
      ({ BASE_METABOLIC_RATE, WEIGHT_COEFFICIENT, HEIGHT_COEFFICIENT, AGE_COEFFICIENT } = WOMEN_BMR_CONSTANTS);
      break;
    default:
      throw new Error("Invalid gender");
  }

  return Math.round((BASE_METABOLIC_RATE + (WEIGHT_COEFFICIENT * weight) + (HEIGHT_COEFFICIENT * height) - (AGE_COEFFICIENT * age) ) * coefficientOfActivity)
}


module.exports = calculateDailyCalories;