const calculateDailyCalories = require('./calculateDailyCalories');
const calculateDailyNutrition = require('./calculateDailyNutrition');
const calculateDailyWater = require('./calculateDailyWater');
const roundToTenths = require('./roundToTenths');

module.exports = {
  calculateDailyCalories,
  calculateDailyNutrition,
  calculateDailyWater,
  roundToTenths
}
