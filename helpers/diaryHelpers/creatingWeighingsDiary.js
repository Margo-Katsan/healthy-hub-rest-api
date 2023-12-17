const getOrCreateDiary = require("./getOrCreateDiary");
const getStartAndEndOfDay = require("../getStartAndEndOfDay")

const creatingWeighingsDiary = async ( owner, newWeighing, WeighingsDiary, Weighing) => {
  let updatedWeighingsByDate;

  let wasCreatedNewWeighing = false;

  const { startOfDay, endOfDay } = getStartAndEndOfDay();

  let weighing = await Weighing.findOne({ owner, createdAt: { $gte: startOfDay, $lt: endOfDay } });
  
  const diary = await getOrCreateDiary(owner, WeighingsDiary);

  if (!weighing) {
    weighing = new Weighing({ owner, weight: newWeighing });

    await weighing.save();
    wasCreatedNewWeighing = true;
  }

  weighing = await Weighing.findOneAndUpdate(
    { owner, createdAt: { $gte: startOfDay, $lt: endOfDay } },
    {
      
        weight: newWeighing
      
    },
    { new: true });

  if (wasCreatedNewWeighing) {
    updatedWeighingsByDate = {
      $push: {
        weighingsByDate: weighing
      }
    }
  }
  else {
    updatedWeighingsByDate = {
      $set: {
        [`weighingsByDate.${diary.weighingsByDate.length - 1}`]: weighing
      }
    }
  }
  

  await WeighingsDiary.findOneAndUpdate({ owner }, updatedWeighingsByDate, { new: true });
}

module.exports = creatingWeighingsDiary;