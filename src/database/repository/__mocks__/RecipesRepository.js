const recipes = [];

export const listAll = jest.fn().mockImplementation((setList, callback) => {
  setList(recipes);
  callback && callback();
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
