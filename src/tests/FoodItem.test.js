const { FoodItem } = require("../FoodItem/FoodItem");
const { Recipe } = require("../Recipe/Recipe");
const { Fridge } = require("../Fridge/Fridge");
const enumFood = require('../enum/enums');
const { dynamicDate } = require("../utils/utils");

let myFridge
let milk
let yogurt
describe("Fridge", () => {

  beforeAll(() => {
    myFridge = new Fridge();
    milk = new FoodItem('farmer milk', new Date(dynamicDate(2)), enumFood.foodCategory.DairyProducts)
    yogurt = new FoodItem('corpus', new Date(dynamicDate(4)), enumFood.foodCategory.DairyProducts)
  })
  test("Should check if the instance of FoodItem is made correctly", () => {
    const foodItem = new FoodItem();
    expect(foodItem instanceof FoodItem).toBe(true);
  });

  test("Should not add item if it is not an instance of FoodItem", () => {
    const bread = 'bread'
    myFridge.addItems(bread)
    expect(bread instanceof FoodItem).toBe(false);
  });

  test("Should add an item in the fridge when valid item is provided", () => {
    const greenCabbage = new FoodItem('Green Cabbage', new Date(dynamicDate(7)), enumFood.foodCategory.Vegetables)
    myFridge.addItems(greenCabbage)
    expect(myFridge.items[0].name).toEqual('Green Cabbage');
    expect(myFridge.items.length).toBe(1);
    expect(myFridge.items).not.toBeNull();
  });

  test("Should add a recipe", () => {
    myFridge.addItems(milk)
    milk.addRecipes(new Recipe('Milk Pudding'))
    expect(milk.recipes).toEqual([{ "recipeName": "Milk Pudding" }]);
  });

  test("Should return an item expiration date", () => {
    myFridge.addItems(yogurt)
    const result = yogurt.checkItemExpirationDate()
    expect(result).toBe("\ncorpus will expire in 3 days.");
  });

  test("Should return an item that will expire today", () => {
    milk.expirationDate = new Date(dynamicDate(1))
    myFridge.addItems(milk)
    const result = milk.checkItemExpirationDate()
    expect(result).toEqual("\nfarmer milk will expire today!!!");
  });
})