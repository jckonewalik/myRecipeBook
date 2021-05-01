const recipes = [];

export const listAll = jest.fn().mockImplementation((setList, callback) => {
  setList(recipes);
  callback && callback();
});
