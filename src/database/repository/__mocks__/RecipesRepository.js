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

export const listAll = jest.fn().mockImplementation((setList, callback) => {
  setList(recipes);
  callback && callback();
});

export const findById = jest
  .fn()
  .mockImplementation((id, loadRecipe, callback) => {
    const recipe = recipes.find((r) => r.id == id);
    loadRecipe({ recipe }, callback);
  });

export const insert = jest
  .fn()
  .mockImplementation(
    ({
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
