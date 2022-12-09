
const { differenceInDays, formattedDate, anyDateformatted } = require('../utils/utils')

class FoodItem {
  name
  expirationDate
  category
  recipes

  constructor(name, expirationDate, category) {
    if (expirationDate > new Date(formattedDate)) {
      const datasemValidacao = anyDateformatted(expirationDate)
      this.name = name
      this.expirationDate = datasemValidacao
      this.category = category
      this.recipes = []
    }
  }

  addRecipes(newRecipe) {
    this.recipes.push(newRecipe)
    return this.recipes
  }

  checkItemExpirationDate() {
    const checkExpirationDate = differenceInDays(this.expirationDate)
    if (checkExpirationDate <= 1) {
      console.log(`${this.name} will expire today!!!`);
      return `\n${this.name} will expire today!!!`
    } else {
      return `\n${this.name} will expire in ${Math.ceil(checkExpirationDate)} days.`
    }
  }

  remainingDays() {
    const checkExpirationDate = differenceInDays(this.expirationDate)
    return Math.ceil(checkExpirationDate)
  }


}


module.exports = { FoodItem }
