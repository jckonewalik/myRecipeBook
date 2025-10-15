const INITIAL_STATE = {
  id: 1,
  title: 'Test 0',
  portions: '1',
  portionUnit: 'unit',
  calories: '100',
  imageUrl: 'image1.png',
  multiSteps: false,
  steps: {
    ingredients: [
      {
        ingredient: 'Ingredient 0',
        amount: '1',
        unit: 'un',
      },
    ],
    instructions: [
      {
        description: 'Instruction 0',
      },
    ],
  },
};

recipes = [];

export const resetDatabase = () => {
  clearDatabase();
  recipes.push(INITIAL_STATE);
};

export const clearDatabase = () => {
  recipes.length = 0;
};

export const listAll = jest.fn().mockImplementation(() => {
  return Promise.resolve(recipes);
});

export const findById = jest.fn().mockImplementation((id) => {
  return Promise.resolve(recipes.find((r) => r.id == id));
});

export const insert = jest
  .fn()
  .mockImplementation(
    async ({
      imageUrl,
      title,
      portions,
      portionUnit,
      calories,
      multiSteps,
      steps,
    }) => {
      recipes.push({
        id: recipes.length + 1,
        imageUrl: 'image1.png',
        title,
        portions,
        portionUnit,
        calories,
        multiSteps,
        steps,
      });
    }
  );

export const update = jest
  .fn()
  .mockImplementation(
    async ({ id, imageUrl, title, portions, portionUnit, calories, steps }) => {
      const recipe = recipes.find((r) => r.id == id);
      recipe.title = title;
      recipe.imageUrl = imageUrl;
      recipe.portions = portions;
      recipe.portionUnit = portionUnit;
      recipe.calories = calories;
      recipe.steps = steps;
    }
  );

export const remove = jest.fn().mockImplementation(async ({ id }) => {
  const filtered = recipes.filter((recipe) => recipe.id != id);
  recipes.length = 0;
  for (var i = 0; i < filtered.length; i++) {
    recipes.push(filtered[i]);
  }
});
