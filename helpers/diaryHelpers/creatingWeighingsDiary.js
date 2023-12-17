const getOrCreateDiary = require("./getOrCreateDiary");

const creatingWeighingsDiary = async ( owner, newWeighing, WeighingsDiary, Weighing) => {
  let updatedWeighingsByDate;

  let wasCreatedNewWeighing = false;

  let weighing = await Weighing.findOne({ owner, createdAt: { $gte: new Date('2023-12-17'), $lt: new Date('2023-12-18') } });
  
  const diary = await getOrCreateDiary(owner, WeighingsDiary);

  if (!weighing) {
    weighing = new Weighing({ owner, kg: newWeighing });

    await weighing.save();
    wasCreatedNewWeighing = true;
  }

  weighing = await Weighing.findOneAndUpdate(
    { owner, createdAt: { $gte: new Date('2023-12-17'), $lt: new Date('2023-12-18') } },
    {
      
        kg: newWeighing
      
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