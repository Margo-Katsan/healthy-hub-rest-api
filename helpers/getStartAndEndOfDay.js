const getStartAndEndOfDay = () => {
  const todayDate = new Date();
  const startOfDay = new Date(`${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`);
  const endOfDay = new Date(`${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate() + 1}`);
  
  return { startOfDay, endOfDay };
}

module.exports = getStartAndEndOfDay;