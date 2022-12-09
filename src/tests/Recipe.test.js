const { Recipe } = require("../Recipe/Recipe");

describe("Recipe", () => {
  test("Should check if the instance of Recipe is made correctly", () => {
    const recipe = new Recipe();
    expect(recipe instanceof Recipe).toBe(true);
  });


})