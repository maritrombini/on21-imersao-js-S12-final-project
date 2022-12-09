const date = new Date()
const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;


const differenceInDays = (dateA) => {
  const itemDate = new Date(dateA)
  const today = new Date()
  let differenceInTime = itemDate.getTime() - today.getTime();
  let checkDifferenceIDays = differenceInTime / (1000 * 3600 * 24)
  return checkDifferenceIDays
}


const anyDateformatted = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`;


const dynamicDate = (day) => {
  const date = new Date();
  date.setDate(date.getDate() + day);
  const itemDate = date.toLocaleDateString('en-ZA').split('/').join('-')
  return itemDate
}


const formattedNames = (fridge) => {
  fridge.expirationAlert()
  const items = fridge.expirationAlert()
  for (let prop in items) {
    console.log(items[prop].name);
  }
  return
}

module.exports = { formattedDate, differenceInDays, anyDateformatted, dynamicDate, formattedNames }