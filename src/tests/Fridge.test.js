const { Fridge } = require("../Fridge/Fridge");
const { FoodItem } = require("../FoodItem/FoodItem");
const { Recipe } = require("../Recipe/Recipe");
const enumFood = require('../enum/enums')
const { dynamicDate, formattedNames } = require('../utils/utils')

let myFridge
let milk
describe("Fridge", () => {

  beforeAll(() => {
    myFridge = new Fridge();
    milk = new FoodItem('farmer milk', new Date(dynamicDate(2)), enumFood.foodCategory.DairyProducts)

  })

  test("Check if the instance of Fridge is made correctly", () => {
    expect(myFridge instanceof Fridge).toBe(true);
  });

  test("Should add items in the fridge", () => {
    myFridge.addItems(milk)
    expect(myFridge.items[0].name).toBe("farmer milk");
  });

  test("Should format item name ", () => {
    myFridge.addItems(milk)
    formattedNames(myFridge)
    expect(myFridge.items[0].name).toBe('farmer milk')
  });


  test("Should get item in the fridge", () => {
    myFridge.addItems(milk)
    myFridge.getItems()
    expect(myFridge.items[0].name).toBe("farmer milk");
  });

  test("Should list items about to expire", () => {
    myFridge.addItems(milk)
    const result = myFridge.expirationAlert()
    expect(result[0].name).toEqual('farmer milk');
  });


  test("Should list chosen item next to expiration recipes", () => {
    myFridge.addItems(milk)
    milk.addRecipes(new Recipe('Milk Pudding'))
    const result = myFridge.chosenItemNextToExpirationRecipes('farmer milk')
    expect(result[0]).toEqual({ "recipeName": "Milk Pudding" });
  });


  test("Should not list recipe if chosen item doesn't exist", () => {
    const banana = new FoodItem('banana', new Date(dynamicDate(10)), enumFood.foodCategory.Fruits)
    expect(myFridge.chosenItemNextToExpirationRecipes(banana.name)).toBe("\nItem does not exist.");
  });


  test("Should list item next to expiration recipes", () => {
    const grape = new FoodItem('Green Grape', new Date(dynamicDate(2)), enumFood.foodCategory.Fruits)
    myFridge.addItems(grape)
    myFridge.itemNextToExpirationRecipes()
    expect(myFridge.items.length).toBeGreaterThan(0)
  });

  test("Should offer an item", () => {
    myFridge.addItems(milk)
    myFridge.offerAnItem('farmer milk')
    expect(Fridge.fridgeShowcase[0].name).toBe("farmer milk");
  });


  test("Should not list recipe if chosen item will not expire yet", () => {
    const yogurt = new FoodItem('corpus', new Date(dynamicDate(10)), enumFood.foodCategory.DairyProducts)
    myFridge.addItems(yogurt)
    expect(myFridge.chosenItemNextToExpirationRecipes(yogurt.name)).toEqual('\nItem will not expire yet.');
  });


  test("Should show offered items", () => {
    myFridge.addItems(milk)
    myFridge.offerAnItem('farmer milk')
    const result = myFridge.showOfferedItems()
    expect(result[0].name).toBe('farmer milk');
  });

  test("Should not show offered items if an invalid item is provided", () => {
    const chocolate = new FoodItem('lindt', new Date(dynamicDate(2)), enumFood.foodCategory.DairyProducts)
    myFridge.addItems(chocolate)
    myFridge.offerAnItem('milka')
    const result = myFridge.showOfferedItems()
    expect(result).not.toBe('lindt');
  });

  test("Should not show the validity date of a not found item", () => {
    const milk = new FoodItem('farmer milk', new Date(dynamicDate(2)), enumFood.foodCategory.DairyProducts)
    myFridge.addItems(milk)
    const result = myFridge.showItemValidity(milk)
    expect(result).toBe("\nItem not found! Try again.");
  });

  test("Should show the validity date of an item that expires today", () => {
    const beetDate = dynamicDate(1)
    const beet = new FoodItem('beet', new Date(beetDate), enumFood.foodCategory.Vegetables)
    myFridge.addItems(beet)
    const result = myFridge.showItemValidity(beet.name)
    expect(result).toBe("\nbeet will expire today!!!");
  });
})
