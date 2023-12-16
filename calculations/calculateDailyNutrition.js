const { LOSE_FAT_CONSTANTS, MAINTAIN_CONSTANTS, GAIN_MUSCLE_CONSTANTS } = require("../constants/nutrationConstants")

const calculateDailyNutrition = (userData) => {
  const { goal, dailyCalories } = userData;
  let { CARBOHYDRATES_PART, PROTEIN_PART, FAT_PART } = {};
  switch (goal) {
    case "lose fat":
      ({ CARBOHYDRATES_PART, PROTEIN_PART, FAT_PART } = LOSE_FAT_CONSTANTS);
      break;
    case "maintain":
      ({ CARBOHYDRATES_PART, PROTEIN_PART, FAT_PART } = MAINTAIN_CONSTANTS);
      break;
    case "gain muscle":
      ({ CARBOHYDRATES_PART, PROTEIN_PART, FAT_PART } = GAIN_MUSCLE_CONSTANTS);
      break;
    default:
      throw new Error("Invalid goal");
  }

  return {
    carbohydrates: Math.round(CARBOHYDRATES_PART * dailyCalories / 4),
    protein: Math.round(PROTEIN_PART * dailyCalories / 4),
    fat: Math.round(FAT_PART * dailyCalories / 9)
  }
}

module.exports = calculateDailyNutrition;