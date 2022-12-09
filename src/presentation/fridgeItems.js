const { formattedNames } = require('../utils/utils')
const prompSync = require('prompt-sync')
const prompt = prompSync()

const showTitle = (title) => {
  console.clear()
  console.log(`=== ${title} ===\n`)
}

const fridgeItems = (fridge) => {
  console.log(`\nChoose an option:
    1- List products in the fridge
    2- List products close to expiry
    3- List recipes for products close to expiration
    4- List recipes for a specific product close to expiration
    5- Check an item's validity
    6- Offer an item
    7- Show items available
    8- Exit\n`)
  const chosenAnswer = Number(prompt());

  switch (chosenAnswer) {
    case 1:
      showTitle('Products in the Fridge')
      fridge.getItems()
      prompt('\nPress any key to go back.')
      console.clear()
      fridgeItems(fridge)
      break;
    case 2:
      showTitle('Products close to expiry')
      formattedNames(fridge)
      prompt('\nPress any key to go back.')
      console.clear()
      fridgeItems(fridge)
      break;
    case 3:
      showTitle('Recipes with items that will expire')
      fridge.itemNextToExpirationRecipes()
      prompt('\nPress any key to go back.')
      console.clear()
      fridgeItems(fridge)
      break;
    case 4:
      showTitle(`List recipes for a specific product close to expiration`)
      const chosenItem = prompt('Enter an item to check recipe suggestions for it: ')
      console.log(fridge.chosenItemNextToExpirationRecipes(chosenItem))
      prompt('\nPress any key to go back.')
      console.clear()
      fridgeItems(fridge)
      break;
    case 5:
      showTitle("Check an item's expiration date")
      const chosenOption = prompt('Enter an item to check its expiration date: ')
      console.log(fridge.showItemValidity(chosenOption))
      prompt('\nPress any key to go back.')
      console.clear()
      fridgeItems(fridge)
      break;
    case 6:
      showTitle("Offer an item")
      console.clear()
      const chosenItemToOffer = prompt('Enter an item to offer: ')
      fridge.offerAnItem(chosenItemToOffer);
      prompt('\nPress any key to go back.')
      console.clear()
      fridgeItems(fridge)
      break;
    case 7:
      showTitle("Show items available")
      fridge.showOfferedItems();
      prompt('\nPress any key to go back.')
      console.clear()
      fridgeItems(fridge)
      break;
    case 8:
      console.clear()
      console.log('Thank you, come back soon!')
      break;
    default:
      console.clear()
      console.log('Item not found!')
      fridgeItems(fridge)
      break;
  }
}

module.exports = { fridgeItems }


