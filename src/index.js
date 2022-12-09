const { FoodItem } = require('./FoodItem/FoodItem')
const enumFood = require('./enum/enums')
const { Fridge } = require('./Fridge/Fridge')
const { Recipe } = require('./Recipe/Recipe')
const { fridgeItems } = require('./presentation/fridgeItems')
const { dynamicDate } = require('./utils/utils')

const myFridge = new Fridge()


const milk = new FoodItem('farmer milk', new Date(dynamicDate(2)), enumFood.foodCategory.DairyProducts)
const yogurt = new FoodItem('danone fit', new Date(dynamicDate(8)), enumFood.foodCategory.DairyProducts)
const beet = new FoodItem('beet', new Date(dynamicDate(8)), enumFood.foodCategory.Vegetables)
const orange = new FoodItem('orange', new Date(dynamicDate(2)), enumFood.foodCategory.Fruits)


myFridge.addItems(yogurt)
myFridge.addItems(milk)
myFridge.addItems(beet)
myFridge.addItems(orange)


milk.addRecipes(new Recipe(['Milk Pudding', ' Chocolate Cake']))
orange.addRecipes(new Recipe('Sex On the Beach'))
beet.addRecipes(new Recipe('Gnocchi Of Beetroot'))
yogurt.addRecipes(new Recipe('Frozen Yogurt '))


fridgeItems(myFridge)
