const getOrCreateDiary = async (owner, Diary) => {
  let diary = await Diary.findOne({ owner });

  if (!diary) {
    diary = new Diary({ owner });
    await diary.save();
  }

  return diary;
};

module.exports = getOrCreateDiary;