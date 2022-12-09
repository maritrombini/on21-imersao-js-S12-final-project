const { FoodItem } = require("../FoodItem/FoodItem")

class Fridge {

  constructor() {
    this.items = []
  }

  static fridgeShowcase = []

  getItems() {
    this.items.forEach(item => {
      console.log(item.name);
    })
  }

  addItems(item) {
    if (item instanceof FoodItem) {
      return this.items.push(item)
    }
  }

  expirationAlert() {
    let willExpire = []
    this.items.forEach(item => {
      if (item.remainingDays() <= 3) {
        willExpire.push(item)
      }
    })
    return willExpire
  }

  itemNextToExpirationRecipes() {
    let products = this.expirationAlert()
    console.log(`\nCheck out some recipe suggestions for consumption of items close to expiration: \n`);
    products.forEach(item => {
      if (item.recipes.length > 0) {
        for (let i = 0; i < item.recipes.length; i++) {
          console.log(`Recipes you can do with ${item.name}: ${item.recipes[i].recipeName}\n`);
        }
      }
    })
    return
  }

  chosenItemNextToExpirationRecipes(itemToExpire) {
    const itemsAboutToExpire = this.expirationAlert()
    const recipe = itemsAboutToExpire.find(item => item.name == itemToExpire)
    const hasItem = this.items.filter(item => item.name == itemToExpire)
    if (hasItem.length > 0) {

      if (recipe) {
        return recipe.recipes
      } else {
        return '\nItem will not expire yet.'
      }
    } else {
      return "\nItem does not exist."
    }
  }

  showItemValidity(itemValidity) {
    const itemExpirationDate = this.items.find(item => item.name == itemValidity)
    if (itemExpirationDate) {
      return itemExpirationDate.checkItemExpirationDate();
    } else {
      return '\nItem not found! Try again.'
    }
  }

  offerAnItem(itemToOffer) {
    const filteredItem = this.items.find(item => {
      if (item.name == itemToOffer) {
        return item
      }
    })
    if (filteredItem) {
      Fridge.fridgeShowcase.push(filteredItem)
      console.log(`\n${filteredItem.name} offered and available for donation.`);
      return Fridge.fridgeShowcase
    }
  }

  showOfferedItems() {
    Fridge.fridgeShowcase.forEach(item => {
      delete item.recipes
      console.log(item)
    })
    return Fridge.fridgeShowcase
  }
}

module.exports = { Fridge }